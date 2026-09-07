import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './GalleryPreview.css'

const defaultImages = [
  { src: '/images/gallery/gallery-02.png', alt: 'HVAC ductwork installation by a Rukn Al Harir technician', category: 'MEP' },
  { src: '/images/gallery/gallery-03.png', alt: 'Precast concrete tank installation on site', category: 'Civil' },
  { src: '/images/gallery/gallery-05.png', alt: 'Skid loader earthworks on site', category: 'Site' },
  { src: '/images/gallery/gallery-08.png', alt: 'Rooftop MEP pipe installation', category: 'MEP' },
  { src: '/images/gallery/gallery-01.png', alt: 'Drainage pipe and inspection tank installation in trench', category: 'MEP' },
  { src: '/images/gallery/gallery-04.png', alt: 'Water tanker supporting site drainage works', category: 'Site' },
]

export default function GalleryPreview({
  images = defaultImages,
  label = 'On-Site Execution',
  title = 'A Look at Our Project Work',
  subtitle = 'A glimpse of the MEP, civil, and site execution works our teams deliver across UAE construction projects.',
  ctaTo = null,
  ctaLabel = 'View Full Gallery',
  layout = 'bento',
}) {
  const gridImages = layout === 'grid' ? images : images.slice(0, 6)

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="gallery-preview section">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <motion.div
          className={`gallery-preview__grid${layout === 'grid' ? ' gallery-preview__grid--uniform' : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {gridImages.map((img) => (
            <motion.div key={img.src} className="gallery-preview__item" variants={itemVariants}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.category && (
                <div className="gallery-preview__overlay">
                  <span className="gallery-preview__category">{img.category}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {ctaTo && (
          <div className="gallery-preview__cta text-center">
            <Link to={ctaTo} className="btn btn-primary">
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
