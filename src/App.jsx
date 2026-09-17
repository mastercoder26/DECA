import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Hub from './pages/Hub.jsx'
import Assignments from './pages/Assignments.jsx'
import Resources from './pages/Resources.jsx'
import Archive from './pages/Archive.jsx'
import Ask from './pages/Ask.jsx'
import Sponsors from './pages/Sponsors.jsx'
import NotFound from './pages/NotFound.jsx'
import HubLayout from './layouts/HubLayout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CursorDiamond from './components/CursorDiamond.jsx'
import useSmoothScroll from './hooks/useSmoothScroll.js'

function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <CursorDiamond />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<HubLayout />}>
          <Route path="/hub" element={<Hub />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
