import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Loader from './components/ui/Loader'
import SmoothScroll from './components/layout/SmoothScroll'
import Layout from './components/layout/Layout'
import RouteFallback from './components/ui/RouteFallback'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Approach = lazy(() => import('./pages/Approach'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Loader />
      <SmoothScroll>
      <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/work" element={<Approach />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
      </SmoothScroll>
    </MotionConfig>
  )
}
