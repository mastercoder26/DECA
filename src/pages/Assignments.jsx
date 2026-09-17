import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { ASSIGNMENTS, CLUSTERS, FORMATS } from '../data/roster.js'
import { DISTRICTS_LABEL } from '../data/content.js'

const ALL = 'All'

// Group into the conference's three competition blocks, the way a printed program would.
const groupByTime = (entries) =>
  entries.reduce((blocks, entry) => {
    const block = blocks.find((item) => item.time === entry.time)
    if (block) {
      block.entries.push(entry)
      return blocks
    }
    return [...blocks, { time: entry.time, entries: [entry] }]
  }, [])

function Assignments() {
  const [query, setQuery] = useState('')
  const [cluster, setCluster] = useState(ALL)
  const [format, setFormat] = useState(ALL)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return ASSIGNMENTS.filter((entry) => {
      if (cluster !== ALL && entry.cluster !== cluster) return false
      if (format !== ALL && entry.format !== format) return false
      if (!needle) return true
      return (
        entry.event.toLowerCase().includes(needle) ||
        entry.code.toLowerCase().includes(needle) ||
        entry.members.some((member) => member.toLowerCase().includes(needle))
      )
    })
  }, [query, cluster, format])

  const blocks = useMemo(() => groupByTime(results), [results])
  const competitorCount = results.reduce((total, entry) => total + entry.members.length, 0)
  const needle = query.trim().toLowerCase()

  return (
    <>
      <PageHeader
        eyebrow="Event assignments"
        title="District event assignments."
        lead={`${DISTRICTS_LABEL}. Search your name to find your event, competition block, room, and partners.`}
      />

      <Reveal className="filters">
        <label className="field field--underline field--search">
          <span className="field__label">Search</span>
          <input
            type="search"
            value={query}
            placeholder="Your name, an event, or a code"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="field field--underline">
          <span className="field__label">Cluster</span>
          <select value={cluster} onChange={(event) => setCluster(event.target.value)}>
            {[ALL, ...CLUSTERS].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="field field--underline">
          <span className="field__label">Format</span>
          <select value={format} onChange={(event) => setFormat(event.target.value)}>
            {[ALL, ...FORMATS].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <p className="filters__count" aria-live="polite">
          {results.length} events / {competitorCount} competitors
        </p>
      </Reveal>

      {blocks.map((block) => (
        <section className="block" key={block.time} aria-label={`${block.time} block`}>
          <div className="block__rule">
            <h2>{block.time}</h2>
            <span>{block.entries.length} events</span>
          </div>

          <ul className="program">
            {block.entries.map((entry, index) => (
              <Reveal as="li" className="slot" key={entry.id} delay={Math.min(index, 6) * 50}>
                <span className="slot__code">{entry.code}</span>

                <div className="slot__main">
                  <h3>{entry.event}</h3>
                  <p className="slot__tags">
                    {entry.cluster} <i aria-hidden="true">/</i> {entry.format}
                  </p>
                </div>

                <ul className="slot__members">
                  {entry.members.map((member) => (
                    <li key={member} className={needle && member.toLowerCase().includes(needle) ? 'is-match' : undefined}>
                      {member}
                    </li>
                  ))}
                </ul>

                <span className="slot__room">
                  <b>{entry.room}</b>
                  room
                </span>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}

      {results.length === 0 && (
        <p className="empty">
          No assignments match that. Try clearing the filters, or ask an officer if you think you are missing.
        </p>
      )}
    </>
  )
}

export default Assignments
