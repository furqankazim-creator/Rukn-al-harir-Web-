/**
 * StatsStrip — credibility numbers that count up on first viewport entry.
 * Uses the existing useCountUp hook. Respects reduced motion (snaps to the
 * final value). Brutalist styling: thick borders, hard shadows, big display
 * numerals with the orange accent.
 */
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useCountUp } from '../../utils/useScrollReveal'
import { durations, easings } from '../../utils/animationConfig'
import './StatsStrip.css'

const COUNT_START_DELAY = 1000 // ms to wait after scrolling into view

const stats = [
  { value: 150, suffix: '+', label: 'Projects Supported' },
  { value: 8, suffix: '', label: 'Industries Served' },
  { value: 24, suffix: '/7', label: 'Site Response' },
  { value: 100, suffix: '%', label: 'Delivery Focus' },
]

function Stat({ value, suffix, label, start }) {
  const reduceMotion = useReducedMotion()

  // Wait 3s after the strip scrolls into view before counting begins
  const [delayedStart, setDelayedStart] = useState(false)
  useEffect(() => {
    if (!start) { setDelayedStart(false); return }
    const t = setTimeout(() => setDelayedStart(true), COUNT_START_DELAY)
    return () => clearTimeout(t)
  }, [start])

  const count = useCountUp(value, delayedStart && !reduceMotion, 2200)
  const shown = reduceMotion ? value : count

  return (
    <div className="stat">
      <span className="stat__num">
        {shown}
        <span className="stat__suffix">{suffix}</span>
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

export default function StatsStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.medium, ease: easings.fastOutSlowIn },
    },
  }

  return (
    <section className="stats-strip section--dark" ref={ref}>
      <motion.div
        className="container stats-strip__grid"
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={item}>
            <Stat {...s} start={inView} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
