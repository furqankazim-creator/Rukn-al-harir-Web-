import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { usePublicSettings } from '../../hooks/usePublicSettings'
import './Footer.css'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

const DEFAULT_TAGLINE = 'Dependable execution. Practical support. Project-focused delivery.'

export default function Footer() {
  const { footer_text: tagline } = usePublicSettings({ footer_text: DEFAULT_TAGLINE })

  return (
    <footer className="footer" role="contentinfo">
      {/* Diagonal accent */}
      <div className="footer__accent" aria-hidden="true" />

      {/* Decorative layers */}
      <div className="footer__pattern" aria-hidden="true" />
      <div className="footer__watermark" aria-hidden="true">RUKN AL HARIR</div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand col */}
            <div className="footer__brand">
              <Logo variant="light" size="md" />
              <p className="footer__tagline">{tagline}</p>
              <div className="footer__social" aria-label="Social media links">
                {[
                  { name: 'LinkedIn', href: 'https://ae.linkedin.com/company/rukn-al-harir-technical-services' },
                  { name: 'Instagram', href: '#' },
                  { name: 'Facebook', href: '#' },
                ].map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="footer__social-link"
                    aria-label={name}
                    target={href !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <SocialIcon name={name} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="footer__col">
              <h3 className="footer__heading">Quick Links</h3>
              <ul className="footer__links" role="list">
                {navLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="footer__link">
                      <span className="footer__link-arrow" aria-hidden="true">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services col */}
            <div className="footer__col">
              <h3 className="footer__heading">Our Services</h3>
              <ul className="footer__links" role="list">
                {[
                  'MEP Execution Works',
                  'Civil Support & Finishing',
                  'Project Support Services',
                  'Alternative Energy Installation',
                ].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="footer__link">
                      <span className="footer__link-arrow" aria-hidden="true">›</span>
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact col */}
            <div className="footer__col">
              <h3 className="footer__heading">Contact Us</h3>
              <ul className="footer__contact-list" role="list">
                <li>
                  <a href="tel:+971502874520" className="footer__contact-item">
                    <PhoneIcon />
                    <span>+971 50 287 4520</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@ruknalharir.com" className="footer__contact-item">
                    <EmailIcon />
                    <span>info@ruknalharir.com</span>
                  </a>
                </li>
                <li>
                  <div className="footer__contact-item">
                    <LocationIcon />
                    <span>DIFC, Dubai, UAE</span>
                  </div>
                </li>
                <li>
                  <a href="https://www.ruknalharir.com" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                    <WebIcon />
                    <span>www.ruknalharir.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Rukn Al Harir Technical Services. All rights reserved.
          </p>

          <div className="footer__legal">
            <Link to="/privacy-policy" className="footer__legal-link">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link to="/terms" className="footer__legal-link">TERMS &amp; CONDITION</Link>
          </div>

          <a
            href="https://timeglobaltech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__previews"
            aria-label="Built by TGT"
          >
            <span className="footer__previews-credit">Built by TGT</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  if (name === 'LinkedIn') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
  if (name === 'Instagram') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{flexShrink:0}}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{flexShrink:0}}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{flexShrink:0}}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{flexShrink:0}}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  )
}

function TgtIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" rx="18" fill="#0B0B0B"/>

      <path d="M18 20H48V34H38V98H28V34H18V20ZM39 48H84V62H61V98H49V62H39V48Z" fill="#FFFFFF"/>
      <path d="M70 20H94C108 20 116 28 116 40V48H102V42C102 36 98 32 92 32H70V20ZM84 32H102V66C102 81 93 90 80 90H60V76H78C84 76 88 72 88 66V32H84Z" fill="#FFFFFF"/>
    </svg>
  )
}
