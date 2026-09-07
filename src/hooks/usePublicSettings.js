import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.ruknalharir.com'

// Pulls admin-managed site settings (footer text, maintenance mode, etc.).
// Starts from `defaults` and only overrides keys the API actually returns,
// so an unreachable backend or an empty settings table never blanks the site.
export function usePublicSettings(defaults) {
  const [settings, setSettings] = useState(defaults)

  useEffect(() => {
    let cancelled = false

    fetch(`${API_URL}/api/settings`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((data) => {
        if (cancelled || !data || typeof data !== 'object') return
        setSettings((prev) => ({
          ...prev,
          ...Object.fromEntries(Object.entries(data).filter(([, v]) => v !== '' && v != null)),
        }))
      })
      .catch(() => {
        // Stay on defaults — already set as the initial state.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return settings
}
