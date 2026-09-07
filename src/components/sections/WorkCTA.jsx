import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './WorkCTA.css'

const EASE = [0.16, 1, 0.3, 1]

const highlights = [
  { label: 'Seven-Stage Execution Model', icon: <ModelIcon /> },
  { label: 'Direct Engineer & Supervisor Oversight', icon: <OversightIcon /> },
  { label: 'Fast Mobilization on Site Requirements', icon: <SpeedIcon /> },
]

export default function WorkCTA() {
  return (
    <section className="work-cta">
      <div className="work-cta__shape work-cta__shape--a" aria-hidden="true" />
      <div className="work-cta__shape work-cta__shape--b" aria-hidden="true" />

      <div className="container work-cta__inner">
        <motion.div
          className="work-cta__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="section-label work-cta__label">Let's Get to Work</span>
          <h2 className="work-cta__title">Ready to Put This Process to Work for You?</h2>
          <p className="work-cta__sub">
            Tell us what your project needs, and we'll bring the same disciplined,
            seven-stage execution model to your site — from first review to final closeout.
          </p>

          <div className="work-cta__actions">
            <Link to="/contact" className="btn btn-navy">Get a Quote</Link>
            <Link to="/services" className="btn btn-outline work-cta__outline">Explore Our Services</Link>
          </div>
        </motion.div>

        <motion.ul
          className="work-cta__highlights"
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          {highlights.map((h) => (
            <motion.li
              key={h.label}
              className="work-cta__highlight"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
              }}
            >
              <span className="work-cta__highlight-icon" aria-hidden="true">{h.icon}</span>
              <span>{h.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function ModelIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
}
function OversightIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
}
function SpeedIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
}
