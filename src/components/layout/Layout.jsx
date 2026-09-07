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
      <main id="main-content" style={{ paddingTop: '76px' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
