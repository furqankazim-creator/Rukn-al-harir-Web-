import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.ruknalharir.com'

// Pulls admin-managed gallery images from the backend. Falls back to
// `fallbackImages` (the site's hardcoded defaults) whenever the API is
// unreachable or simply has nothing uploaded yet, so the public gallery
// section never goes blank just because no one has used the admin panel.
export function usePublicGallery(fallbackImages) {
  const [images, setImages] = useState(fallbackImages)

  useEffect(() => {
    let cancelled = false

    fetch(`${API_URL}/api/gallery`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((items) => {
        if (cancelled || !Array.isArray(items) || items.length === 0) return
        setImages(
          items.map((item) => ({
            src: `${API_URL}${item.path}`,
            alt: item.caption || '',
          }))
        )
      })
      .catch(() => {
        // Stay on fallbackImages — already set as the initial state.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return images
}
