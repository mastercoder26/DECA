import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { GALLERY, SEASONS } from '../data/archive.js'

function Archive() {
  const [activeYear, setActiveYear] = useState(SEASONS[0].year)

  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Past seasons."
        lead="Placements, qualifier counts, and photos from previous years of Rouse DECA."
      />

      {/* Year in the left gutter, entries in the right column. */}
      <section className="index" aria-label="Results by season">
        {SEASONS.map((season) => {
          const isOpen = season.year === activeYear

          return (
            <div className={`index__row${isOpen ? ' is-open' : ''}`} key={season.year}>
              <button
                type="button"
                className="index__year"
                aria-expanded={isOpen}
                onClick={() => setActiveYear(isOpen ? '' : season.year)}
              >
                {season.year}
              </button>

              <div className="index__body">
                <p className="index__headline">{season.headline}</p>

                <dl className="index__stats">
                  <div><dt>Districts</dt><dd>{season.stats.districts}</dd></div>
                  <div><dt>State</dt><dd>{season.stats.state}</dd></div>
                  <div><dt>ICDC</dt><dd>{season.stats.icdc}</dd></div>
                </dl>

                {isOpen && (
                  <table className="credits">
                    <thead>
                      <tr>
                        <th scope="col">Competitor</th>
                        <th scope="col">Event</th>
                        <th scope="col">Level</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {season.winners.map((winner) => (
                        <tr key={`${winner.name}-${winner.event}`}>
                          <td>{winner.name}</td>
                          <td>{winner.event}</td>
                          <td>{winner.level}</td>
                          <td className="credits__place">{winner.place}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )
        })}
      </section>

      <section className="collage" aria-labelledby="collage-title">
        <div className="collage__head">
          <h2 id="collage-title">Photos</h2>
          <p>
            Add chapter photos to <code>/public/archive/</code> and set each entry&rsquo;s image in{' '}
            <code>src/data/archive.js</code>.
          </p>
        </div>

        <div className="collage__grid">
          {GALLERY.map((photo, index) => (
            <Reveal
              as="figure"
              className={`plate plate--${photo.tone}`}
              key={photo.id}
              delay={Math.min(index, 8) * 70}
              style={{ '--span': photo.span, '--ratio': photo.ratio, '--tilt': `${photo.tilt}deg` }}
            >
              <div className="plate__frame" aria-hidden="true">
                <span className="plate__year">{photo.year}</span>
              </div>
              <figcaption>
                <span>{photo.caption}</span>
                <span className="plate__index">{String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

export default Archive
