/**
 * PageTransition
 * Hard-edged color-wipe on route change. A solid navy panel (with an
 * accent leading edge) sweeps left-to-right across the viewport each time
 * the route changes, reinforcing the brutalist "stamp/slide" motion
 * language instead of a soft crossfade.
 *
 * The panel is pointer-events:none, so navigation and interaction are
 * never blocked mid-wipe. Honors prefers-reduced-motion by rendering
 * nothing.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div className="page-transition" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={pathname}
          className="page-transition__panel"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  )
}
