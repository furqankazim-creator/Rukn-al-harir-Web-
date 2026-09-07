import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePublicGallery } from './usePublicGallery'

const FALLBACK = [{ src: '/images/gallery/gallery-01.png', alt: 'Fallback photo' }]

describe('usePublicGallery', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with the fallback images', () => {
    fetch.mockReturnValue(new Promise(() => {})) // never resolves during this assertion
    const { result } = renderHook(() => usePublicGallery(FALLBACK))
    expect(result.current).toBe(FALLBACK)
  })

  it('switches to API images once the fetch resolves with real data', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, path: '/uploads/gallery/x.jpg', caption: 'Site photo' }],
    })

    const { result } = renderHook(() => usePublicGallery(FALLBACK))

    await waitFor(() => {
      expect(result.current).not.toBe(FALLBACK)
    })
    expect(result.current[0].alt).toBe('Site photo')
  })

  it('stays on the fallback when the API returns an empty list', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] })

    const { result } = renderHook(() => usePublicGallery(FALLBACK))

    await new Promise((r) => setTimeout(r, 0))
    expect(result.current).toBe(FALLBACK)
  })

  it('stays on the fallback when the request fails', async () => {
    fetch.mockRejectedValue(new Error('network down'))

    const { result } = renderHook(() => usePublicGallery(FALLBACK))

    await new Promise((r) => setTimeout(r, 0))
    expect(result.current).toBe(FALLBACK)
  })
})
