import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }

// Flips to true the first time the element scrolls into view, then stops observing.
function useReveal(options = DEFAULT_OPTIONS) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.unobserve(entry.target)
      })
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return [ref, isVisible]
}

export default useReveal
