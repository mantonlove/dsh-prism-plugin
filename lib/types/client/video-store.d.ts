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
export declare const MEDIA_DB_NAME = "dsh-prism-media";
/** Object store holding one record per video wallpaper. */
export declare const MEDIA_STORE = "videos";
/** Current schema version; bump together with an upgrade step. */
export declare const MEDIA_DB_VERSION = 1;
/** One stored clip plus everything the layer needs without decoding it. */
export interface VideoRecord {
    /** Stable id referenced from the settings document as `video:<id>`. */
    id: string;
    /** The clip itself. */
    blob: Blob;
    /** First-frame JPEG used as thumbnail, poster, and luminance source. */
    poster: Blob | null;
    /** Length in seconds, 0 when the browser could not report it. */
    duration: number;
    /** Average luminance of the poster frame, 0-1. */
    luminance: number;
    /** Intrinsic pixel size, 0 when unknown. */
    width: number;
    height: number;
    /** Byte size of the clip. */
    bytes: number;
    /** Epoch millis, for pruning oldest entries first. */
    addedAt: number;
}
/** Persist one clip, replacing any record with the same id. */
export declare function putVideo(record: VideoRecord): Promise<void>;
/** Read one clip by id. */
export declare function getVideo(id: string): Promise<VideoRecord | null>;
/** Delete one clip; missing ids are not an error. */
export declare function deleteVideo(id: string): Promise<void>;
/** Every stored id, used to sweep clips the settings document no longer references. */
export declare function listVideoIds(): Promise<string[]>;
/** Total bytes held by stored clips (0 when IndexedDB is unavailable). */
export declare function videoUsage(): Promise<number>;
/** Drop clips whose ids no longer appear in the given references. */
export declare function pruneVideos(keepIds: readonly string[]): Promise<number>;
//# sourceMappingURL=video-store.d.ts.map