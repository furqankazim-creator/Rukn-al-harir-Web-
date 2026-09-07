import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePublicSettings } from './usePublicSettings'

const DEFAULTS = { footer_text: 'Default tagline', maintenance_mode: 'false' }

describe('usePublicSettings', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with the given defaults', () => {
    fetch.mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => usePublicSettings(DEFAULTS))
    expect(result.current).toEqual(DEFAULTS)
  })

  it('overrides only the keys the API actually returns', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ footer_text: 'Custom footer' }) })

    const { result } = renderHook(() => usePublicSettings(DEFAULTS))

    await waitFor(() => {
      expect(result.current.footer_text).toBe('Custom footer')
    })
    // untouched key keeps its default
    expect(result.current.maintenance_mode).toBe('false')
  })

  it('ignores empty-string values from the API rather than blanking a default', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ footer_text: '' }) })

    const { result } = renderHook(() => usePublicSettings(DEFAULTS))

    await new Promise((r) => setTimeout(r, 0))
    expect(result.current.footer_text).toBe('Default tagline')
  })

  it('stays on defaults when the request fails', async () => {
    fetch.mockRejectedValue(new Error('network down'))

    const { result } = renderHook(() => usePublicSettings(DEFAULTS))

    await new Promise((r) => setTimeout(r, 0))
    expect(result.current).toEqual(DEFAULTS)
  })
})
