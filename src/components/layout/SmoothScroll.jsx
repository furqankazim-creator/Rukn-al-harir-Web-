/**
 * SmoothScroll
 * App-level inertia scrolling via Lenis, synced to GSAP ScrollTrigger so
 * scroll-scrubbed animations stay in lockstep with the smoothed scroll
 * position.
 *
 * Honors prefers-reduced-motion: when the user asks for reduced motion we
 * skip Lenis entirely and fall back to native scrolling (no inertia).
 * The brutalist feel is kept — Lenis is tuned tight/snappy, not floaty.
 */
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ScrollTrigger } from '../../motion/gsap'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    // Keep ScrollTrigger's notion of scroll in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [reduceMotion])

  // Reduced motion: render children with plain native scroll
  if (reduceMotion) return children

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // Tight + snappy to match the brutalist language (not floaty)
        duration: 0.9,
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
