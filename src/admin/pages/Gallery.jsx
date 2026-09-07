import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../api/client'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState, EmptyState } from '../components/Stateviews'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.ruknalharir.com'

export default function Gallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const fileInputRef = useRef(null)

  const load = useCallback(() => {
    setLoading(true)
    setLoadError('')
    api
      .get('/admin/gallery')
      .then((res) => setItems(res.data))
      .catch((err) => setLoadError(getErrorMessage(err, 'Could not load gallery images.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const handleUpload = async (e) => {
    e.preventDefault()
    const files = fileInputRef.current?.files
    if (!files || files.length === 0) return

    const formData = new FormData()
    for (const file of files) formData.append('image', file)
    formData.append('caption', caption)
    formData.append('position', items.length)

    setUploading(true)
    setError('')
    try {
      await api.post('/admin/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setCaption('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      load()
    } catch (err) {
      setError(getErrorMessage(err, 'Upload failed.'))
    } finally {
      setUploading(false)
    }
  }

  const toggleVisible = async (item) => {
    const next = !item.visible
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, visible: next } : i)))
    await api.patch(`/admin/gallery/${item.id}`, { visible: next })
  }

  const move = async (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return

    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    setItems(next)

    await api.post('/admin/gallery/reorder', {
      order: next.map((item, i) => ({ id: item.id, position: i })),
    })
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this image?')) return
    await api.delete(`/admin/gallery/${id}`)
    setItems((list) => list.filter((i) => i.id !== id))
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Gallery</h1>
          <p className="admin-page__subtitle">Upload and manage the project gallery images.</p>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-card">
        <h2 className="admin-card__title">Upload Images</h2>
        <form className="admin-form" onSubmit={handleUpload}>
          <div className="admin-form__row">
            <div className="admin-field">
              <label>Image file(s)</label>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="admin-input" required />
            </div>
            <div className="admin-field">
              <label>Caption (optional)</label>
              <input
                className="admin-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={uploading}>
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingState label="Loading gallery…" />}
      {!loading && loadError && (
        <div className="admin-table-wrap">
          <ErrorState message={loadError} onRetry={load} />
        </div>
      )}
      {!loading && !loadError && items.length === 0 && (
        <div className="admin-table-wrap">
          <EmptyState message="No gallery images yet — upload your first one above." />
        </div>
      )}
      {!loading && !loadError && items.length > 0 && (
        <div className="admin-gallery-grid">
          {items.map((item, index) => (
            <div className="admin-gallery-card" key={item.id}>
              <img className="admin-gallery-card__img" src={`${API_URL}${item.path}`} alt={item.caption || ''} />
              <div className="admin-gallery-card__body">
                <span className="admin-gallery-card__caption">{item.caption || 'Untitled'}</span>
                <div className="admin-gallery-card__meta">
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={item.visible} onChange={() => toggleVisible(item)} />
                    Visible
                  </label>
                  <div className="admin-gallery-card__row">
                    <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => move(index, -1)} disabled={index === 0}>
                      ↑
                    </button>
                    <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => move(index, 1)} disabled={index === items.length - 1}>
                      ↓
                    </button>
                  </div>
                </div>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
