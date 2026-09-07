import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Hero.css'
import { durations, easings, variants } from '../../utils/animationConfig'
import Magnetic from '../ui/Magnetic'

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,

  // full-section background video (new)
  bgVideoSrc = '/video/hero-video.mp4',
  bgPosterSrc = '/images/photos/home-hero-cover.jpg',

  // circle photo/video on the right (unchanged from before)
  videoSrc = '/video/hero-video.mp4',
  posterSrc = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1400',

  videoAlt = 'Construction site with engineers and workers',
}) {
  // Split title into lines for staggered animation
  const titleLines = title.split('\n').length > 1 
    ? title.split('\n') 
    : [title]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
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

  const badgeVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.standard,
        ease: easings.snapBounce,
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
    <section className="hero">
      {/* Full-bleed background video */}
      <div className="hero__bg" aria-hidden="true">
        <video
          className="hero__bg-video"
          src={bgVideoSrc}
          poster={bgPosterSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="container hero__content">
        <motion.div 
          className="hero__text reveal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
      
          {/* Title animates line by line */}
          <motion.h1 
            className="hero__title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleLines.map((line, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                {line}
              </motion.div>
            ))}
          </motion.h1>

          {/* Subtitle fades in */}
          {subtitle && (
            <motion.p 
              className="hero__subtitle"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA buttons scale in with bounce */}
          <motion.div 
            className="hero__actions"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {primaryCta && (
              <motion.div variants={buttonVariants}>
                <Magnetic>
                  <Link to={primaryCta.to} className="btn btn-primary">
                    {primaryCta.label}
                  </Link>
                </Magnetic>
              </motion.div>
            )}
            {secondaryCta && (
              <motion.div variants={buttonVariants}>
                <Magnetic>
                  <Link to={secondaryCta.to} className="btn btn-secondary">
                    {secondaryCta.label}
                  </Link>
                </Magnetic>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}