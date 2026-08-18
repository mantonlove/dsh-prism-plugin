/**
 * IndexedDB blob store for video wallpapers: videos are far too large for
 * the localStorage settings document, so each upload lands as a blob under a
 * generated name and the settings document keeps only the `idb:<name>`
 * marker. The database is plugin-owned and deleted rows stay gone.
 */
/**
 * Persist one video blob under a name.
 * @param name - storage key.
 * @param blob - the video bytes.
 * @returns resolves when the write commits.
 */
export declare function putVideoBlob(name: string, blob: Blob): Promise<void>;
/**
 * Read a stored video blob.
 * @param name - storage key.
 * @returns the blob, or null when absent.
 */
export declare function getVideoBlob(name: string): Promise<Blob | null>;
/** Delete one stored video blob (idempotent). */
export declare function deleteVideoBlob(name: string): Promise<void>;
//# sourceMappingURL=wallpaper-store.d.ts.map