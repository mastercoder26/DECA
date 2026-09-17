import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import CountdownRail from '../components/CountdownRail.jsx'
import AnnouncementFeed from '../components/AnnouncementFeed.jsx'
import Calendar from '../components/Calendar.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import { OFFICERS } from '../data/chapter.js'

function Hub() {
  return (
    <>
      <PageHeader
        eyebrow="Member hub"
        title="Chapter dashboard."
        lead="Announcements, the meeting and conference calendar, countdowns, and the chapter's outside links."
      />

      <section className="panel" aria-labelledby="countdowns-title">
        <h2 className="panel__title" id="countdowns-title">Upcoming</h2>
        <Reveal><CountdownRail /></Reveal>
      </section>

      <div className="hub-split">
        <section className="panel" aria-labelledby="announcements-title">
          <h2 className="panel__title" id="announcements-title">Announcements</h2>
          <Reveal><AnnouncementFeed /></Reveal>
        </section>

        <section className="panel" aria-labelledby="calendar-title">
          <h2 className="panel__title" id="calendar-title">Calendar</h2>
          <Reveal delay={80}><Calendar /></Reveal>
        </section>
      </div>

      <div className="hub-split">
        <section className="panel" aria-labelledby="links-title">
          <h2 className="panel__title" id="links-title">Quick links</h2>
          <Reveal><QuickLinks /></Reveal>
        </section>

        <section className="panel" aria-labelledby="officers-title">
          <h2 className="panel__title" id="officers-title">Officers</h2>
          <Reveal delay={80}>
            <ul className="officers">
              {OFFICERS.map((officer) => (
                <li key={officer.name}>
                  <span className="officers__name">{officer.name}</span>
                  <span className="officers__role">{officer.role}</span>
                  <span className="officers__focus">{officer.focus}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>
    </>
  )
}

export default Hub
