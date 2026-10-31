import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './CoreServicesGrid.css'
import { durations, easings } from '../../utils/animationConfig'
import { useScrollReveal } from '../../utils/useScrollReveal'

const services = [
  {
    id: 'mep',
    icon: <MEPIcon />,
    title: 'MEP Execution Works',
    summary: 'Electromechanical installation, HVAC, plumbing and drainage, electrical fitting, and mechanical utility works executed with engineering oversight.',
    hash: '#mep'
  },
  {
    id: 'civil',
    icon: <CivilIcon />,
    title: 'Civil Support & Finishing Works',
    summary: 'Tiling, plastering, painting, ceiling and partition works, carpentry and finishing support across commercial and residential project environments.',
    hash: '#civil'
  },
  {
    id: 'support',
    icon: <SupportIcon />,
    title: 'Project Support Services',
    summary: 'Site execution support, manpower deployment and supervision, workfront coordination, and procurement support through approved channels.',
    hash: '#support'
  },
  {
    id: 'fire-safety',
    icon: <FireIcon />,
    title: 'Fire Fighting & Life Safety',
    summary: 'Fire fighting safety equipment installation, fire detection & prevention systems, fire alarms, smoke detectors, and fire pump stations.',
    hash: '#fire-safety'
  },
  {
    id: 'energy',
    icon: <EnergyIcon />,
    title: 'Alternative Energy Installation',
    summary: 'Solar and alternative energy system installation support where applicable to approved project scope and requirements.',
    hash: '#energy'
  }
]

export default function CoreServicesGrid({ condensed = false }) {
  const { ref: titleRef } = useScrollReveal(0.5, true)
  const { ref: gridRef } = useScrollReveal(0.6, true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
    hover: {
      y: -4,
      boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
      transition: {
        duration: durations.short,
        ease: easings.fastOutSlowIn,
      },
    },
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: durations.short,
        ease: easings.snapBounce,
        delay: 0.15,
      },
    },
    hover: {
      rotate: -5,
      scale: 1.05,
      transition: {
        duration: durations.micro,
      },
    },
  }

  return (
    <section className={`core-services section${condensed ? ' section--light' : ''}`}>
      <div className="container">
        {!condensed && (
          <motion.div 
            className="text-center reveal"
            ref={titleRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.5 }}
            variants={containerVariants}
          >
            <motion.span 
              className="section-label"
              variants={itemVariants}
            >
              What We Do
            </motion.span>
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              Our Core Services
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              variants={itemVariants}
            >
              Specialized execution across MEP, civil, and technical disciplines — delivering results on site, on schedule.
            </motion.p>
          </motion.div>
        )}

        {condensed && (
          <motion.div 
            className="reveal"
            ref={titleRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.5 }}
            variants={containerVariants}
          >
            <motion.span 
              className="section-label"
              variants={itemVariants}
            >
              What We Do
            </motion.span>
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              Core Services
            </motion.h2>
          </motion.div>
        )}

        <motion.div 
          className="core-services__grid"
          ref={gridRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.6 }}
          variants={containerVariants}
        >
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="service-card-wrap"
              variants={cardVariants}
              whileHover="hover"
            >
              <Link
                to={`/services${svc.hash}`}
                className="service-card reveal"
                aria-label={`Learn more about ${svc.title}`}
              >
                <motion.div 
                  className="service-card__icon-wrap" 
                  aria-hidden="true"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: durations.short }}
                >
                  {svc.icon}
                </motion.div>
                <div className="service-card__body">
                  <h3 className="service-card__title">{svc.title}</h3>
                  <p className="service-card__summary">{svc.summary}</p>
                </div>
                <span className="service-card__arrow" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
                <motion.div 
                  className="service-card__accent" 
                  aria-hidden="true"
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, threshold: 0.5 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {condensed && (
          <motion.div 
            className="text-center" 
            style={{ marginTop: '2rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, threshold: 0.5 }}
            transition={{ delay: 0.3, duration: durations.medium }}
          >
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function MEPIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="16" width="40" height="8" rx="2"/>
      <path d="M12 16V8M24 16V8M36 16V8M12 24v8M24 24v8M36 24v8"/>
      <circle cx="12" cy="6" r="2"/><circle cx="24" cy="6" r="2"/><circle cx="36" cy="6" r="2"/>
      <circle cx="12" cy="34" r="2"/><circle cx="24" cy="34" r="2"/><circle cx="36" cy="34" r="2"/>
    </svg>
  )
}

function CivilIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polygon points="24,4 44,44 4,44"/>
      <line x1="14" y1="44" x2="14" y2="28"/><line x1="24" y1="44" x2="24" y2="22"/><line x1="34" y1="44" x2="34" y2="28"/>
      <line x1="4" y1="44" x2="44" y2="44"/>
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="14" r="8"/>
      <path d="M8 44c0-8.8 7.2-16 16-16s16 7.2 16 16"/>
      <path d="M34 20l4 4-4 4M38 24H28"/>
    </svg>
  )
}

function EnergyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="24" r="10"/>
      <line x1="24" y1="4" x2="24" y2="10"/>
      <line x1="24" y1="38" x2="24" y2="44"/>
      <line x1="4" y1="24" x2="10" y2="24"/>
      <line x1="38" y1="24" x2="44" y2="24"/>
      <path d="M20 24l3-6 3 4 3-4 3 6" strokeWidth="2.5"/>
    </svg>
  )
}

function FireIcon() {
  return <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M24 4C24 4 15 15 15 26c0 5 4 10 9 10 2 0 3-1 3-1s1 1 3 1c5 0 9-5 9-10 0-11-9-22-9-22z"/><path d="M24 18c0 4-3 7-3 10 0 2.5 1.5 4 3 4s3-1.5 3-4c0-3-3-6-3-10z"/></svg>
}
