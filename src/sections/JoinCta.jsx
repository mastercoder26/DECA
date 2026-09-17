import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from '../data/chapter.js'
import Reveal from '../components/Reveal.jsx'

function JoinCta() {
  return (
    <section className="joincta" aria-labelledby="join-title">
      <div className="joincta__main">
        <Reveal as="p" className="eyebrow">Joining</Reveal>
        <Reveal as="h2" id="join-title" delay={60}>
          Meetings are every other Wednesday.
        </Reveal>
        <Reveal as="p" className="lead" delay={120}>
          Room B204, 4:30 to 5:30 PM. You can attend before joining. Membership dues and event registration are due
          together in November, ahead of the district deadline.
        </Reveal>
        <Reveal className="joincta__actions" delay={180}>
          <Link className="button button--invert" to="/hub">
            See the calendar <span aria-hidden="true">→</span>
          </Link>
          <Link className="button button--ghost" to="/ask">
            Ask a question first <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>

      <Reveal className="joincta__links" delay={140}>
        <p className="eyebrow">Where we post</p>
        <ul>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span className="joincta__label">{link.label}</span>
                <span className="joincta__handle">{link.handle}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default JoinCta
