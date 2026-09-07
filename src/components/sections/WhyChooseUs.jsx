import { motion } from 'framer-motion'
import './WhyChooseUs.css'
import { durations, easings } from '../../utils/animationConfig'

const reasons = [
  {
    title: 'We make project delivery easier',
    full: 'Clients value partners who reduce pressure, not add to it. We support planning, coordination, and execution in a way that helps simplify delivery on the ground.',
    icon: <EasyIcon />
  },
  {
    title: 'We understand real site conditions',
    full: 'Our team works with a practical construction mindset. We understand the pressure of deadlines, sequencing, access issues, changing priorities, and live site realities.',
    icon: <SiteIcon />
  },
  {
    title: 'We are responsive and adaptable',
    full: 'Project needs can change quickly. We are structured to respond fast, deploy effectively, and support shifting priorities without losing control of execution.',
    icon: <ResponsiveIcon />
  },
  {
    title: 'We bridge coordination gaps',
    full: 'We help align engineering intent, manpower availability, project requirements, and site execution so that work can move forward with fewer disruptions.',
    icon: <BridgeIcon />
  },
  {
    title: 'We bring accountable supervision',
    full: 'With direct engineer and supervisor involvement, we maintain oversight, communication, and execution control throughout delivery.',
    icon: <SupervisionIcon />
  },
  {
    title: 'We support more than the task in front of us',
    full: 'We do not look at scope in isolation. We look at what is needed to help the wider project succeed, and we support accordingly within the defined framework of work.',
    icon: <PartnerIcon />
  },
]

export default function WhyChooseUs({ condensed = false, dark = false }) {
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

  const iconPulseVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        scale: { duration: durations.short },
        rotate: { duration: 0.4, ease: "easeInOut" },
      },
    },
  }

  return (
    <section className={`why-choose section${dark ? ' section--dark' : ' section--light'}`}>
      <div className="container">
        <motion.div 
          className={`text-center reveal`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.5 }}
          variants={containerVariants}
        >
          <motion.span 
            className="section-label"
            variants={itemVariants}
          >
            Why Work With Us
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Why Choose Rukn Al Harir
          </motion.h2>
          {!condensed && (
            <motion.p 
              className="section-subtitle"
              variants={itemVariants}
            >
              We are built to solve real project challenges — not just execute scope.
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          className="why-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.6 }}
          variants={containerVariants}
        >
          {reasons.map((r, i) => (
            <motion.div 
              key={r.title} 
              className="why-card reveal"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="why-card__icon" 
                aria-hidden="true"
                variants={iconPulseVariants}
                whileHover="hover"
              >
                {r.icon}
              </motion.div>
              <div className="why-card__body">
                <h3 className="why-card__title">{r.title}</h3>
                {!condensed && <p className="why-card__text">{r.full}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function EasyIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}
function SiteIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function ResponsiveIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}
function BridgeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6v12M20 6v12M4 12h16M4 6c4-3 12-3 16 0M4 18c4 3 12 3 16 0"/></svg>
}
function SupervisionIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function PartnerIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
}
