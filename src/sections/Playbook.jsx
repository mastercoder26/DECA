import { PREP_STEPS } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

function Playbook() {
  return (
    <section className="playbook" id="prep" aria-labelledby="playbook-title">
      <div className="playbook__sticky">
        <Reveal as="p" className="eyebrow">Preparation</Reveal>
        <Reveal as="h2" id="playbook-title" delay={60}>How to prepare for Districts.</Reveal>
        <Reveal as="p" className="lead" delay={120}>
          The chapter runs practice sessions every other Wednesday in Room B204. These four steps are what officers
          walk new members through.
        </Reveal>
      </div>

      <ol className="playbook__steps">
        {PREP_STEPS.map((step, index) => (
          <Reveal as="li" className="playstep" key={step.step} delay={index * 100}>
            <p className="playstep__label">{step.step}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default Playbook
