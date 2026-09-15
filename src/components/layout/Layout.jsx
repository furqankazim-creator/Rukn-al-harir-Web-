import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import MaintenanceBanner from './MaintenanceBanner'
import ScrollProgress from '../ui/ScrollProgress'
import PageTransition from '../ui/PageTransition'
import CustomCursor from '../ui/CustomCursor'
import { useGlobalReveal } from '../../utils/useScrollReveal'

export default function Layout() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  // Ensure main content is offset by the actual navbar height (handles mobile/padded states)
  useEffect(() => {
    const el = document.querySelector('.navbar')
    if (!el) return

    const setVar = () => {
      const h = el.getBoundingClientRect().height
      document.documentElement.style.setProperty('--navbar-height', `${Math.ceil(h)}px`)
    }

    setVar()

    let ro
    if (window.ResizeObserver) {
      ro = new ResizeObserver(setVar)
      ro.observe(el)
    } else {
      window.addEventListener('resize', setVar)
      window.addEventListener('orientationchange', setVar)
    }

    return () => {
      if (ro) ro.disconnect()
      else {
        window.removeEventListener('resize', setVar)
        window.removeEventListener('orientationchange', setVar)
      }
    }
  }, [pathname])

  // Scroll to top on route change (Lenis-aware; falls back to native)
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, lenis])

  // Reveal-on-scroll for all .reveal elements (re-scans per route, replays up/down)
  useGlobalReveal(pathname)

  return (
    <>
      <ScrollProgress />
      <PageTransition />
      <CustomCursor />
      <MaintenanceBanner />
      <Navbar />
      <main id="main-content" style={{ paddingTop: 'var(--navbar-height, 76px)' }}>
        <Outlet />
      </main>
      <Footer />
      {/* Contact page already has its own WhatsApp CTA — the floating button
          would sit right on top of the phone number on narrow screens */}
      {pathname !== '/contact' && <WhatsAppButton />}
    </>
  )
}
