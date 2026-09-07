import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../admin.css'

export default function ProtectedRoute({ children }) {
  const { user, loading, connectionError, retry } = useAuth()

  if (loading) {
    return (
      <div className="admin-fullpage-state">
        <span className="admin-spinner" aria-hidden="true" />
        <span>Loading…</span>
      </div>
    )
  }

  if (connectionError) {
    return (
      <div className="admin-fullpage-state admin-fullpage-state--error">
        <WarningIcon />
        <h2>Can't reach the API server</h2>
        <p>Make sure the backend is running and that <code>VITE_API_URL</code> points to it, then try again.</p>
        <button type="button" className="admin-btn admin-btn--primary" onClick={retry}>
          Retry
        </button>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}

function WarningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
