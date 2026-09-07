import { Router } from 'express'
import healthRoutes from './health.routes.js'
import contactRoutes from './contact.routes.js'
import publicRoutes from './public.routes.js'
import adminAuthRoutes from './admin/auth.routes.js'
import adminServicesRoutes from './admin/services.routes.js'
import adminGalleryRoutes from './admin/gallery.routes.js'
import adminSettingsRoutes from './admin/settings.routes.js'
import adminUsersRoutes from './admin/users.routes.js'
import adminContactsRoutes from './admin/contacts.routes.js'

const router = Router()

router.use(healthRoutes)
router.use(contactRoutes)
router.use(publicRoutes)

router.use('/admin', adminAuthRoutes)
router.use('/admin/services', adminServicesRoutes)
router.use('/admin/gallery', adminGalleryRoutes)
router.use('/admin/settings', adminSettingsRoutes)
router.use('/admin/users', adminUsersRoutes)
router.use('/admin/contacts', adminContactsRoutes)

export default router
