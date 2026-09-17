import { useEffect, useRef } from 'react'
import { FIELD_MARKS } from '../data/marks.js'
import { supportsPointerEffects } from '../hooks/useInteractivePointer.js'

const RADIUS_RATIO = 0.3 // influence radius as a share of the canvas diagonal
const MIN_RADIUS = 320 // px floor, so the effect still reads on small screens
const PUSH_STRENGTH = 92 // px of maximum displacement inside the radius
const DRIFT_STRENGTH = 14 // px every mark leans toward the cursor, field-wide
const FOLLOW = 0.12 // per-frame approach toward the target offset

/**
 * The scattered diamonds behind the hero. Each one is pushed away from the
 * cursor and brightens as it approaches, then eases back when the cursor moves
 * on. The push lives on an inner wrapper so it never fights the GSAP intro
 * timeline, which animates the outer element.
 */
function MarkField({ containerRef, pointerRef }) {
  const fieldRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const field = fieldRef.current
    if (!container || !field || !supportsPointerEffects()) return undefined

    const nodes = Array.from(field.querySelectorAll('.mark-field__push'))
    let anchors = []
    let radius = MIN_RADIUS
    let frame

    // Anchors come from the layout percentages rather than measured rects, so
    // they stay correct while the intro timeline has the marks displaced.
    const measure = () => {
      const bounds = container.getBoundingClientRect()
      anchors = FIELD_MARKS.map((mark) => ({
        x: (mark.x / 100) * bounds.width,
        y: (mark.y / 100) * bounds.height,
      }))
      // Scale the radius to the canvas so a wide screen reacts as widely as a
      // narrow one, instead of the effect shrinking into one corner.
      radius = Math.max(MIN_RADIUS, Math.hypot(bounds.width, bounds.height) * RADIUS_RATIO)
    }

    // Each node keeps its own current offset so it eases rather than snapping.
    const offsets = nodes.map(() => ({ x: 0, y: 0, glow: 0 }))

    const render = () => {
      const pointer = pointerRef.current

      nodes.forEach((node, index) => {
        const anchor = anchors[index]
        const offset = offsets[index]
        let targetX = 0
        let targetY = 0
        let targetGlow = 0

        if (anchor && pointer.isInside) {
          const dx = anchor.x + offset.x - pointer.x
          const dy = anchor.y + offset.y - pointer.y
          const distance = Math.hypot(dx, dy)

          if (distance > 0.01) {
            const unitX = dx / distance
            const unitY = dy / distance

            // Every mark leans gently toward the cursor, so the whole field
            // responds, not just the few diamonds under it.
            targetX = -unitX * DRIFT_STRENGTH
            targetY = -unitY * DRIFT_STRENGTH

            if (distance < radius) {
              const falloff = (1 - distance / radius) ** 2
              targetX += unitX * falloff * (PUSH_STRENGTH + DRIFT_STRENGTH)
              targetY += unitY * falloff * (PUSH_STRENGTH + DRIFT_STRENGTH)
              targetGlow = falloff
            }
          }
        }

        offset.x += (targetX - offset.x) * FOLLOW
        offset.y += (targetY - offset.y) * FOLLOW
        offset.glow += (targetGlow - offset.glow) * FOLLOW

        const scale = 1 + offset.glow * 0.85
        node.style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
        node.style.setProperty('--glow', offset.glow.toFixed(3))
      })

      frame = window.requestAnimationFrame(render)
    }

    measure()
    frame = window.requestAnimationFrame(render)
    window.addEventListener('resize', measure)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
      nodes.forEach((node) => {
        node.style.transform = ''
        node.style.removeProperty('--glow')
      })
    }
  }, [containerRef, pointerRef])

  return (
    <div className="mark-field" ref={fieldRef} aria-hidden="true">
      {FIELD_MARKS.map((mark, index) => (
        <span
          className="mark-field__item"
          key={`${mark.x}-${mark.y}`}
          style={{
            '--x': `${mark.x}%`,
            '--y': `${mark.y}%`,
            '--size': `${mark.size}px`,
            '--rotation': `${mark.rotation}deg`,
            '--depth': mark.depth,
            '--delay': `${(index % 7) * -0.7}s`,
          }}
        >
          <span className="mark-field__push">
            <img src="/deca-mark.png" alt="" />
          </span>
        </span>
      ))}
    </div>
  )
}

export default MarkField
