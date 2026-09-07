import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Loader from './components/ui/Loader'
import SmoothScroll from './components/layout/SmoothScroll'
import Layout from './components/layout/Layout'
import RouteFallback from './components/ui/RouteFallback'
import { AuthProvider } from './admin/context/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Approach = lazy(() => import('./pages/Approach'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))

const AdminLayout = lazy(() => import('./admin/components/AdminLayout'))
const AdminLogin = lazy(() => import('./admin/pages/Login'))
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'))
const AdminContacts = lazy(() => import('./admin/pages/Contacts'))
const AdminServices = lazy(() => import('./admin/pages/Services'))
const AdminGallery = lazy(() => import('./admin/pages/Gallery'))
const AdminSettings = lazy(() => import('./admin/pages/Settings'))
const AdminUsers = lazy(() => import('./admin/pages/Users'))

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

        <Route path="/admin" element={<AuthProvider><Outlet /></AuthProvider>}>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
      </SmoothScroll>
    </MotionConfig>
  )
}
