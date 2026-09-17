import { useEffect, useRef } from 'react'

const COARSE = '(pointer: coarse)'
const REDUCED = '(prefers-reduced-motion: reduce)'

export const supportsPointerEffects = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia(COARSE).matches &&
  !window.matchMedia(REDUCED).matches

/**
 * Tracks the pointer inside `containerRef` and writes position + velocity into
 * a ref, so animation loops can read the latest value without re-rendering.
 * Position is in container-local pixels; `isInside` gates the effects.
 */
function useInteractivePointer(containerRef) {
  const pointer = useRef({ x: 0, y: 0, previousX: 0, previousY: 0, vx: 0, vy: 0, isInside: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container || !supportsPointerEffects()) return undefined

    const handleMove = (event) => {
      const bounds = container.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const current = pointer.current

      current.previousX = current.x
      current.previousY = current.y
      current.vx = current.isInside ? x - current.x : 0
      current.vy = current.isInside ? y - current.y : 0
      current.x = x
      current.y = y
      current.isInside = true
    }

    const handleLeave = () => {
      pointer.current.isInside = false
      pointer.current.vx = 0
      pointer.current.vy = 0
    }

    container.addEventListener('pointermove', handleMove, { passive: true })
    container.addEventListener('pointerleave', handleLeave)

    return () => {
      container.removeEventListener('pointermove', handleMove)
      container.removeEventListener('pointerleave', handleLeave)
    }
  }, [containerRef])

  return pointer
}

export default useInteractivePointer
