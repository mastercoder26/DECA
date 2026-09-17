import { FACTS } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

function WhatIsDeca() {
  return (
    <section className="explain" id="deca" aria-labelledby="deca-title">
      <div className="explain__intro">
        <Reveal as="p" className="eyebrow">What is DECA</Reveal>
        <Reveal as="h2" id="deca-title" delay={60}>
          DECA is a business competition for high school students.
        </Reveal>
        <Reveal as="p" className="lead" delay={120}>
          At a conference you take a multiple-choice exam in your career cluster, then meet a judge who gives you a
          written business scenario. You prepare a response on the spot and present it. Scores from the exam and the
          presentation combine into your final placement.
        </Reveal>
      </div>

      <dl className="factgrid">
        {FACTS.map((fact, index) => (
          <Reveal className="factgrid__item" key={fact.label} delay={index * 90}>
            <span className="factgrid__corner" aria-hidden="true" />
            <dt>{fact.label}</dt>
            <dd className="factgrid__value">{fact.value}</dd>
            <dd className="factgrid__note">{fact.note}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

export default WhatIsDeca
