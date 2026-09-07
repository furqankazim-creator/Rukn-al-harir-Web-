// Brief fallback shown while a lazy-loaded route chunk downloads.
// Kept intentionally minimal — most navigations resolve before this
// is even visible, since chunks are small and usually already cached.
export default function RouteFallback() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 32,
          height: 32,
          border: '3px solid rgba(18, 23, 69, 0.12)',
          borderTopColor: 'var(--accent, #B40504)',
          borderRadius: '50%',
          animation: 'route-fallback-spin 0.7s linear infinite',
        }}
      />
      <style>{`
        @keyframes route-fallback-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
