import Hero from '../sections/Hero.jsx'
import WhatIsDeca from '../sections/WhatIsDeca.jsx'
import Ladder from '../sections/Ladder.jsx'
import EventFormats from '../sections/EventFormats.jsx'
import Playbook from '../sections/Playbook.jsx'
import Faq from '../sections/Faq.jsx'
import JoinCta from '../sections/JoinCta.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

function Landing() {
  return (
    <main>
      <Hero />
      <WhatIsDeca />
      <Ladder />
      <EventFormats />
      <Playbook />
      <Faq />
      <JoinCta />
      <SiteFooter />
    </main>
  )
}

export default Landing
