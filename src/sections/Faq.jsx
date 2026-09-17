import { Link } from 'react-router-dom'
import { FAQS } from '../data/content.js'
import Accordion from '../components/Accordion.jsx'
import Reveal from '../components/Reveal.jsx'

function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="faq__intro">
        <Reveal as="p" className="eyebrow">FAQ</Reveal>
        <Reveal as="h2" id="faq-title" delay={60}>Common questions.</Reveal>
        <Reveal as="p" className="lead" delay={120}>
          Anything not covered here can go on the officer question board.
        </Reveal>
        <Reveal delay={180}>
          <Link className="button button--primary" to="/ask">
            Ask an officer <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>

      <Reveal className="faq__body" delay={80}>
        <Accordion items={FAQS} />
      </Reveal>
    </section>
  )
}

export default Faq
