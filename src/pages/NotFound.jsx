import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found."
      lead="This link may be out of date. Chapter announcements, the calendar, and event assignments are in the member hub."
    >
      <Link className="button button--primary" to="/hub">
        Go to the hub <span aria-hidden="true">→</span>
      </Link>
    </PageHeader>
  )
}

export default NotFound
