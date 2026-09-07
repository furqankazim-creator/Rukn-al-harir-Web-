export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="admin-state">
      <span className="admin-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="admin-state admin-state--error">
      <WarningIcon />
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return <div className="admin-state admin-state--empty">{message}</div>
}

function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
