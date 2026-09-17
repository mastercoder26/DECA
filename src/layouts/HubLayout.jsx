import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

function HubLayout() {
  return (
    <div className="shell">
      <SiteHeader />
      <main className="shell__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default HubLayout
