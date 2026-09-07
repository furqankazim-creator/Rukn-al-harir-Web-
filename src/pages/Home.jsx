import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from '../components/ui/Helmet'
import Hero from '../components/sections/Hero'
import CoreServicesGrid from '../components/sections/CoreServicesGrid'
import StatsStrip from '../components/sections/StatsStrip'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import ClientLogos from '../components/sections/ClientLogos'
import ClosingBanner from '../components/sections/ClosingBanner'
import './Home.css'

const industries = [
  { label: 'Commercial Buildings', icon: <BuildingIcon /> },
  { label: 'Residential Developments', icon: <HomeIcon /> },
  { label: 'Industrial Facilities', icon: <IndustrialIcon /> },
  { label: 'Utility & Infrastructure', icon: <UtilityIcon /> },
  { label: 'Worker Accommodation', icon: <CampIcon /> },
  { label: 'MEP Fit-Out & Technical Spaces', icon: <FitoutIcon /> },
  { label: 'Maintenance & Upgrades', icon: <MaintenanceIcon /> },
  { label: 'Energy Project Environments', icon: <EnergyIcon /> },
]

export default function Home() {
  return (
    <>
      <Helmet
        title="Rukn Al Harir Technical Services | MEP, Civil & Technical Project Partners"
        description="UAE-based MEP, civil and technical project execution company based in DIFC, Dubai. Dependable execution, practical support, project-focused delivery."
      />

      {/* Hero */}
      <Hero
        title="Specialized MEP, Civil & Technical Project Partners"
        subtitle="We deliver disciplined, on-ground execution across electromechanical, civil, and site support works — keeping projects moving through responsive coordination and practical follow-through."
        primaryCta={{ label: 'Get a Quote', to: '/contact' }}
        secondaryCta={{ label: 'Talk to Our Team', to: '/contact' }}
      />

      {/* About Snapshot */}
      <section className="about-snap section">
        <div className="container about-snap__inner">
          <motion.div
            className="about-snap__text"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Built for Project Delivery</h2>
            <p>
              Rukn Al Harir Technical Services is a UAE-based project execution and technical services company supporting construction, MEP, and site delivery requirements across a wide range of project environments. With an agile team structure, practical site understanding, and a solution-oriented mindset, we support projects through electromechanical works, HVAC, plumbing and drainage, electrical works, civil support works, and related execution services.
            </p>
            <p style={{ marginTop: '1rem' }}>
              We respond quickly, adapt to changing project conditions, and go beyond the immediate task to help keep projects on track.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: '1.75rem' }}>
              Learn More About Us
            </Link>
          </motion.div>

          <motion.div
            className="about-snap__photo"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="photo-block">
              <div className="photo-block__diagonal" aria-hidden="true" />
              <motion.div
                className="photo-block__circle"
                initial={{ scale: 0.85 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <img
                  src="/images/photos/home-team-briefing.jpeg"
                  alt="Project team briefing on an active construction site"
                  loading="lazy"
                />
              </motion.div>
              <div className="photo-block__badge" aria-hidden="true">
                <span>DIFC, Dubai, UAE</span>
              </div>

              <motion.img
                src="/images/props/tape-measure.png"
                alt=""
                aria-hidden="true"
                className="photo-block__prop photo-block__prop--tape"
                initial={{ opacity: 0, x: 20, rotate: -6 }}
                whileInView={{ opacity: 1, x: 0, rotate: -14 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
              <motion.img
                src="/images/props/helmet.png"
                alt=""
                aria-hidden="true"
                className="photo-block__prop photo-block__prop--helmet"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services Grid */}
      <CoreServicesGrid condensed />

      {/* Credibility stats */}
      <StatsStrip />

      {/* Industries We Serve */}
      <section className="industries section section--dark">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.55)' }}>Project Environments</span>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">
              Our teams operate across a broad spectrum of UAE construction and technical project environments.
            </p>
          </div>
          <motion.div
            className="industries__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                className="industry-tile"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <span className="industry-tile__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="industry-tile__icon" aria-hidden="true">{ind.icon}</div>
                <span className="industry-tile__label">{ind.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us — condensed */}
      <WhyChooseUs condensed />

      {/* Clients */}
      <ClientLogos />

      {/* Closing Banner */}
      <ClosingBanner />
    </>
  )
}

// Industry icons
function BuildingIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
}
function HomeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function IndustrialIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="2" y="7" width="20" height="15"/><path d="M16 7V3H8v4M12 12v4"/></svg>
}
function UtilityIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
}
function CampIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 21l9-18 9 18H3z"/><path d="M9 21v-5h6v5"/></svg>
}
function FitoutIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
}
function MaintenanceIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
}
function EnergyIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}
