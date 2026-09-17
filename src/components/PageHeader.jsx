import Reveal from './Reveal.jsx'

function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="pagehead">
      <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h1" delay={60}>{title}</Reveal>
      {lead && <Reveal as="p" className="pagehead__lead" delay={120}>{lead}</Reveal>}
      {children && <Reveal className="pagehead__extra" delay={180}>{children}</Reveal>}
    </header>
  )
}

export default PageHeader
