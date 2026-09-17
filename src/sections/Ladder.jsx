import { LADDER } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

function Ladder() {
  return (
    <section className="ladder" id="ladder" aria-labelledby="ladder-title">
      <div className="ladder__intro">
        <Reveal as="p" className="eyebrow">Competition levels</Reveal>
        <Reveal as="h2" id="ladder-title" delay={60}>The season runs in three rounds.</Reveal>
        <Reveal as="p" className="lead" delay={120}>
          Each round qualifies a limited number of competitors for the next one. The event format stays the same
          throughout, so preparation carries forward.
        </Reveal>
      </div>

      <ol className="ladder__list">
        {LADDER.map((rung, index) => (
          <Reveal as="li" className="rung" key={rung.number} delay={index * 120}>
            <span className="rung__number" aria-hidden="true">{rung.number}</span>
            <div className="rung__body">
              <p className="rung__when">{rung.when}</p>
              <h3>{rung.title}</h3>
              <p>{rung.body}</p>
              <p className="rung__detail">{rung.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default Ladder
