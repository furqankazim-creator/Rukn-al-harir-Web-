import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { api } from '../api/client'

vi.mock('../api/client', () => ({
  api: { get: vi.fn(), post: vi.fn() },
}))

function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe('AuthContext', () => {
  it('finishes loading with no user when there is no stored token', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toBeNull()
    expect(result.current.connectionError).toBe(false)
  })

  it('restores the session when the stored token is still valid', async () => {
    localStorage.setItem('admin_token', 'a-valid-token')
    api.get.mockResolvedValue({ data: { user: { id: 1, email: 'admin@ruknalharir.com' } } })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toEqual({ id: 1, email: 'admin@ruknalharir.com' })
  })

  it('clears the session on a real 401 (token actually invalid)', async () => {
    localStorage.setItem('admin_token', 'a-stale-token')
    api.get.mockRejectedValue({ response: { status: 401 } })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toBeNull()
    expect(result.current.connectionError).toBe(false)
    expect(localStorage.getItem('admin_token')).toBeNull()
  })

  it('keeps the session and reports a connection error when the API is unreachable', async () => {
    localStorage.setItem('admin_token', 'a-valid-token')
    api.get.mockRejectedValue({ request: {} }) // no `response` → network failure

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.connectionError).toBe(true)
    // token is left alone — this was not a bad login
    expect(localStorage.getItem('admin_token')).toBe('a-valid-token')
  })

  it('login stores the token and sets the user', async () => {
    api.get.mockResolvedValue({ data: { user: null } })
    api.post.mockResolvedValue({ data: { token: 'fresh-token', user: { id: 2, email: 'a@b.com' } } })

    const { result } = renderHook(() => useAuth(), { wrapper })
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.login('a@b.com', 'pw')
    })

    expect(localStorage.getItem('admin_token')).toBe('fresh-token')
    expect(result.current.user).toEqual({ id: 2, email: 'a@b.com' })
  })

  it('logout clears the token and the user', async () => {
    localStorage.setItem('admin_token', 'a-valid-token')
    api.get.mockResolvedValue({ data: { user: { id: 1 } } })

    const { result } = renderHook(() => useAuth(), { wrapper })
    await waitFor(() => expect(result.current.user).not.toBeNull())

    act(() => result.current.logout())

    expect(result.current.user).toBeNull()
    expect(localStorage.getItem('admin_token')).toBeNull()
  })
})
