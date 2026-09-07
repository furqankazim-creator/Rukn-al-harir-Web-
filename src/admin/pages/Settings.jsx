import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { getErrorMessage } from '../utils/getErrorMessage'
import { LoadingState, ErrorState } from '../components/Stateviews'

const DEFAULTS = { site_title: '', primary_color: '', footer_text: '', maintenance_mode: false }

export default function Settings() {
  const [form, setForm] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [success, setSuccess] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setLoadError('')
    api
      .get('/admin/settings')
      .then((res) => {
        setForm({
          site_title: res.data.site_title || '',
          primary_color: res.data.primary_color || '',
          footer_text: res.data.footer_text || '',
          maintenance_mode: res.data.maintenance_mode === 'true',
        })
      })
      .catch((err) => setLoadError(getErrorMessage(err, 'Could not load settings.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveError('')
    setSuccess(false)
    try {
      await api.patch('/admin/settings', form)
      setSuccess(true)
    } catch (err) {
      setSaveError(getErrorMessage(err, 'Could not save settings.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Site Settings</h1>
          <p className="admin-page__subtitle">General configuration for the public website.</p>
        </div>
      </div>

      {loading && <LoadingState label="Loading settings…" />}
      {!loading && loadError && <ErrorState message={loadError} onRetry={load} />}

      {!loading && !loadError && (
        <div className="admin-card">
          {saveError && <div className="admin-alert admin-alert--error">{saveError}</div>}
          {success && <div className="admin-alert admin-alert--success">Settings saved.</div>}

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-field">
              <label>Site Title</label>
              <input
                className="admin-input"
                value={form.site_title}
                onChange={(e) => setForm({ ...form, site_title: e.target.value })}
                placeholder="Rukn Al Harir Technical Services"
              />
            </div>
            <div className="admin-form__row">
              <div className="admin-field">
                <label>Primary Color</label>
                <input
                  className="admin-input"
                  value={form.primary_color}
                  onChange={(e) => setForm({ ...form, primary_color: e.target.value })}
                  placeholder="#B40504"
                />
              </div>
              <div className="admin-field" style={{ justifyContent: 'flex-end' }}>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={form.maintenance_mode}
                    onChange={(e) => setForm({ ...form, maintenance_mode: e.target.checked })}
                  />
                  Maintenance mode
                </label>
              </div>
            </div>
            <div className="admin-field">
              <label>Footer Text</label>
              <textarea
                className="admin-textarea"
                value={form.footer_text}
                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                placeholder="Dependable execution. Practical support. Project-focused delivery."
              />
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
