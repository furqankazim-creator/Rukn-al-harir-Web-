import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState, EmptyState } from '../components/Stateviews'

const EMPTY_FORM = { title: '', description: '', icon: '', position: 0 }

export default function Services() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setLoadError('')
    api
      .get('/admin/services')
      .then((res) => setItems(res.data))
      .catch((err) => setLoadError(getErrorMessage(err, 'Could not load services.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const startEdit = (svc) => {
    setEditingId(svc.id)
    setForm({ title: svc.title, description: svc.description || '', icon: svc.icon || '', position: svc.position })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        await api.patch(`/admin/services/${editingId}`, form)
      } else {
        await api.post('/admin/services', form)
      }
      cancelEdit()
      load()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save this service.'))
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return
    await api.delete(`/admin/services/${id}`)
    setItems((list) => list.filter((s) => s.id !== id))
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Services</h1>
          <p className="admin-page__subtitle">Manage the service categories shown on the website.</p>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-card">
        <h2 className="admin-card__title">{editingId ? 'Edit Service' : 'Add Service'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__row">
            <div className="admin-field">
              <label>Title</label>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="admin-field">
              <label>Icon (name or emoji)</label>
              <input
                className="admin-input"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label>Position</label>
              <input
                type="number"
                className="admin-input"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea
              className="admin-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Service'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn--ghost" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-table-wrap">
        {loading && <LoadingState label="Loading services…" />}
        {!loading && loadError && <ErrorState message={loadError} onRetry={load} />}
        {!loading && !loadError && items.length === 0 && (
          <EmptyState message="No services yet — add your first one above." />
        )}
        {!loading && !loadError && items.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((svc) => (
                <tr key={svc.id}>
                  <td>{svc.position}</td>
                  <td>{svc.title}</td>
                  <td>{svc.description || '—'}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => startEdit(svc)}>
                        Edit
                      </button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(svc.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
