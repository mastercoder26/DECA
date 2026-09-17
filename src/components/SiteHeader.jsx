import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Magnetic from './Magnetic.jsx'

const HUB_LINKS = [
  { label: 'Hub', to: '/hub' },
  { label: 'Assignments', to: '/assignments' },
  { label: 'Resources', to: '/resources' },
  { label: 'Archive', to: '/archive' },
  { label: 'Ask', to: '/ask' },
  { label: 'Sponsors', to: '/sponsors' },
]

function SiteHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={`sitebar${isMenuOpen ? ' is-open' : ''}`}>
      <Link className="wordmark" to="/" aria-label="Rouse DECA home">
        <span className="wordmark__diamond" aria-hidden="true" />
        <span>Rouse DECA</span>
      </Link>

      <nav className="sitebar__nav" aria-label="Chapter navigation">
        {HUB_LINKS.map((link) => (
          <Magnetic key={link.to} strength={0.22}>
            <NavLink to={link.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {link.label}
            </NavLink>
          </Magnetic>
        ))}
      </nav>

      <button
        type="button"
        className="sitebar__toggle"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
      </button>
    </header>
  )
}

export default SiteHeader
