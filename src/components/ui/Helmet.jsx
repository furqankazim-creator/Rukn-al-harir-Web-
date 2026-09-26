import { useEffect } from 'react'

const DOMAIN = 'https://www.ruknalharir.com'

const DEFAULT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': 'Rukn Al Harir Technical Services LLC',
  'url': DOMAIN,
  'logo': `${DOMAIN}/logomain.png`,
  'image': `${DOMAIN}/logomain.png`,
  'telephone': '+971502874520',
  'email': 'info@ruknalharir.com',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'DIFC',
    'addressLocality': 'Dubai',
    'addressRegion': 'Dubai',
    'addressCountry': 'AE',
  },
  'areaServed': {
    '@type': 'Country',
    'name': 'United Arab Emirates',
  },
  'sameAs': [
    'https://ae.linkedin.com/company/rukn-al-harir-technical-services',
  ],
  'serviceType': [
    'MEP Execution Works',
    'Civil Support & Finishing',
    'Project Support Services',
    'Alternative Energy Installation',
  ],
}

function updateMetaTag(attribute, attrValue, content) {
  if (!content) return
  let element = document.querySelector(`meta[${attribute}="${attrValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateLinkTag(rel, href) {
  if (!href) return
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function Helmet({ title, description, schema }) {
  useEffect(() => {
    // 1. Update Title
    if (title) document.title = title

    // 2. Update Description
    if (description) {
      updateMetaTag('name', 'description', description)
      updateMetaTag('property', 'og:description', description)
      updateMetaTag('name', 'twitter:description', description)
    }

    // 3. Update Canonical Link & Social URLs
    const currentUrl = typeof window !== 'undefined' ? `${DOMAIN}${window.location.pathname}` : DOMAIN
    updateLinkTag('canonical', currentUrl)
    updateMetaTag('property', 'og:url', currentUrl)

    if (title) {
      updateMetaTag('property', 'og:title', title)
      updateMetaTag('name', 'twitter:title', title)
    }

    // 4. Inject JSON-LD Structured Data Schema
    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    const jsonLdData = schema || DEFAULT_SCHEMA
    scriptTag.textContent = JSON.stringify(jsonLdData)
  }, [title, description, schema])

  return null
}
