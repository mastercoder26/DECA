import { Link } from 'react-router-dom'
import { CHAPTER, SOCIAL_LINKS } from '../data/chapter.js'

function SiteFooter() {
  return (
    <footer className="sitefooter">
      <div className="sitefooter__brand">
        <span className="wordmark__diamond" aria-hidden="true" />
        <p>{CHAPTER.name}</p>
        <p>{CHAPTER.school} · {CHAPTER.city}</p>
      </div>

      <div className="sitefooter__group">
        <p className="eyebrow">Chapter</p>
        <Link to="/hub">Member hub</Link>
        <Link to="/assignments">Event assignments</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/archive">Past seasons</Link>
      </div>

      <div className="sitefooter__group">
        <p className="eyebrow">Connect</p>
        {SOCIAL_LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <p className="sitefooter__note">Built for the next competitor.</p>
    </footer>
  )
}

export default SiteFooter
