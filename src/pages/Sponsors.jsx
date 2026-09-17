import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { CURRENT_SPONSORS, SPONSOR_IMPACT, SPONSOR_TIERS } from '../data/sponsors.js'

const EMPTY_FORM = { business: '', contact: '', email: '', tier: SPONSOR_TIERS[0].tier, message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (form) => {
  const errors = {}
  if (!form.business.trim()) errors.business = 'Tell us the business name.'
  if (!form.contact.trim()) errors.contact = 'Who should we follow up with?'
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  return errors
}

function Sponsors() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setSubmitted] = useState(false)

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    // Frontend only: a backend would post this to the chapter's inbox.
    setSubmitted(true)
    setForm(EMPTY_FORM)
  }

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Sponsor the chapter."
        lead="Sponsorship money covers conference registration, travel, and chapter blazers. Contributions are handled through the school's booster account."
      />

      <Reveal className="impact">
        {SPONSOR_IMPACT.map((stat) => (
          <div key={stat.label}>
            <p className="impact__value">{stat.value}</p>
            <p className="impact__label">{stat.label}</p>
          </div>
        ))}
      </Reveal>

      <section className="tiers" aria-labelledby="tiers-title">
        <h2 className="panel__title" id="tiers-title">Sponsorship levels</h2>
        <div className="tiers__grid">
          {SPONSOR_TIERS.map((tier, index) => (
            <Reveal className={`tier${tier.featured ? ' is-featured' : ''}`} key={tier.tier} delay={index * 80}>
              <div className="tier__head">
                <h3>{tier.tier}</h3>
                <p className="tier__amount">{tier.amount}</p>
              </div>
              <p className="tier__blurb">{tier.blurb}</p>
              <ul>
                {tier.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="sponsor-split">
        <section className="panel" aria-labelledby="current-title">
          <h2 className="panel__title" id="current-title">Current partners</h2>
          <ul className="partners">
            {CURRENT_SPONSORS.map((sponsor, index) => (
              <Reveal as="li" key={sponsor.name} delay={index * 50}>
                <span className="partners__name">{sponsor.name}</span>
                <span className="partners__tier">{sponsor.tier}</span>
                <span className="partners__since">Since {sponsor.since}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal as="section" className="sponsorform" aria-labelledby="sponsorform-title">
          <h2 id="sponsorform-title">Become a sponsor</h2>

          {isSubmitted ? (
            <div className="sponsorform__done" role="status">
              <p className="sponsorform__done-mark" aria-hidden="true">✓</p>
              <h3>Thanks — we&rsquo;ll be in touch.</h3>
              <p>Our VP of Finance follows up within a week to confirm details and collect your logo.</p>
              <button type="button" className="button button--quiet" onClick={() => setSubmitted(false)}>
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label className="field field--underline">
                <span className="field__label">Business name</span>
                <input
                  type="text"
                  value={form.business}
                  onChange={setField('business')}
                  aria-invalid={Boolean(errors.business)}
                />
                {errors.business && <span className="field__error" role="alert">{errors.business}</span>}
              </label>

              <label className="field field--underline">
                <span className="field__label">Contact name</span>
                <input
                  type="text"
                  value={form.contact}
                  onChange={setField('contact')}
                  aria-invalid={Boolean(errors.contact)}
                />
                {errors.contact && <span className="field__error" role="alert">{errors.contact}</span>}
              </label>

              <label className="field field--underline">
                <span className="field__label">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="field__error" role="alert">{errors.email}</span>}
              </label>

              <label className="field field--underline">
                <span className="field__label">Level</span>
                <select value={form.tier} onChange={setField('tier')}>
                  {SPONSOR_TIERS.map((tier) => (
                    <option key={tier.tier}>{tier.tier}</option>
                  ))}
                </select>
              </label>

              <label className="field field--underline">
                <span className="field__label">Anything else? (optional)</span>
                <textarea rows={4} value={form.message} onChange={setField('message')} />
              </label>

              <button type="submit" className="button button--primary">
                Send inquiry <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </>
  )
}

export default Sponsors
