import { SOCIAL_LINKS } from '../data/chapter.js'

function QuickLinks() {
  return (
    <ul className="quicklinks">
      {SOCIAL_LINKS.map((link) => (
        <li key={link.label}>
          <a href={link.href} target="_blank" rel="noreferrer">
            <span className="quicklinks__label">{link.label}</span>
            <span className="quicklinks__handle">{link.handle}</span>
            <span className="quicklinks__kind">{link.kind}</span>
            <span className="quicklinks__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default QuickLinks
