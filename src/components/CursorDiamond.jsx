import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { supportsPointerEffects } from '../hooks/useInteractivePointer.js'

const INTERACTIVE = 'a, button, input, select, textarea, [role="button"]'

/**
 * A diamond outline that trails the cursor with spring lag and snaps open over
 * anything clickable. It accompanies the native cursor rather than replacing
 * it, so the pointer never disappears.
 */
function CursorDiamond() {
  const diamondRef = useRef(null)
  const [isEnabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!supportsPointerEffects()) return undefined
    setEnabled(true)

    const element = diamondRef.current
    if (!element) return undefined

    // Response ~0.35s, lightly damped: it lags the cursor, then settles.
    const xTo = gsap.quickTo(element, 'x', { duration: 0.42, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.42, ease: 'power3.out' })

    const handleMove = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)

      const isOverInteractive = Boolean(event.target?.closest?.(INTERACTIVE))
      element.classList.toggle('is-active', isOverInteractive)
    }

    const handleLeave = () => element.classList.add('is-hidden')
    const handleEnter = () => element.classList.remove('is-hidden')

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerleave', handleLeave)
    document.addEventListener('pointerenter', handleEnter)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
      document.removeEventListener('pointerenter', handleEnter)
      gsap.killTweensOf(element)
    }
  }, [])

  if (!isEnabled) return null

  return (
    <span className="cursor-diamond" ref={diamondRef} aria-hidden="true">
      <i className="cursor-diamond__shape" />
    </span>
  )
}

export default CursorDiamond
