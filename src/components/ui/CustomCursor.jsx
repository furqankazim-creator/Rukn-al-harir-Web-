/**
 * CustomCursor
 * Hard-edged square cursor + trailing follower, matching the brutalist
 * language. Desktop/fine-pointer only — never renders on touch devices or
 * for reduced-motion users. Grows and inverts over interactive elements.
 */
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Only on devices with a fine pointer (mouse), and not reduced-motion
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduceMotion) return
    setEnabled(true)

    const dot = dotRef.current
    const ring = ringRef.current
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    // Ring eases toward the pointer (trailing follower)
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const hoverSel = 'a, button, [role="button"], input, textarea, select, .service-card, .magnetic'
    const onOver = (e) => {
      if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover')
    }
    const onOut = (e) => {
      if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('cursor-hover')
    }
  }, [reduceMotion])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
