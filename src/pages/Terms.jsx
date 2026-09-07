import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import './LegalPages.css'

const termsSections = [
  {
    title: 'Scope of services',
    body:
      'Rukn Al Harir Technical Services provides execution support, manpower deployment, project coordination, MEP support, civil work assistance, and technical service solutions in line with client instructions, approved scope, and site conditions. Our services are tailored to project requirements and may vary by contract or assignment.'
  },
  {
    title: 'Client responsibilities',
    body:
      'Clients are expected to provide clear instructions, approved drawings or scope documents, site access, timely decisions, and any required approvals or information needed to proceed. Delays caused by incomplete information, late approvals, or site constraints may affect project timelines or costs.'
  },
  {
    title: 'Site and execution conditions',
    body:
      'The execution of works is subject to site conditions, safety requirements, access limitations, weather, permit status, and coordination with other contractors or stakeholders. We will do our best to adapt to project realities, but unforeseen conditions may require adjustments to delivery planning and sequencing.'
  },
  {
    title: 'Project timelines and pricing',
    body:
      'Project schedules, costs, and resource planning are based on the information available at the time of quotation or agreement. Any changes in scope, volume, duration, manpower demand, or site conditions may require revision to timelines or pricing.'
  },
  {
    title: 'Confidentiality',
    body:
      'We will treat information shared by clients as confidential where appropriate and consistent with the nature of the project relationship. We may use such information only to fulfill the services requested and will not disclose it without permission or legal requirement, except as necessary for project execution and operational support.'
  },
  {
    title: 'Limitation of liability',
    body:
      'While we aim to provide professional, reliable support, Rukn Al Harir Technical Services is not responsible for losses arising from client decisions, third-party delays, unapproved changes, force majeure events, or conditions outside our reasonable control. Our liability for any service-related claim is limited to the value of the specific service or contract in question, where applicable.'
  },
  {
    title: 'Applicable law',
    body:
      'These terms are governed by the laws of the UAE, and any dispute arising in connection with our services will be handled in accordance with the applicable UAE legal framework, subject to the jurisdiction of the competent courts.'
  },
  {
    title: 'Contact',
    body:
      'For questions about these Terms & Conditions, please contact Rukn Al Harir Technical Services at info@ruknalharir.com or +971 50 287 4520.'
  },
]

export default function Terms() {
  return (
    <>
      <Helmet
        title="Terms & Conditions | Rukn Al Harir Technical Services"
        description="Terms and conditions for services provided by Rukn Al Harir Technical Services."
      />

      <PageHero
        label="Legal"
        title="Terms & Conditions"
        subtitle="Guiding the way we deliver services, manage responsibilities, and support client projects."
      />

      <section className="legal-page section">
        <div className="container legal-page__wrap">
          <div className="legal-page__intro">
            <p>
              These Terms & Conditions set out the general basis on which Rukn Al Harir Technical Services works with clients, contractors, and project stakeholders. By engaging our company, you agree to the terms below unless otherwise agreed in writing.
            </p>
          </div>

          {termsSections.map((section) => (
            <article key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
