import { cloneElement, useEffect, useRef } from 'react'
import gsap from 'gsap'

function Magnetic({ children, strength = 0.38 }) {
  const magneticRef = useRef(null)

  useEffect(() => {
    const element = magneticRef.current
    if (!element || window.matchMedia('(pointer: coarse)').matches) return undefined

    const xTo = gsap.quickTo(element, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    })
    const yTo = gsap.quickTo(element, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    })

    const move = (event) => {
      const bounds = element.getBoundingClientRect()
      xTo((event.clientX - bounds.left - bounds.width / 2) * strength)
      yTo((event.clientY - bounds.top - bounds.height / 2) * strength)
    }

    const reset = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)

    return () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      gsap.killTweensOf(element)
      gsap.set(element, { clearProps: 'transform' })
    }
  }, [strength])

  return cloneElement(children, { ref: magneticRef })
}

export default Magnetic
