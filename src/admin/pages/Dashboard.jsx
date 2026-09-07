import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState } from '../components/Stateviews'

const STATS = [
  { key: 'contacts', label: 'Total Inquiries', icon: <InboxIcon /> },
  { key: 'newContacts', label: 'New Inquiries', icon: <SparkleIcon /> },
  { key: 'services', label: 'Services', icon: <ServicesIcon /> },
  { key: 'gallery', label: 'Gallery Images', icon: <GalleryIcon /> },
  { key: 'users', label: 'Admin Users', icon: <UsersIcon /> },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    api
      .get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(getErrorMessage(err, 'Could not load dashboard stats.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Dashboard</h1>
          <p className="admin-page__subtitle">Overview of your website's content and activity.</p>
        </div>
      </div>

      {loading && <LoadingState label="Loading dashboard…" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && stats && (
        <div className="admin-stat-grid">
          {STATS.map(({ key, label, icon }) => (
            <div className="admin-stat-card" key={key}>
              <span className="admin-stat-card__icon" aria-hidden="true">{icon}</span>
              <div className="admin-stat-card__body">
                <span className="admin-stat-card__value">{stats[key] ?? 0}</span>
                <span className="admin-stat-card__label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function InboxIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>
}
function SparkleIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>
}
function ServicesIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
}
function GalleryIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
}
function UsersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 21v-2a4 4 0 00-3-3.87M14 3.13a4 4 0 010 7.75"/></svg>
}
