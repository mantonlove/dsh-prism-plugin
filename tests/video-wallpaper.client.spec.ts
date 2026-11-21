/**
 * Video wallpapers: the reference format kept in settings, the ingestion
 * guards, and the store contract the layer relies on. IndexedDB is stubbed —
 * jsdom ships none — so these tests cover the plugin's own seams, not the
 * browser's.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const records = new Map<string, Record<string, unknown>>()

vi.mock('../src/client/video-store.ts', () => ({
  putVideo: vi.fn(async (record: Record<string, unknown>) => { records.set(String(record.id), record) }),
  getVideo: vi.fn(async (id: string) => records.get(id) ?? null),
  deleteVideo: vi.fn(async (id: string) => { records.delete(id) }),
  videoUsage: vi.fn(async () => 0),
  pruneVideos: vi.fn(async () => 0),
  listVideoIds: vi.fn(async () => [...records.keys()]),
}))

import { isVideoFile, isVideoRef, MAX_VIDEO_BYTES, MAX_VIDEO_DURATION, readVideo, videoIdOf, videoRef } from '../src/client/wallpaper.ts'

/** A File stand-in with a controllable type and size. */
function fakeFile(type: string, size: number): File {
  return { type, size, name: 'clip.mp4' } as unknown as File
}

describe('video references', () => {
  it('round-trips an id through the settings string', () => {
    const ref = videoRef('v-123')
    expect(ref).toBe('video:v-123')
    expect(isVideoRef(ref)).toBe(true)
    expect(videoIdOf(ref)).toBe('v-123')
  })

  it('does not mistake inline images for clips', () => {
    expect(isVideoRef('data:image/jpeg;base64,AAAA')).toBe(false)
    expect(isVideoRef('video:')).toBe(false)
    expect(videoIdOf('data:image/jpeg;base64,AAAA')).toBe('')
  })

  it('recognises video uploads by mime type', () => {
    expect(isVideoFile(fakeFile('video/mp4', 10))).toBe(true)
    expect(isVideoFile(fakeFile('video/webm', 10))).toBe(true)
    expect(isVideoFile(fakeFile('image/gif', 10))).toBe(false)
  })
})

describe('readVideo guards', () => {
  it('rejects files above the byte cap before touching the DOM', async () => {
    const result = await readVideo(fakeFile('video/mp4', MAX_VIDEO_BYTES + 1), 'v-1')
    expect(result).toEqual({ kind: 'size', bytes: MAX_VIDEO_BYTES + 1 })
  })

  it('rejects empty files', async () => {
    expect(await readVideo(fakeFile('video/mp4', 0), 'v-1')).toEqual({ kind: 'read' })
  })

  it('keeps the duration cap at one minute', () => {
    expect(MAX_VIDEO_DURATION).toBe(60)
  })
})
