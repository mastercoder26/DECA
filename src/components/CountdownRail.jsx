import { useMemo } from 'react'
import { CALENDAR_EVENTS } from '../data/chapter.js'
import useCountdown from '../hooks/useCountdown.js'
import { shortDate } from '../lib/format.js'

function CountdownCard({ event }) {
  const target = useMemo(() => new Date(event.date), [event.date])
  const remaining = useCountdown(target)
  const hasPassed = remaining.total === 0

  return (
    <article className={`mini-countdown${event.flagship ? ' is-flagship' : ''}`}>
      <p className="mini-countdown__meta">{shortDate(event.date)} · {event.location}</p>
      <h3>{event.title}</h3>
      {hasPassed ? (
        <p className="mini-countdown__done">Happened</p>
      ) : (
        <div className="mini-countdown__clock" role="timer" aria-label={`${remaining.days} days until ${event.title}`}>
          <span><b>{remaining.days}</b>d</span>
          <span><b>{String(remaining.hours).padStart(2, '0')}</b>h</span>
          <span><b>{String(remaining.minutes).padStart(2, '0')}</b>m</span>
          <span><b>{String(remaining.seconds).padStart(2, '0')}</b>s</span>
        </div>
      )}
    </article>
  )
}

function CountdownRail() {
  const upcoming = useMemo(
    () =>
      CALENDAR_EVENTS.filter((event) => new Date(event.date).getTime() > Date.now())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 4),
    [],
  )

  if (upcoming.length === 0) {
    return <p className="empty">No upcoming events on the calendar yet.</p>
  }

  return (
    <div className="countdown-rail">
      {upcoming.map((event) => (
        <CountdownCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default CountdownRail
