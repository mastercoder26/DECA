import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes should land at the top of the new page, not mid-scroll.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop
