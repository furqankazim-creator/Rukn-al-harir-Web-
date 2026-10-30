import { Helmet } from '../components/ui/Helmet'
import PageHero from '../components/sections/PageHero'
import './LegalPages.css'

const policySections = [
  {
    title: 'Information we collect',
    body:
      'Rukn Al Harir Technical Services may collect personal and business information when you contact us, request a quote, submit a project inquiry, register for updates, or interact with our website. This may include your name, company name, email address, phone number, project details, and related communication data.'
  },
  {
    title: 'How we use your information',
    body:
      'We use the information we collect to respond to inquiries, understand project requirements, provide proposals or support, manage client communications, improve our website experience, and meet legal and regulatory obligations where applicable.'
  },
  {
    title: 'Data sharing and third parties',
    body:
      'We do not sell personal data. We may share information with trusted service providers when necessary to support our operations, such as email delivery, hosting, analytics, or project coordination tools. Any sharing is limited to what is required and is governed by appropriate confidentiality arrangements.'
  },
  {
    title: 'Cookies and website usage',
    body:
      'Our website may use cookies or similar tools to improve site performance, understand general usage patterns, and support a better browsing experience. Where applicable, we will provide notice and respect browser preferences for non-essential tracking.'
  },
  {
    title: 'Data security',
    body:
      'We apply reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, misuse, or disclosure. However, no online transmission or electronic storage method is completely risk-free, and we cannot guarantee absolute security.'
  },
  {
    title: 'Retention and your rights',
    body:
      'We retain personal information only as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and maintain records. You may request access, correction, or deletion of your personal information where applicable under applicable law.'
  },
  {
    title: 'Contact',
    body:
      'If you have any questions about this Privacy Policy or how we handle your information, please contact Rukn Al Harir Technical Services at info@ruknalharir.com or +971 55 835 0447.'
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet
        title="Privacy Policy | Rukn Al Harir Technical Services"
        description="Privacy Policy for Rukn Al Harir Technical Services, covering personal information, data use, cookies, and contact details."
      />

      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How we collect, protect, and use information in our client and project communications."
      />

      <section className="legal-page section">
        <div className="container legal-page__wrap">
          <div className="legal-page__intro">
            <p>
              Rukn Al Harir Technical Services is a UAE-based execution and technical support company serving project stakeholders across construction, MEP, civil support, and site-delivery requirements. This Privacy Policy explains how we handle information shared with us through our website, client communications, and business inquiries.
            </p>
          </div>

          {policySections.map((section) => (
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
