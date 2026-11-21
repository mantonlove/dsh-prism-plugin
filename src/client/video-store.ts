/**
 * IndexedDB home for video wallpapers.
 *
 * The settings document lives in `localStorage` and is rewritten as one JSON
 * blob on every change, so a multi-megabyte MP4 cannot live there: the quota is
 * 5-10MB and a failed write rolls the whole document back. Video clips therefore
 * go to IndexedDB as Blobs, and the settings document only carries the
 * `video:<id>` reference. Both stores share the renderer origin, so they travel
 * together when the app's user-data directory moves.
 */

/** Name of the IndexedDB database owned by the plugin. */
export const MEDIA_DB_NAME = 'dsh-prism-media'
/** Object store holding one record per video wallpaper. */
export const MEDIA_STORE = 'videos'
/** Current schema version; bump together with an upgrade step. */
export const MEDIA_DB_VERSION = 1

/** One stored clip plus everything the layer needs without decoding it. */
export interface VideoRecord {
  /** Stable id referenced from the settings document as `video:<id>`. */
  id: string
  /** The clip itself. */
  blob: Blob
  /** First-frame JPEG used as thumbnail, poster, and luminance source. */
  poster: Blob | null
  /** Length in seconds, 0 when the browser could not report it. */
  duration: number
  /** Average luminance of the poster frame, 0-1. */
  luminance: number
  /** Intrinsic pixel size, 0 when unknown. */
  width: number
  height: number
  /** Byte size of the clip. */
  bytes: number
  /** Epoch millis, for pruning oldest entries first. */
  addedAt: number
}

/** Whether IndexedDB is reachable in this environment. */
function available(): boolean {
  return typeof indexedDB !== 'undefined' && indexedDB !== null
}

/** Open (once per call) the media database. */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB_NAME, MEDIA_DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(MEDIA_STORE)) db.createObjectStore(MEDIA_STORE, { keyPath: 'id' })
    }
    request.onsuccess = () => { resolve(request.result) }
    request.onerror = () => { reject(request.error ?? new Error('indexedDB open failed')) }
    request.onblocked = () => { reject(new Error('indexedDB open blocked')) }
  })
}

/** Run one transaction against the media store. */
async function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T> | void): Promise<T | undefined> {
  if (!available()) throw new Error('indexedDB unavailable')
  const db = await openDatabase()
  try {
    return await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(MEDIA_STORE, mode)
      const store = tx.objectStore(MEDIA_STORE)
      let result: T | undefined
      const request = run(store)
      if (request !== undefined) {
        request.onsuccess = () => { result = request.result }
      }
      tx.oncomplete = () => { resolve(result) }
      tx.onerror = () => { reject(tx.error ?? new Error('indexedDB transaction failed')) }
      tx.onabort = () => { reject(tx.error ?? new Error('indexedDB transaction aborted')) }
    })
  } finally {
    db.close()
  }
}

/** Persist one clip, replacing any record with the same id. */
export async function putVideo(record: VideoRecord): Promise<void> {
  await withStore('readwrite', (store) => { store.put(record) })
}

/** Read one clip by id. */
export async function getVideo(id: string): Promise<VideoRecord | null> {
  const found = await withStore<VideoRecord | undefined>('readonly', (store) => store.get(id))
  return found ?? null
}

/** Delete one clip; missing ids are not an error. */
export async function deleteVideo(id: string): Promise<void> {
  await withStore('readwrite', (store) => { store.delete(id) })
}

/** Every stored id, used to sweep clips the settings document no longer references. */
export async function listVideoIds(): Promise<string[]> {
  const keys = await withStore<IDBValidKey[]>('readonly', (store) => store.getAllKeys())
  return (keys ?? []).map((key) => String(key))
}

/** Total bytes held by stored clips (0 when IndexedDB is unavailable). */
export async function videoUsage(): Promise<number> {
  if (!available()) return 0
  const records = await withStore<VideoRecord[]>('readonly', (store) => store.getAll())
  return (records ?? []).reduce((sum, record) => sum + (record.bytes ?? 0), 0)
}

/** Drop clips whose ids no longer appear in the given references. */
export async function pruneVideos(keepIds: readonly string[]): Promise<number> {
  if (!available()) return 0
  const keep = new Set(keepIds)
  let removed = 0
  for (const id of await listVideoIds()) {
    if (keep.has(id)) continue
    await deleteVideo(id)
    removed += 1
  }
  return removed
}
