import { useMemo, useState } from 'react'
import { CALENDAR_EVENTS } from '../data/chapter.js'
import { isSameDay, monthName, timeOfDay, toDate } from '../lib/format.js'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const buildGrid = (year, month) => {
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()

  return [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (unused, index) => new Date(year, month, index + 1)),
  ]
}

function Calendar() {
  const firstEvent = toDate(CALENDAR_EVENTS[0].date)
  const [cursor, setCursor] = useState({ year: firstEvent.getFullYear(), month: firstEvent.getMonth() })
  const [selected, setSelected] = useState(null)

  const cells = useMemo(() => buildGrid(cursor.year, cursor.month), [cursor])

  const eventsForDay = (day) => CALENDAR_EVENTS.filter((event) => isSameDay(event.date, day))

  const shiftMonth = (offset) => {
    setSelected(null)
    setCursor((current) => {
      const next = new Date(current.year, current.month + offset, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  const selectedEvents = selected ? eventsForDay(selected) : []

  return (
    <div className="calendar">
      <div className="calendar__bar">
        <h3>{monthName(cursor.month)} {cursor.year}</h3>
        <div className="calendar__nav">
          <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">←</button>
          <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">→</button>
        </div>
      </div>

      <div className="calendar__grid" role="grid">
        {WEEKDAYS.map((day, index) => (
          <span className="calendar__weekday" key={`${day}-${index}`} aria-hidden="true">{day}</span>
        ))}

        {cells.map((day, index) => {
          if (!day) return <span className="calendar__cell calendar__cell--empty" key={`blank-${index}`} />

          const dayEvents = eventsForDay(day)
          const isSelected = selected && isSameDay(selected, day)
          const isToday = isSameDay(new Date(), day)

          return (
            <button
              type="button"
              key={day.toISOString()}
              className={`calendar__cell${dayEvents.length ? ' has-event' : ''}${isSelected ? ' is-selected' : ''}${isToday ? ' is-today' : ''}`}
              onClick={() => setSelected(dayEvents.length ? day : null)}
              disabled={!dayEvents.length}
              aria-label={`${monthName(cursor.month)} ${day.getDate()}${dayEvents.length ? `, ${dayEvents.length} event` : ', no events'}`}
            >
              <span>{day.getDate()}</span>
              {dayEvents.length > 0 && (
                <span className="calendar__dots" aria-hidden="true">
                  {dayEvents.map((event) => (
                    <i key={event.id} className={event.flagship ? 'is-flagship' : undefined} />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="calendar__detail" aria-live="polite">
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event) => (
            <article key={event.id}>
              <p className="calendar__detail-meta">
                {timeOfDay(event.date)} · {event.location} · {event.category}
              </p>
              <h4>{event.title}</h4>
              <p>{event.detail}</p>
            </article>
          ))
        ) : (
          <p className="calendar__hint">Select a highlighted date to see what happens that day.</p>
        )}
      </div>
    </div>
  )
}

export default Calendar
