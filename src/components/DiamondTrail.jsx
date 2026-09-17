import { useEffect, useRef, useState } from 'react'
import { supportsPointerEffects } from '../hooks/useInteractivePointer.js'

const SPAWN_DISTANCE = 22 // px of pointer travel between spawns
const MAX_PARTICLES = 46
const LIFE = 1100 // ms
const DRAG = 0.93
const MAX_DPR = 2

const easeOut = (t) => 1 - (1 - t) ** 3

/**
 * Canvas trail of DECA diamonds that spawn along the pointer's path. Spawn rate
 * is distance-based, so a fast flick lays down a longer, larger trail than a
 * slow drift — the output scales with the gesture.
 */
function DiamondTrail({ containerRef, pointerRef }) {
  const canvasRef = useRef(null)
  const [isEnabled, setEnabled] = useState(false)

  // Touch devices and reduced-motion users never get the canvas at all.
  useEffect(() => setEnabled(supportsPointerEffects()), [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!isEnabled || !container || !canvas) return undefined

    const context = canvas.getContext('2d')
    const image = new Image()
    image.src = '/deca-mark.png'

    let particles = []
    let frame
    let lastSpawnX = null
    let lastSpawnY = null

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const bounds = container.getBoundingClientRect()
      canvas.width = Math.round(bounds.width * dpr)
      canvas.height = Math.round(bounds.height * dpr)
      canvas.style.width = `${bounds.width}px`
      canvas.style.height = `${bounds.height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x, y, speed) => {
      if (particles.length >= MAX_PARTICLES) particles.shift()

      particles.push({
        x,
        y,
        born: performance.now(),
        size: 16 + Math.min(speed, 40) * 0.9,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.06,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6 - 0.35,
      })
    }

    const considerSpawn = () => {
      const pointer = pointerRef.current
      if (!pointer.isInside) {
        lastSpawnX = null
        return
      }

      if (lastSpawnX === null) {
        lastSpawnX = pointer.x
        lastSpawnY = pointer.y
        return
      }

      const dx = pointer.x - lastSpawnX
      const dy = pointer.y - lastSpawnY
      const distance = Math.hypot(dx, dy)
      if (distance < SPAWN_DISTANCE) return

      const speed = Math.hypot(pointer.vx, pointer.vy)
      spawn(pointer.x, pointer.y, speed)
      lastSpawnX = pointer.x
      lastSpawnY = pointer.y
    }

    const render = () => {
      const now = performance.now()
      context.clearRect(0, 0, canvas.width, canvas.height)

      considerSpawn()

      particles = particles.filter((particle) => {
        const age = (now - particle.born) / LIFE
        if (age >= 1) return false

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= DRAG
        particle.vy *= DRAG
        particle.rotation += particle.spin

        if (image.complete && image.naturalWidth > 0) {
          const scale = 0.55 + easeOut(Math.min(age * 3, 1)) * 0.45
          const size = particle.size * scale

          context.save()
          context.globalAlpha = (1 - age) ** 1.6 * 0.55
          context.translate(particle.x, particle.y)
          context.rotate(particle.rotation)
          context.drawImage(image, -size / 2, -size / 2, size, size)
          context.restore()
        }

        return true
      })

      frame = window.requestAnimationFrame(render)
    }

    resize()
    frame = window.requestAnimationFrame(render)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [isEnabled, containerRef, pointerRef])

  if (!isEnabled) return null

  return <canvas className="diamond-trail" ref={canvasRef} aria-hidden="true" />
}

export default DiamondTrail
