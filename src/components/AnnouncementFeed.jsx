import { useState } from 'react'
import { ANNOUNCEMENTS } from '../data/chapter.js'
import { weekdayShortDate } from '../lib/format.js'

const TAGS = ['All', ...new Set(ANNOUNCEMENTS.map((item) => item.tag))]

function AnnouncementFeed() {
  const [activeTag, setActiveTag] = useState('All')

  const visible = ANNOUNCEMENTS
    .filter((item) => activeTag === 'All' || item.tag === activeTag)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.date) - new Date(a.date))

  return (
    <div className="feed">
      <div className="chipbar" role="group" aria-label="Filter announcements">
        {TAGS.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`chip${activeTag === tag ? ' is-active' : ''}`}
            aria-pressed={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="feed__list">
        {visible.map((item) => (
          <li className={`post${item.pinned ? ' is-pinned' : ''}`} key={item.id}>
            <div className="post__meta">
              <span className="post__tag">{item.tag}</span>
              {item.pinned && <span className="post__pin">Pinned</span>}
              <time dateTime={item.date}>{weekdayShortDate(item.date)}</time>
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p className="post__author">{item.author}</p>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="empty">Nothing tagged {activeTag} right now.</p>}
    </div>
  )
}

export default AnnouncementFeed
