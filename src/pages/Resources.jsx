import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { RESOURCE_GROUPS } from '../data/resources.js'

function Resources() {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return RESOURCE_GROUPS

    return RESOURCE_GROUPS
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(needle) ||
            item.note.toLowerCase().includes(needle) ||
            item.source.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Guides, exams, and forms."
        lead="Official DECA and Texas DECA material alongside the chapter's own handouts, grouped by task."
      />

      <Reveal className="filters filters--single">
        <label className="field field--underline field--search">
          <span className="field__label">Search resources</span>
          <input
            type="search"
            value={query}
            placeholder="Exams, roleplays, dress code…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </Reveal>

      {groups.map((group, groupIndex) => (
        <section className="resgroup" key={group.group} aria-labelledby={`res-${groupIndex}`}>
          <div className="resgroup__head">
            <h2 id={`res-${groupIndex}`}>{group.group}</h2>
            <p>{group.blurb}</p>
          </div>

          <ul className="resgroup__list">
            {group.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 60}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span className="reslink__source">{item.source}</span>
                  <span className="reslink__title">{item.title}</span>
                  <span className="reslink__note">{item.note}</span>
                  <span className="reslink__arrow" aria-hidden="true">↗</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}

      {groups.length === 0 && <p className="empty">Nothing matches &ldquo;{query}&rdquo;.</p>}
    </>
  )
}

export default Resources
