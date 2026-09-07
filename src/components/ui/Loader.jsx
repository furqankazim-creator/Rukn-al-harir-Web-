import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

/**
 * Loader — full-screen intro preloader with an animated construction crane.
 * Shows once on initial page load, then fades away. Waits for the window
 * `load` event (or a max timeout) so it never hangs, and locks body scroll
 * while visible.
 */
export default function Loader({ minDuration = 1800, maxDuration = 4000 }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const start = Date.now()

    const finish = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, minDuration - elapsed)
      window.setTimeout(() => setLoading(false), remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    // Safety net: never trap the user behind the loader
    const hardStop = window.setTimeout(() => setLoading(false), maxDuration)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(hardStop)
    }
  }, [minDuration, maxDuration])

  // Lock scroll while the loader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Rukn Al Harir"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <div className="loader__inner">
            <CraneIcon />

            <div className="loader__brand">
              <span className="loader__brand-main">RUKN AL HARIR</span>
              <span className="loader__brand-sub">Technical Services</span>
            </div>

            <div className="loader__bar" aria-hidden="true">
              <span className="loader__bar-fill" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CraneIcon() {
  return (
    <svg
      className="crane"
      width="150"
      height="150"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line className="crane__ground" x1="20" y1="182" x2="180" y2="182" />

      {/* Base */}
      <path className="crane__stroke" d="M84 182 L96 120 L104 120 L116 182" />
      <line className="crane__stroke" x1="88" y1="160" x2="112" y2="160" />
      <line className="crane__stroke" x1="86" y1="145" x2="114" y2="145" />

      {/* Mast (tower) */}
      <rect className="crane__stroke" x="94" y="46" width="12" height="76" />
      <line className="crane__stroke" x1="94" y1="62" x2="106" y2="76" />
      <line className="crane__stroke" x1="106" y1="62" x2="94" y2="76" />
      <line className="crane__stroke" x1="94" y1="90" x2="106" y2="104" />
      <line className="crane__stroke" x1="106" y1="90" x2="94" y2="104" />

      {/* Rotating top — jib + counter-jib */}
      <g className="crane__jib">
        {/* Counter-jib (left) with counterweight */}
        <line className="crane__stroke" x1="100" y1="46" x2="52" y2="46" />
        <rect className="crane__accent-fill" x="46" y="42" width="12" height="14" rx="1" />

        {/* Main jib (right) */}
        <line className="crane__stroke" x1="100" y1="46" x2="176" y2="46" />
        {/* Apex + tie cables */}
        <path className="crane__stroke" d="M100 46 L100 26 L52 46" />
        <path className="crane__stroke" d="M100 26 L176 46" />
        <line className="crane__stroke" x1="100" y1="26" x2="138" y2="46" />

        {/* Trolley + hook + load (bobs up and down) */}
        <g className="crane__load">
          <line className="crane__cable" x1="150" y1="46" x2="150" y2="86" />
          <path className="crane__accent-stroke" d="M146 86 q4 8 8 0" />
          <rect className="crane__accent-fill" x="140" y="92" width="20" height="16" rx="1" />
        </g>
      </g>
    </svg>
  )
}
