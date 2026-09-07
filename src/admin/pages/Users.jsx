import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState, EmptyState } from '../components/Stateviews'

const EMPTY_FORM = { name: '', email: '', password: '', role: 'admin' }

export default function Users() {
  const { user: currentUser } = useAuth()
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
      .get('/admin/users')
      .then((res) => setItems(res.data))
      .catch((err) => setLoadError(getErrorMessage(err, 'Could not load admin users.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const startEdit = (u) => {
    setEditingId(u.id)
    setForm({ name: u.name, email: u.email, password: '', role: u.role })
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
        const payload = { ...form }
        if (!payload.password) delete payload.password
        await api.patch(`/admin/users/${editingId}`, payload)
      } else {
        await api.post('/admin/users', form)
      }
      cancelEdit()
      load()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save this user.'))
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Remove this admin user?')) return
    await api.delete(`/admin/users/${id}`)
    setItems((list) => list.filter((u) => u.id !== id))
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Admin Users</h1>
          <p className="admin-page__subtitle">People who can sign in to this admin panel.</p>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-card">
        <h2 className="admin-card__title">{editingId ? 'Edit User' : 'Add User'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__row">
            <div className="admin-field">
              <label>Name</label>
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="admin-field">
              <label>Email</label>
              <input
                type="email"
                className="admin-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="admin-form__row">
            <div className="admin-field">
              <label>{editingId ? 'New Password (leave blank to keep current)' : 'Password'}</label>
              <input
                type="password"
                className="admin-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editingId}
                minLength={8}
              />
            </div>
            <div className="admin-field">
              <label>Role</label>
              <input
                className="admin-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add User'}
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
        {loading && <LoadingState label="Loading admin users…" />}
        {!loading && loadError && <ErrorState message={loadError} onRetry={load} />}
        {!loading && !loadError && items.length === 0 && <EmptyState message="No admin users found." />}
        {!loading && !loadError && items.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => startEdit(u)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => remove(u.id)}
                        disabled={u.id === currentUser?.id}
                        title={u.id === currentUser?.id ? "You can't remove yourself" : undefined}
                      >
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
