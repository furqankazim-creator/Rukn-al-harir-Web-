import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import GalleryPreview from '../components/sections/GalleryPreview'
import { usePublicGallery } from '../hooks/usePublicGallery'
import './About.css'

const EASE = [0.16, 1, 0.3, 1]

const galleryPhotos = [
  { src: '/images/gallery/gallery-01.png', alt: 'Drainage pipe and inspection tank installation in trench' },
  { src: '/images/gallery/gallery-02.png', alt: 'HVAC ductwork installation by a Rukn Al Harir technician' },
  { src: '/images/gallery/gallery-03.png', alt: 'Precast concrete tank installation on site' },
  { src: '/images/gallery/gallery-04.png', alt: 'Water tanker supporting site drainage works' },
  { src: '/images/gallery/gallery-05.png', alt: 'Skid loader earthworks on site' },
  { src: '/images/gallery/gallery-06.png', alt: 'Drainage pipe network installation in trench' },
  { src: '/images/gallery/gallery-07.png', alt: 'Manhole connection sleeve installation' },
  { src: '/images/gallery/gallery-08.png', alt: 'Rooftop MEP pipe installation' },
  { src: '/images/gallery/gallery-09.png', alt: 'Floor-level pipe routing installation' },
  { src: '/images/gallery/gallery-10.png', alt: 'Electrical wiring rough-in works' },
]

const teamTiles = [
  { icon: <EngineersIcon />, label: '4 Engineers', sub: 'Direct engineering oversight on every project' },
  { icon: <SupervisorsIcon />, label: '4 Supervisors', sub: 'Active supervision and coordination on site' },
  { icon: <SkilledIcon />, label: 'Skilled Labor Force', sub: 'Trade-qualified technicians across MEP, fire protection, and civil works' },
  { icon: <GeneralIcon />, label: 'General Support Labor', sub: 'Flexible deployment to match evolving project needs' },
]

const strengths = [
  'Fast mobilization for site requirements',
  'Direct engineering and supervision involvement',
  'Flexible labor deployment based on project need',
  'Practical coordination between office and site teams',
  'Close monitoring of work progress, quality, and sequencing',
  'Ability to support both defined scopes and evolving project needs',
]

const callouts = [
  { label: 'Small enough to stay responsive', desc: 'No unnecessary layers. Decisions made quickly, on the ground.' },
  { label: 'Structured enough to deliver professionally', desc: 'Engineering oversight, supervision coverage, and proper execution controls.' },
  { label: 'Experienced enough to understand construction realities', desc: 'We know the pressures, sequencing demands, and site dynamics that affect delivery.' },
  { label: 'Flexible enough to support urgent site requirements', desc: 'Built to mobilize quickly and adapt when project conditions change.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function About() {
  const galleryImages = usePublicGallery(galleryPhotos)

  return (
    <>
      <Helmet
        title="About Us | Rukn Al Harir Technical Services"
        description="Rukn Al Harir is a UAE-based execution partner supporting construction, MEP, and site delivery with responsive support and disciplined coordination."
      />

      <PageHero
        label="Who We Are"
        title="About Us"
        subtitle="A UAE-based execution partner built for responsive project delivery and practical coordination."
      />

      <section className="about-body section">
        <div className="container">
          <div className="about-content">
            {/* Main body */}
            <div className="about-text reveal">
              <p className="about-para">
                Rukn Al Harir Technical Services is a UAE-based project execution and technical services company supporting construction, MEP, and site delivery requirements across a wide range of project environments.
              </p>
              <p className="about-para">
                We work as a dependable execution partner to main contractors, developers, consultants, facility operators, and project stakeholders who need responsive support, disciplined coordination, and reliable on-ground delivery. Our strength lies in helping clients move work forward efficiently by bridging the gap between design intent, site realities, manpower deployment, and execution requirements.
              </p>
              <p className="about-para">
                With an agile team structure, practical site understanding, and a solution-oriented mindset, we support projects through electromechanical works, HVAC, plumbing and drainage, electrical works, fire fighting and life safety systems, civil support works, and related execution services. We also assist clients with procurement coordination, material sourcing support through approved channels, and site-level planning required to maintain progress and reduce delays.
              </p>
              <p className="about-para">
                At our core, we take pride in making our clients' lives easier. We respond quickly, adapt to changing project conditions, and go beyond the immediate task to help keep projects on track.
              </p>
            </div>

            {/* Photo treatment */}
            <motion.div
              className="about-photo"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="about-photo-frame">
                <div className="about-photo-frame__ring" aria-hidden="true" />
                <div className="about-photo-frame__diagonal" aria-hidden="true" />
                <motion.div
                  className="about-photo-frame__circle"
                  initial={{ scale: 0.85 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                >
                  <img
                    src="/images/photos/about-team-review.jpeg"
                    alt="Project team reviewing construction drawings on site"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <GalleryPreview
        images={galleryImages}
        label="Gallery"
        title="A Look at Our Project Execution"
        subtitle="A selection of MEP, fire fighting, civil, and site works showing our on-ground execution capability."
        layout="grid"
        ctaTo={null}
      />

      <section className="about-body section" style={{ paddingTop: 0 }}>
        <div className="container">
          {/* Vision / Mission */}
          <div className="vm-section reveal">
            <div className="vm-card">
              <div className="vm-card__icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="vm-card__title">Vision</h3>
              <p className="vm-card__text">
                To be recognized as a trusted construction and MEP execution partner in the UAE, known for reliability, responsiveness, and practical project support that helps clients deliver with confidence.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-card__icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <h3 className="vm-card__title">Mission</h3>
              <p className="vm-card__text">
                To provide disciplined, solution-focused execution support across MEP, fire protection & life safety, technical, and site works by combining engineering oversight, field coordination, manpower capability, and dependable delivery.
              </p>
            </div>
          </div>

          {/* Team structure */}
          <motion.div
            className="text-center about-section-head"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <span className="section-label">General Team Structure per Project</span>
            <p className="section-subtitle">
              Our standard team scales with project size. Every engagement includes direct engineering and supervision involvement.
            </p>
          </motion.div>

          <motion.div
            className="team-tiles"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {teamTiles.map((t) => (
              <motion.div
                key={t.label}
                className="team-tile"
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              >
                <div className="team-tile__icon" aria-hidden="true">{t.icon}</div>
                <h3 className="team-tile__label">{t.label}</h3>
                <p className="team-tile__sub">{t.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Execution strengths */}
          <div className="exec-strengths">
            <motion.div
              className="exec-strengths__text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="section-label">Execution Strengths</span>
              <h2 className="section-title">What We Bring to Every Project</h2>
              <motion.ul
                className="strengths-list"
                role="list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {strengths.map((s, i) => (
                  <motion.li
                    key={i}
                    className="strengths-list__item"
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } } }}
                  >
                    <span className="strengths-list__icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              className="exec-strengths__photo"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <div className="cap-photo-frame">
                <div className="cap-photo-frame__ring" aria-hidden="true" />
                <div className="cap-photo-frame__bg" aria-hidden="true" />
                <div className="cap-photo-frame__circle">
                  <img
                    src="/images/photos/about-team-branded.jpg"
                    alt="Rukn Al Harir technician reviewing drawings on an active MEP fit-out site"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Operational capability callouts */}
          <div className="op-callouts">
            <motion.div
              className="op-callouts__header"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
            >
              <span className="section-label">Operational Profile</span>
              <h2 className="section-title">Built for Construction Reality</h2>
            </motion.div>
            <motion.div
              className="op-callouts__grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {callouts.map((c, i) => (
                <motion.div
                  key={i}
                  className="op-callout"
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
                >
                  <div className="op-callout__num" aria-hidden="true">{String(i+1).padStart(2,'0')}</div>
                  <h3 className="op-callout__label">{c.label}</h3>
                  <p className="op-callout__desc">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Closing line */}
          <motion.div
            className="cap-closing"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            <p className="cap-closing__text">
              "This balance allows us to support projects efficiently without unnecessary layers, delays, or communication breakdowns."
            </p>
          </motion.div>

          {/* Core Values — callout */}
          <div className="core-values reveal">
            <div className="core-values__header">
              <h3 className="core-values__title">Core Values</h3>
              <p className="core-values__sub">
                These principles guide every project we support and every decision we make.
              </p>
            </div>
            <ul className="core-values__list" role="list">
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Integrity</strong> in commitments and communication</span>
              </li>
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Quality</strong> in execution and workmanship</span>
              </li>
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Accountability</strong> at every stage of delivery</span>
              </li>
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Responsiveness</strong> to project demands</span>
              </li>
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Safety-minded</strong> site operations</span>
              </li>
              <li className="core-values__item">
                <span className="core-values__bullet" aria-hidden="true">●</span>
                <span><strong>Partnership-driven</strong> thinking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

function EngineersIcon() {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="24" cy="14" r="8"/><path d="M6 46c0-9.9 8.1-18 18-18s18 8.1 18 18"/><path d="M30 20l4 2v6l-4 2M18 20l-4 2v6l4 2"/></svg>
}
function SupervisorsIcon() {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="24" cy="14" r="8"/><path d="M6 46c0-9.9 8.1-18 18-18s18 8.1 18 18"/><polyline points="20 28 24 32 30 26"/></svg>
}
function SkilledIcon() {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="2"/><path d="M16 24l6 6 10-12M8 18h32"/></svg>
}
function GeneralIcon() {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M8 40l8-14 8 7 8-10 8 17"/><path d="M16 20a4 4 0 100-8 4 4 0 000 8z"/></svg>
}
