import { motion } from 'framer-motion'
import './ExecutionTimeline.css'
import { durations, easings } from '../../utils/animationConfig'

const steps = [
  {
    num: '01',
    title: 'Requirement Review',
    desc: 'We review drawings, site conditions, interfaces, constraints, and execution priorities.',
    icon: <ReviewIcon />,
  },
  {
    num: '02',
    title: 'Scope Alignment',
    desc: 'We define the practical workfront, manpower requirement, coordination points, and delivery path.',
    icon: <ScopeIcon />,
  },
  {
    num: '03',
    title: 'Mobilization',
    desc: 'Engineers, supervisors, and labor resources are deployed based on scope and schedule.',
    icon: <MobilizeIcon />,
  },
  {
    num: '04',
    title: 'Procurement Coordination Support',
    desc: 'We support material planning, sourcing coordination through approved channels, and site readiness requirements tied to execution.',
    icon: <ProcurementIcon />,
  },
  {
    num: '05',
    title: 'Site Execution',
    desc: 'Works are carried out with close supervision, sequencing awareness, and active coordination with project stakeholders.',
    icon: <ExecutionIcon />,
  },
  {
    num: '06',
    title: 'Monitoring & Issue Resolution',
    desc: 'We track progress, respond to site issues, adjust deployment where required, and maintain communication to avoid delays.',
    icon: <MonitorIcon />,
  },
  {
    num: '07',
    title: 'Completion Support',
    desc: 'We support closeout, punch-point follow-up, and final coordination related to delivered scope.',
    icon: <CompletionIcon />,
  },
]

export default function ExecutionTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  const stepVariants = (fromLeft) => ({
    hidden: { opacity: 0, x: fromLeft ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  })

  return (
    <section className="execution section section--dark">
      <div className="execution__glow execution__glow--a" aria-hidden="true" />
      <div className="execution__glow execution__glow--b" aria-hidden="true" />

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
            style={{ color: 'rgba(255,255,255,0.6)' }}
            variants={itemVariants}
          >
            How We Work
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ color: 'var(--white)' }}
            variants={itemVariants}
          >
            Our Execution Model
          </motion.h2>
          <motion.p
            className="section-subtitle"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            variants={itemVariants}
          >
            A structured, seven-stage process that keeps work moving from mobilization to closeout.
          </motion.p>
        </motion.div>

        <div className="exec-flow">
          <div className="exec-flow__line" aria-hidden="true">
            <motion.div
              className="exec-flow__line-fill"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          </div>

          {steps.map((step, i) => {
            const fromLeft = i % 2 === 0
            return (
              <motion.div
                key={step.num}
                className={`exec-step${fromLeft ? ' exec-step--left' : ' exec-step--right'}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={stepVariants(fromLeft)}
              >
                <div className="exec-step__dot">
                  <span>{step.num}</span>
                </div>

                <div className="exec-step__card">
                  <span className="exec-step__ghost-num" aria-hidden="true">{step.num}</span>
                  <div className="exec-step__icon" aria-hidden="true">{step.icon}</div>
                  <span className="exec-step__eyebrow">Step {step.num}</span>
                  <h3 className="exec-step__title">{step.title}</h3>
                  <p className="exec-step__desc">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}

          <motion.div
            className="exec-flow__end"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="exec-finish">
              <div className="exec-finish__ring" aria-hidden="true">
                <span className="exec-finish__pulse" />
                <span className="exec-finish__pulse exec-finish__pulse--delay" />
                <CheckIcon />
              </div>
              <span className="exec-finish__label">Project Delivered</span>
              <p className="exec-finish__sub">Every stage tracked, every milestone met.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
}
function ReviewIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/><path d="M8 10.5h5M10.5 8v5"/></svg>
}
function ScopeIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
}
function MobilizeIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16V7a1 1 0 011-1h9v10"/><path d="M13 10h4l4 4v2h-2"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg>
}
function ProcurementIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/></svg>
}
function ExecutionIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
}
function MonitorIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>
}
function CompletionIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
}
