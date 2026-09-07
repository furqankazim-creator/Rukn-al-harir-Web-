import { useEffect } from 'react'
import { usePublicSettings } from '../../hooks/usePublicSettings'
import './MaintenanceBanner.css'

// Shows a dismissible-looking (but always-present-until-toggled-off) strip
// when an admin turns on "Maintenance mode" in Settings. Deliberately a
// banner, not a full-page block — flipping a checkbox in the admin panel
// should never be able to silently take the entire public site offline.
//
// Toggles a class on <html> (rather than just rendering inline) so the
// fixed Navbar — and the page content below it — can shift down to make
// room, without this component needing to know anything about Navbar's CSS.
export default function MaintenanceBanner() {
  const { maintenance_mode: maintenanceMode } = usePublicSettings({ maintenance_mode: 'false' })
  const active = maintenanceMode === 'true'

  useEffect(() => {
    document.documentElement.classList.toggle('has-maintenance-banner', active)
    return () => document.documentElement.classList.remove('has-maintenance-banner')
  }, [active])

  if (!active) return null

  return (
    <div className="maintenance-banner" role="status">
      We're currently making updates to the site. Some information may be temporarily out of date.
    </div>
  )
}
