/**
 * AnimatedButton Component
 * Wraps buttons with consistent neo-brutalist hover/press animations
 */

import { motion } from 'framer-motion'
import { durations, easings } from '../utils/animationConfig'

export function AnimatedButton({ children, className = '', onClick, ...props }) {
  const buttonVariants = {
    rest: {
      y: 0,
      boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
    },
    hover: {
      y: -2,
      boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
      transition: {
        duration: durations.short,
        ease: easings.fastOutSlowIn,
      },
    },
    tap: {
      y: 2,
      boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: durations.micro,
      },
    },
  }

  return (
    <motion.button
      className={`btn ${className}`}
      onClick={onClick}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * AnimatedLink Component
 * Wraps links with consistent neo-brutalist hover/underline animations
 */

export function AnimatedLink({ to, children, className = '', ...props }) {
  const linkVariants = {
    rest: { textDecoration: "none" },
    hover: { textDecoration: "underline" },
  }

  return (
    <motion.a
      href={to}
      className={`link ${className}`}
      variants={linkVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: durations.short }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

/**
 * AnimatedCard Component
 * Reusable card wrapper with consistent lift + shadow animation
 */

export function AnimatedCard({ children, className = '', ...props }) {
  const cardVariants = {
    rest: {
      y: 0,
      boxShadow: "6px 6px 0px rgba(0, 0, 0, 1)",
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

  return (
    <motion.div
      className={`card ${className}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      {...props}
    >
      {children}
    </motion.div>
  )
}
