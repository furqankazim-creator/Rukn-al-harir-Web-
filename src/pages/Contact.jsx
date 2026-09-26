import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import { durations, easings } from '../utils/animationConfig'
import './Contact.css'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.ruknalharir.com'
const FALLBACK_EMAIL = 'info@ruknalharir.com'

const PROJECT_TYPES = [
  { value: '', label: 'Select Project Type' },
  { value: 'mep', label: 'MEP Execution' },
  { value: 'civil', label: 'Civil Support' },
  { value: 'project_support', label: 'Project Support' },
  { value: 'alternative_energy', label: 'Alternative Energy' },
  { value: 'other', label: 'Other' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', project_type: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }

    setStatus('loading')
    try {
      await axios.post(`${API_URL}/api/contact`, form, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 15000,
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', project_type: '', message: '' })
    } catch (err) {
      // 422 → the backend rejected specific fields. Show them inline so the
      // user can fix and resubmit (instead of the generic mailto fallback).
      if (err?.response?.status === 422 && err.response.data?.errors) {
        const apiErrors = err.response.data.errors
        const mapped = Object.fromEntries(
          Object.entries(apiErrors).map(([field, msgs]) => [field, Array.isArray(msgs) ? msgs[0] : msgs])
        )
        setErrors(mapped)
        setStatus('idle')
        return
      }

      // 429 → rate limited
      if (err?.response?.status === 429) {
        setStatus('error')
        setErrors({ _fallback: `mailto:${FALLBACK_EMAIL}` })
        return
      }

      // Network / server error → fall back to opening the user's mail client
      const subject = encodeURIComponent(`Project Inquiry — ${form.project_type || 'General'}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject Type: ${form.project_type}\n\n${form.message}`
      )
      const mailtoUrl = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
      setStatus('error')
      setErrors({ _fallback: mailtoUrl })
    }
  }

  return (
    <>
      <Helmet
        title="Contact Us | Rukn Al Harir Technical Services"
        description="Get in touch with Rukn Al Harir Technical Services — submit your project inquiry, request a quote, or reach us directly in DIFC, Dubai, UAE."
      />

      <PageHero
        label="Get In Touch"
        title="Let's Build Your Next Success Story"
        subtitle="Thank you for considering Rukn Al Harir Technical Services. We are ready to become your trusted partner."
      />

      <section className="contact section">
        <div className="container">
          <motion.div 
            className="contact__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.medium }}
          >
            <motion.div
              className="contact__form-wrap reveal-left"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, threshold: 0.5 }}
              transition={{ duration: durations.standard, ease: easings.fastOutSlowIn }}
            >
              <motion.h2 
                className="contact__form-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{ duration: durations.medium, delay: 0.1 }}
              >
                Send Us a Message
              </motion.h2>
              <motion.p 
                className="contact__form-sub"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{ duration: durations.medium, delay: 0.15 }}
              >
                Fill in the form below and our team will get back to you promptly.
              </motion.p>

              {status === 'success' && (
                <motion.div 
                  className="contact__success" 
                  role="alert"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: durations.short, ease: easings.snapBounce }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>We will be in touch with you shortly.</p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  className="contact__error" 
                  role="alert"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: durations.short, ease: easings.snapBounce }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <div>
                    <strong>Unable to send via server.</strong>
                    <p>
                      Please{' '}
                      <a href={errors._fallback} className="contact__fallback-link">
                        click here to email us directly
                      </a>{' '}
                      or call +971 50 287 4520.
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.form 
                className="contact-form" 
                onSubmit={handleSubmit} 
                noValidate 
                aria-label="Project inquiry form"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                }}
              >
                <motion.div 
                  className="form-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: durations.medium, ease: easings.fastOutSlowIn }}
                >
                  <div className="form-field">
                    <label htmlFor="name" className="form-label">
                      Full Name <span aria-hidden="true" className="form-required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-input${errors.name ? ' form-input--error' : ''}`}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <motion.span 
                        id="name-error" 
                        className="form-error" 
                        role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: durations.short }}
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="form-label">
                      Email Address <span aria-hidden="true" className="form-required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-input${errors.email ? ' form-input--error' : ''}`}
                      placeholder="you@company.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <motion.span 
                        id="email-error" 
                        className="form-error" 
                        role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: durations.short }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  className="form-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: durations.medium, ease: easings.fastOutSlowIn, delay: 0.08 }}
                >
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+971 XX XXX XXXX"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="project_type" className="form-label">Project Type</label>
                    <select
                      id="project_type"
                      name="project_type"
                      value={form.project_type}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      {PROJECT_TYPES.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                <motion.div 
                  className="form-field"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: durations.medium, ease: easings.fastOutSlowIn, delay: 0.16 }}
                >
                  <label htmlFor="message" className="form-label">
                    Message <span aria-hidden="true" className="form-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`form-input form-textarea${errors.message ? ' form-input--error' : ''}`}
                    placeholder="Describe your project requirements, scope, location, and timeline..."
                    rows={6}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <motion.span 
                      id="message-error" 
                      className="form-error" 
                      role="alert"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: durations.short }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div
                  className="contact-form__submit-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: durations.medium, ease: easings.fastOutSlowIn, delay: 0.24 }}
                >
                  <motion.button
                    type="submit"
                    className="btn btn-primary contact-form__submit"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    whileHover={{ y: -2, boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)' }}
                    whileTap={{ y: 2, boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)' }}
                    transition={{ duration: durations.short }}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : 'Submit Inquiry'}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Contact details */}
            <motion.div
              className="contact__info reveal-right"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, threshold: 0.5 }}
              transition={{ duration: durations.standard, ease: easings.fastOutSlowIn }}
            >
              <motion.h2 
                className="contact__info-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{ duration: durations.medium, delay: 0.1 }}
              >
                Contact Details
              </motion.h2>

              <motion.ul 
                className="contact-details" 
                role="list"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.6 }}
                transition={{
                  staggerChildren: 0.08,
                  delayChildren: 0.15,
                }}
              >
                {[
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>,
                    label: 'Phone (WhatsApp enabled)',
                    value: '+971 50 287 4520',
                    href: 'tel:+971502874520',
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                    label: 'Email',
                    value: 'info@ruknalharir.com',
                    href: 'mailto:info@ruknalharir.com',
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: 'Address',
                    value: 'DIFC, Dubai, UAE',
                    href: null,
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
                    label: 'Website',
                    value: 'www.ruknalharir.com',
                    href: 'https://www.ruknalharir.com',
                  },
                ].map((item, i) => (
                  <motion.li 
                    key={item.label}
                    className="contact-detail"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    viewport={{ once: true }}
                    transition={{
                      initial: { duration: durations.medium, ease: easings.fastOutSlowIn },
                      hover: { duration: durations.short },
                    }}
                  >
                    <div className="contact-detail__icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <span className="contact-detail__label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-detail__value" target={item.href?.startsWith('http') ? '_blank' : undefined} rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-detail__value">{item.value}</span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/971502874520"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
                aria-label="Start WhatsApp chat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)' }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{
                  initial: { duration: durations.medium, ease: easings.fastOutSlowIn, delay: 0.4 },
                  hover: { duration: durations.short },
                }}
              >
                <svg width="22" height="22" viewBox="0 0 32 32" fill="white" aria-hidden="true">
                  <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.736 5.464 2.023 7.755L0 32l8.494-2.003A15.923 15.923 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.232 22.268c-.34.954-1.986 1.822-2.728 1.938-.698.108-1.582.153-2.552-.16-.588-.187-1.343-.438-2.302-.858-4.05-1.75-6.693-5.826-6.896-6.097-.196-.27-1.6-2.128-1.6-4.059 0-1.93 1.016-2.88 1.375-3.272.36-.392.784-.49 1.045-.49h.75c.241 0 .567-.091.886.677.33.793 1.122 2.723 1.22 2.919.098.196.163.425.032.685-.131.26-.196.42-.393.644-.196.224-.413.5-.588.672-.196.196-.4.408-.172.8.228.392 1.012 1.672 2.174 2.709 1.494 1.332 2.754 1.744 3.144 1.94.392.196.62.164.849-.098.229-.262.98-1.143 1.241-1.535.261-.392.523-.327.882-.196.36.13 2.285 1.078 2.677 1.274.392.196.653.294.75.457.098.164.098.948-.24 1.9z"/>
                </svg>
                Message us on WhatsApp
              </motion.a>

              {/* Map embed */}
              <motion.div 
                className="contact__map"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, threshold: 0.5 }}
                transition={{ duration: durations.medium, delay: 0.5 }}
              >
                <h3 className="contact__map-title">Our Location</h3>
                <div className="contact__map-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.916339085252!2d55.27792791500956!3d25.21082178390086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428ac4249a13%3A0x83b9e9b03f3a4b4d!2sDIFC%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rukn Al Harir location — DIFC, Dubai, UAE"
                    aria-label="Google Map showing DIFC, Dubai, UAE"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
