import { motion } from 'framer-motion'
import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import ExecutionTimeline from '../components/sections/ExecutionTimeline'
import WorkCTA from '../components/sections/WorkCTA'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import './Approach.css'

const EASE = [0.16, 1, 0.3, 1]

const valuePoints = [
  'We bridge gaps between design, procurement coordination, and site execution',
  'We simplify communication between stakeholders on the ground',
  'We help clients respond faster to changing requirements',
  'We support smoother delivery through proactive coordination',
  'We focus on practical execution, not just theoretical scope',
]

export default function Approach() {
  return (
    <>
      <Helmet
        title="Our Work | Rukn Al Harir Technical Services"
        description="How Rukn Al Harir approaches project delivery — solving coordination gaps, driving execution discipline, and keeping projects moving from mobilization to completion."
      />

      <PageHero
        label="How We Work"
        title="Our Work"
        subtitle="We do more than execute scope. We help projects move."
      />

      <section className="approach section">
        <div className="container">
          <div className="approach-intro">
            <motion.div
              className="approach-intro__text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="approach-para">
                Construction projects do not slow down only because of technical complexity. They slow down because of coordination gaps, delayed decisions, fragmented site communication, manpower inefficiencies, and disconnects between procurement and execution.
              </p>
              <p className="approach-para">
                Our approach is built around solving those problems. We work as a practical solution partner on the ground, supporting clients with the coordination, responsiveness, and execution discipline needed to keep work progressing. From mobilization to completion, we align engineering input, supervision, manpower deployment, and site-level follow-through to reduce friction and maintain momentum.
              </p>
              <p className="approach-para">
                We understand that every project operates under constraints, whether related to time, access, sequencing, approvals, material availability, or changing site conditions. That is why we stay flexible, communicate clearly, and adapt quickly.
              </p>
            </motion.div>

            <motion.div
              className="approach-intro__photo"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <div className="approach-photo-frame">
                <div className="approach-photo-frame__ring" aria-hidden="true" />
                <div className="approach-photo-frame__bg" aria-hidden="true" />
                <motion.div
                  className="approach-photo-frame__circle"
                  initial={{ scale: 0.85 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                >
                  <img
                    src="/images/photos/approach-operational.jpg"
                    alt="Site team reviewing execution progress and scheduling on-site"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* How we add value */}
          <motion.div
            className="approach-values"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="approach-values__title">How We Add Value</h2>
            <motion.ul
              className="approach-values__list"
              role="list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            >
              {valuePoints.map((pt, i) => (
                <motion.li
                  key={i}
                  className="approach-values__item"
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <span className="approach-values__num" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                  <span>{pt}</span>
                </motion.li>
              ))}
            </motion.ul>
            <p className="approach-values__closing">
              "We take pride in being the kind of partner clients can rely on when the project needs steady hands, practical thinking, and dependable follow-through."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Execution Timeline */}
      <ExecutionTimeline />

      {/* Full Why Choose Us */}
      <WhyChooseUs dark />

      {/* Work CTA — last section before the footer */}
      <WorkCTA />
    </>
  )
}
