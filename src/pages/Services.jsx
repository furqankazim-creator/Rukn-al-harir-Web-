import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import './Services.css'

const EASE = [0.16, 1, 0.3, 1]

const deliveryStandards = [
  {
    title: 'Clear Communication',
    desc: 'Direct, jargon-free coordination between office, site, and stakeholders so decisions are never stuck waiting.',
    icon: <CommsIcon />,
  },
  {
    title: 'Qualified Manpower',
    desc: 'Trade-qualified technicians and supervisors deployed to match the exact scope and pace of each project.',
    icon: <TeamIcon />,
  },
  {
    title: 'Safety-First Execution',
    desc: 'Disciplined, safety-minded site operations that protect people, timelines, and quality of work.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Coordinated Delivery',
    desc: 'Sequencing, procurement, and follow-through aligned end to end to keep work moving without friction.',
    icon: <FlowIcon />,
  },
]

const services = [
  {
    id: 'mep',
    title: 'MEP Execution Works',
    image: '/images/photos/services-mep.png',
    imageAlt: 'MEP pipework staged for installation on an active site',
    icon: <MEPIcon />,
    items: [
      'Electromechanical installation and site support',
      'HVAC installation and associated services',
      'Plumbing and drainage works',
      'Electrical installation, fitting, and technical support',
      'Mechanical and utility-related execution works',
    ],
  },
  {
    id: 'civil',
    title: 'Civil Support & Finishing Works',
    image: '/images/photos/services-civil.png',
    imageAlt: 'Precast concrete tank installation on site',
    icon: <CivilIcon />,
    items: [
      'Tiling and surface finishing works',
      'Plaster and painting works',
      'Ceiling and partition-related works',
      'Carpentry and general finishing support',
      'Associated site preparation and coordination works',
    ],
  },
  {
    id: 'support',
    title: 'Project Support Services',
    image: '/images/photos/services-review.jpg',
    imageAlt: 'Site team reviewing construction drawings and coordination points',
    icon: <SupportIcon />,
    items: [
      'Site execution support',
      'Manpower deployment and supervision',
      'Workfront coordination',
      'Procurement support and material coordination through approved channels',
      'Technical follow-up and delivery interface support',
    ],
  },
  {
    id: 'fire-safety',
    title: 'Fire Fighting & Life Safety Systems',
    image: '/images/photos/services-fire.jpg',
    imageAlt: 'Industrial fire pump station and life safety pipework installation',
    icon: <FireIcon />,
    items: [
      'Fire fighting safety equipment installation (sprinkler networks, hose reels, hydrants & certified extinguishers)',
      'Fire detection systems & early hazard warning integration',
      'Fire prevention systems & passive fire-stopping containment',
      'Addressable & conventional fire alarm systems, smoke detectors & heat sensors',
      'UL/FM-listed fire pumps (electric, diesel & jockey pump assemblies)',
      'Civil Defense compliance, hydraulic pressure testing & commissioning support',
    ],
  },
  {
    id: 'energy',
    title: 'Alternative Energy Installation',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    imageAlt: 'Solar panel installation on a rooftop',
    icon: <EnergyIcon />,
    items: [
      'Solar and related alternative energy system installation support, where applicable to project requirements and approved scope',
    ],
  },
]

const projectEnvironments = [
  'Commercial buildings',
  'Residential developments',
  'Industrial facilities',
  'Utility and infrastructure-related works',
  'Worker accommodation and camp projects',
  'MEP-intensive fit-out and technical spaces',
  'Maintenance and upgrade requirements',
  'Developer, contractor, and subcontract execution packages',
  'Industrial and energy-related project environments',
]

const engagementModels = [
  'Subcontract execution partner',
  'Engineering support',
  'Specialized MEP support contractor',
  'Site delivery support partner',
  'Technical and manpower execution support',
  'Project support partner for fast-track and coordination-heavy works',
]

export default function Services() {
  return (
    <>
      <Helmet
        title="Our Services | Rukn Al Harir Technical Services"
        description="MEP execution, civil support, project services and alternative energy installation across UAE. Specialized delivery for commercial, industrial and residential projects."
      />

      <PageHero
        label="What We Deliver"
        title="Our Core Services"
        subtitle="Four focused service categories built for disciplined execution across UAE construction and MEP project environments."
      />

      <section className="services section">
        <div className="container">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`service-block${i % 2 !== 0 ? ' service-block--reverse' : ''}`}
            >
              <motion.div
                className="service-block__media"
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="service-block__frame">
                  <div className="service-block__frame-ring" aria-hidden="true" />
                  <div className="service-block__frame-bg" aria-hidden="true" />
                  <div className="service-block__circle">
                    <img
                      src={svc.image}
                      alt={svc.imageAlt}
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="service-block__content"
                initial={{ opacity: 0, x: i % 2 === 0 ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              >
                <div className="service-block__icon-wrap" aria-hidden="true">
                  {svc.icon}
                </div>
                <h2 className="service-block__title">{svc.title}</h2>
                <motion.ul
                  className="service-block__list"
                  role="list"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
                >
                  {svc.items.map((item) => (
                    <motion.li
                      key={item}
                      className="service-block__item"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                      }}
                    >
                      <span className="service-block__check" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Deliver — standards band */}
      <section className="delivery section section--light">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-label">How We Deliver</span>
            <h2 className="section-title">What Sets Our Execution Apart</h2>
            <p className="section-subtitle">
              Beyond the scope on paper, these are the standards that keep every project moving on the ground.
            </p>
          </motion.div>

          <motion.div
            className="delivery__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {deliveryStandards.map((s) => (
              <motion.div
                key={s.title}
                className="delivery-card"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
              >
                <div className="delivery-card__icon" aria-hidden="true">{s.icon}</div>
                <h3 className="delivery-card__title">{s.title}</h3>
                <p className="delivery-card__desc">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries & Engagement Models */}
      <section className="industries-engagements section section--dark">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.55)' }}>Scope of Work</span>
            <h2 className="section-title">Industries &amp; Engagement Models</h2>
          </motion.div>

          <div className="ie-grid">
            <motion.div
              className="ie-col"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h3 className="ie-col__title">Project Environments We Support</h3>
              <motion.ul
                className="ie-list"
                role="list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {projectEnvironments.map((env, i) => (
                  <motion.li
                    key={env}
                    className="ie-list__item"
                    variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <span className="ie-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ie-list__text">{env}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="ie-col"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <h3 className="ie-col__title">Typical Engagement Models</h3>
              <motion.ul
                className="ie-list"
                role="list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {engagementModels.map((model, i) => (
                  <motion.li
                    key={model}
                    className="ie-list__item"
                    variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <span className="ie-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ie-list__text">{model}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="services-cta section">
        <div className="container">
          <motion.div
            className="services-cta__inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="services-cta__title">Have a project that needs dependable execution?</h2>
            <p className="services-cta__text">
              Tell us about your scope, site, and timeline — we'll show you how we can support delivery.
            </p>
            <Link to="/contact" className="btn btn-primary services-cta__btn">Get a Quote</Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function CommsIcon() {
  return <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M42 30a4 4 0 0 1-4 4H14l-8 8V10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z"/><line x1="15" y1="16" x2="33" y2="16"/><line x1="15" y1="24" x2="27" y2="24"/></svg>
}
function TeamIcon() {
  return <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="16" r="7"/><path d="M4 42c0-7.7 6.3-14 14-14s14 6.3 14 14"/><path d="M32 12a7 7 0 0 1 0 14M44 42c0-6-3.5-11-8.5-13"/></svg>
}
function ShieldIcon() {
  return <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M24 4l16 7v11c0 10-6.8 17.4-16 20-9.2-2.6-16-10-16-20V11z"/><polyline points="17 24 22 29 32 18"/></svg>
}
function FlowIcon() {
  return <svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="10" cy="12" r="5"/><circle cx="38" cy="12" r="5"/><circle cx="24" cy="36" r="5"/><path d="M14 14l8 18M34 14l-8 18"/></svg>
}

function MEPIcon() {
  return <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><rect x="4" y="16" width="40" height="8" rx="2"/><path d="M12 16V8M24 16V8M36 16V8M12 24v8M24 24v8M36 24v8"/></svg>
}
function CivilIcon() {
  return <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polygon points="24,4 44,44 4,44"/><line x1="14" y1="44" x2="14" y2="28"/><line x1="24" y1="44" x2="24" y2="22"/><line x1="34" y1="44" x2="34" y2="28"/></svg>
}
function SupportIcon() {
  return <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="24" cy="14" r="8"/><path d="M8 44c0-8.8 7.2-16 16-16s16 7.2 16 16"/><path d="M34 20l4 4-4 4M38 24H28"/></svg>
}
function EnergyIcon() {
  return <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="24" cy="24" r="10"/><line x1="24" y1="4" x2="24" y2="10"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="4" y1="24" x2="10" y2="24"/><line x1="38" y1="24" x2="44" y2="24"/><path d="M20 24l3-6 3 4 3-4 3 6"/></svg>
}

function FireIcon() {
  return <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M24 4C24 4 15 15 15 26c0 5 4 10 9 10 2 0 3-1 3-1s1 1 3 1c5 0 9-5 9-10 0-11-9-22-9-22z"/><path d="M24 18c0 4-3 7-3 10 0 2.5 1.5 4 3 4s3-1.5 3-4c0-3-3-6-3-10z"/></svg>
}
