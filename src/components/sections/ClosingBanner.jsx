import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ClosingBanner.css'
import { durations, easings } from '../../utils/animationConfig'

export default function ClosingBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, y: 30, borderLeftColor: 'rgba(180, 5, 4, 0)' },
    visible: {
      opacity: 1,
      y: 0,
      borderLeftColor: 'rgba(180, 5, 4, 1)',
      transition: {
        duration: durations.standard,
        ease: easings.fastOutSlowIn,
      },
    },
  }

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  }

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.short,
        ease: easings.snapBounce,
      },
    },
  }

  return (
    <section className="closing-banner" aria-labelledby="closing-heading">
      <div className="closing-banner__geo-left" aria-hidden="true" />
      <div className="closing-banner__geo-right" aria-hidden="true" />

      <div className="container closing-banner__content">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.6 }}
          variants={containerVariants}
        >
          <motion.span 
            className="section-label" 
            style={{ color: 'rgba(20,24,30,0.6)' }}
            variants={taglineVariants}
          >
            Our Commitment
          </motion.span>

          <motion.blockquote 
            className="closing-banner__quote" 
            id="closing-heading"
            variants={quoteVariants}
          >
            "At Rukn Al Harir Technical Services, we believe good execution is not only about completing work. It is about making delivery smoother, reducing pressure on the client team, and supporting project success through dependable coordination and disciplined follow-through. We take pride in making our clients' lives easier by being responsive, practical, and committed to getting the job done properly. Whether supporting a defined subcontract package, urgent site requirement, or coordination-heavy execution scope, we aim to be the partner clients trust when reliability matters most."
          </motion.blockquote>

          <motion.p 
            className="closing-banner__tagline"
            variants={taglineVariants}
          >
            Dependable execution. Practical support. Project-focused delivery.
          </motion.p>

          <motion.div 
            className="closing-banner__actions"
            variants={buttonContainerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Link to="/contact" className="btn btn-primary">
                Get a Quote
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <a href="tel:+971502874520" className="btn btn-secondary">
                Call Us Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
