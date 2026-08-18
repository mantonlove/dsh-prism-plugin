/**
 * IndexedDB blob store for video wallpapers: videos are far too large for
 * the localStorage settings document, so each upload lands as a blob under a
 * generated name and the settings document keeps only the `idb:<name>`
 * marker. The database is plugin-owned and deleted rows stay gone.
 */
/** Database name and version. */
const DB_NAME = 'dsh.ui-prism.wallpaper';
const DB_VERSION = 1;
/** Object store holding the video blobs. */
const STORE = 'videos';
/** Open the plugin-owned database (creating the store once). */
function openStore() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE))
                db.createObjectStore(STORE);
        };
        request.onsuccess = () => { resolve(request.result); };
        request.onerror = () => { reject(request.error); };
    });
}
/**
 * Persist one video blob under a name.
 * @param name - storage key.
 * @param blob - the video bytes.
 * @returns resolves when the write commits.
 */
export async function putVideoBlob(name, blob) {
    const db = await openStore();
    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE, 'readwrite');
            tx.objectStore(STORE).put(blob, name);
            tx.oncomplete = () => { resolve(); };
            tx.onerror = () => { reject(tx.error); };
        });
    }
    finally {
        db.close();
    }
}
/**
 * Read a stored video blob.
 * @param name - storage key.
 * @returns the blob, or null when absent.
 */
export async function getVideoBlob(name) {
    const db = await openStore();
    try {
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE, 'readonly');
            const request = tx.objectStore(STORE).get(name);
            request.onsuccess = () => { resolve(request.result instanceof Blob ? request.result : null); };
            request.onerror = () => { reject(request.error); };
        });
    }
    finally {
        db.close();
    }
}
/** Delete one stored video blob (idempotent). */
export async function deleteVideoBlob(name) {
    const db = await openStore();
    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction(STORE, 'readwrite');
            tx.objectStore(STORE).delete(name);
            tx.oncomplete = () => { resolve(); };
            tx.onerror = () => { reject(tx.error); };
        });
    }
    finally {
        db.close();
    }
}
//# sourceMappingURL=wallpaper-store.js.map