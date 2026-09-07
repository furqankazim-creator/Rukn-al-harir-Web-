import './Hero.css'

export default function PageHero({ label, title, subtitle, image, imageAlt = '' }) {
  const hasImage = Boolean(image)

  // Image variant: show ONLY the image (no text, no navy background).
  // Keep a visually-hidden <h1> so the page still has an accessible heading.
  if (hasImage) {
    return (
      <section
        className="page-hero page-hero--with-image"
        aria-label={`${title} page header`}
      >
        <h1 className="sr-only">{title}</h1>
        <div className="container">
          <div className="page-hero__media">
            <img src={image} alt={imageAlt || title} loading="eager" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-hero" aria-label={`${title} page header`}>
      <div className="page-hero__geo" aria-hidden="true" />
      <div className="page-hero__geo-accent" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__content">
          {label && <span className="page-hero__label">{label}</span>}
          <h1 className="page-hero__title">{title}</h1>
          {subtitle && <p className="page-hero__sub">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
