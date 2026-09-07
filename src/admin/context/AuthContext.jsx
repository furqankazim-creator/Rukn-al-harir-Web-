import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // True only when the API couldn't be reached at all (backend down/unreachable) —
  // kept separate from "not logged in" so we don't wipe a valid session just
  // because the server was briefly unreachable.
  const [connectionError, setConnectionError] = useState(false)

  const checkSession = useCallback(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setLoading(false)
      return
    }
    setLoading(true)
    setConnectionError(false)
    api
      .get('/admin/me')
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        if (err?.response) {
          // Server responded — the token itself is invalid/expired.
          localStorage.removeItem('admin_token')
          setUser(null)
        } else {
          // No response at all — the API is unreachable, not a bad login.
          setConnectionError(true)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(checkSession, [checkSession])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/admin/login', { email, password })
    localStorage.setItem('admin_token', res.data.token)
    setUser(res.data.user)
    setConnectionError(false)
    return res.data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, connectionError, login, logout, retry: checkSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
