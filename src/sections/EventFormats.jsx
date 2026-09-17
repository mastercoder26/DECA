import { Link } from 'react-router-dom'
import { EVENT_FORMATS } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

function EventFormats() {
  return (
    <section className="formats" id="events" aria-labelledby="formats-title">
      <div className="formats__intro">
        <Reveal as="p" className="eyebrow">Event formats</Reveal>
        <Reveal as="h2" id="formats-title" delay={60}>Four formats to choose from.</Reveal>
        <Reveal as="p" className="lead" delay={120}>
          Every event belongs to one of five career clusters — marketing, finance, hospitality and tourism, business
          management, or entrepreneurship — and to one of these four formats.
        </Reveal>
      </div>

      <div className="formats__grid">
        {EVENT_FORMATS.map((format, index) => (
          <Reveal className="format-card" key={format.name} delay={index * 90}>
            <p className="format-card__who">{format.who}</p>
            <h3>{format.name}</h3>
            <p>{format.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="formats__foot" delay={120}>
        <Link className="button button--primary" to="/assignments">
          See who is in which event <span aria-hidden="true">→</span>
        </Link>
        <Link className="button button--quiet" to="/resources">
          Browse the resource hub <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  )
}

export default EventFormats
