import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../admin.css'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in. Please check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__mark" aria-hidden="true">
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#12123B" stroke="#B71C1C" strokeWidth="3" />
            <circle cx="60" cy="60" r="52" fill="#FFFFFF" />
            <g fill="#12123B">
              <rect x="55" y="10" width="10" height="14" rx="2" />
              <rect x="55" y="96" width="10" height="14" rx="2" />
              <rect x="10" y="55" width="14" height="10" rx="2" />
              <rect x="96" y="55" width="14" height="10" rx="2" />
              <rect x="22" y="22" width="10" height="14" rx="2" transform="rotate(45 27 29)" />
              <rect x="88" y="22" width="10" height="14" rx="2" transform="rotate(-45 93 29)" />
              <rect x="22" y="84" width="10" height="14" rx="2" transform="rotate(-45 27 91)" />
              <rect x="88" y="84" width="10" height="14" rx="2" transform="rotate(45 93 91)" />
            </g>
            <circle cx="60" cy="60" r="22" fill="#B71C1C" />
            <circle cx="60" cy="60" r="9" fill="#FFFFFF" />
            <rect x="56" y="52" width="7" height="26" rx="3.5" fill="#12123B" transform="rotate(-40 59.5 65)" />
            <circle cx="72" cy="42" r="8" fill="none" stroke="#12123B" strokeWidth="4" />
          </svg>
        </div>

        <div className="admin-login__brand">
          <span className="admin-login__brand-name">RUKN AL HARIR</span>
          <span className="admin-login__brand-sub">Admin Panel</span>
        </div>

        <p className="admin-login__intro">Sign in with your admin account to manage the website.</p>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@ruknalharir.com"
              required
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Password</label>
            <div className="admin-password-field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <button type="submit" className="admin-btn admin-btn--primary admin-login__submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__footnote">
          Access is limited to authorized administrators. Contact your site administrator if you've lost your credentials.
        </p>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a20.4 20.4 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a20.32 20.32 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
