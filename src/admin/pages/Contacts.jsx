import { Fragment, useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState, EmptyState } from '../components/Stateviews'

export default function Contacts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    api
      .get('/admin/contacts')
      .then((res) => setItems(res.data))
      .catch((err) => setError(getErrorMessage(err, 'Could not load inquiries.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const setStatus = async (id, status) => {
    const prev = items
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status } : i)))
    try {
      await api.patch(`/admin/contacts/${id}`, { status })
    } catch {
      setItems(prev)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    await api.delete(`/admin/contacts/${id}`)
    setItems((list) => list.filter((i) => i.id !== id))
  }

  const newCount = items.filter((i) => i.status === 'new').length

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Inquiries</h1>
          <p className="admin-page__subtitle">
            Contact form submissions from the website.
            {!loading && !error && items.length > 0 && (
              <> {newCount > 0 ? `${newCount} new.` : 'All caught up.'}</>
            )}
          </p>
        </div>
      </div>

      <div className="admin-table-wrap">
        {loading && <LoadingState label="Loading inquiries…" />}
        {!loading && error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && items.length === 0 && <EmptyState message="No inquiries yet." />}

        {!loading && !error && items.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Project Type</th>
                <th>Received</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Fragment key={item.id}>
                  <tr>
                    <td>{item.name}</td>
                    <td>
                      <div>
                        <a href={`mailto:${item.email}`} className="admin-table__link">{item.email}</a>
                      </div>
                      {item.phone && (
                        <div>
                          <a href={`tel:${item.phone}`} className="admin-table__link admin-table__link--muted">{item.phone}</a>
                        </div>
                      )}
                    </td>
                    <td>{formatProjectType(item.project_type)}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td>
                      <select
                        className={`admin-select admin-status-select admin-status-select--${item.status}`}
                        value={item.status}
                        onChange={(e) => setStatus(item.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-btn admin-btn--ghost admin-btn--sm"
                          onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        >
                          {expandedId === item.id ? 'Hide' : 'View'}
                        </button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(item.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === item.id && (
                    <tr>
                      <td colSpan={6}>
                        <div className="admin-message-panel">{item.message}</div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function formatProjectType(value) {
  if (!value) return '—'
  const map = {
    mep: 'MEP Execution',
    civil: 'Civil Support',
    project_support: 'Project Support',
    alternative_energy: 'Alternative Energy',
    other: 'Other',
  }
  return map[value] || value
}
