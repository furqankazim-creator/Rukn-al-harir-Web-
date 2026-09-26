import { motion } from 'framer-motion'
import './ClientLogos.css'
import { durations, easings } from '../../utils/animationConfig'

const clients = [
  { name: 'ADNOC', logo: '/images/clients/adnoc.png' },
  { name: 'Technip Energies', logo: '/images/clients/technip-energies.png' },
  { name: 'JGC Corporation', logo: '/images/clients/jgc-japan-gasoline.png' },
  { name: 'NMDC Energy', logo: '/images/clients/nmdc-energy.png' },
  { name: 'Belco Electro Mechanical L.L.C.', logo: '/images/clients/belco.png' },
  { name: 'Yale Smart Living', logo: '/images/clients/yale-living.png' },
  { name: 'Creatives Electromechanical Contracting', logo: '/images/clients/creatives.png' },
  { name: 'Service Market by Etisalat Smiles', logo: '/images/clients/service-market.png' },
  { name: 'The Boring Company', logo: '/images/clients/boring-company.png' },
]

export default function ClientLogos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  }

  return (
    <section className="clients section section--light">
      <div className="container">
        <motion.div 
          className="text-center reveal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.5 }}
          variants={containerVariants}
        >
          <motion.span 
            className="section-label"
            variants={itemVariants}
          >
            Our Clients &amp; Partners
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Trusted by Leading Industry Names
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={itemVariants}
          >
            Our project experience reflects trusted support delivered across a diverse range of respected organizations in the UAE and beyond — from energy leaders and EPC contractors to smart-living brands and specialized construction partners.
          </motion.p>
        </motion.div>

        <motion.div
          className="clients__marquee reveal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.3 }}
          transition={{ duration: durations.medium }}
        >
          {/* Continuous Marquee Track */}
          <div className="marquee marquee--left">
            <div className="marquee__track">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={`client-${client.name}-${i}`}
                  className="client-logo"
                  title={client.name}
                  aria-hidden={i >= clients.length}
                >
                  <div className="client-logo__inner" aria-label={client.name}>
                    <img src={client.logo} alt={client.name} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p 
          className="clients__disclaimer reveal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.5 }}
          transition={{ delay: 0.3, duration: durations.medium }}
        >
          Supported projects associated with these organizations. Client names and marks are property of their respective owners.
        </motion.p>
      </div>
    </section>
  )
}
