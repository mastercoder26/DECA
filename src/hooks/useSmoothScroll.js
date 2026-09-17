import { useEffect } from 'react'
import Lenis from 'lenis'

// Lenis inertial scrolling, disabled for users who ask for reduced motion.
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      anchors: true,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })

    let frame
    const update = (time) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(update)
    }
    frame = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}

export default useSmoothScroll
