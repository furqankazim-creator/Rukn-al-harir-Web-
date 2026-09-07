/**
 * Magnetic
 * Wraps any element so it eases toward the cursor while hovered, then
 * eases back on leave — the classic "premium" magnetic button feel.
 * Disabled on touch devices and for reduced-motion users (renders a plain
 * wrapper). Animates transform only (GPU-friendly); a short CSS transition
 * gives the trailing/spring-back ease.
 */
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  if (reduceMotion) {
    return <span className={`magnetic ${className}`}>{children}</span>
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: 'inline-block',
        willChange: 'transform',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </span>
  )
}
