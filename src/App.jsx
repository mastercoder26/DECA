import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import Magnetic from './components/Magnetic.jsx'

const DISTRICTS_START = new Date('2026-12-07T08:00:00-06:00')

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Past Results', href: '#results' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Help', href: '#help' },
  { label: 'Resources', href: 'https://www.texasdeca.org', external: true },
]

const FIELD_MARKS = [
  { x: 5, y: 18, size: 44, rotation: -18, depth: 0.9 },
  { x: 17, y: 14, size: 26, rotation: 13, depth: 0.55 },
  { x: 31, y: 21, size: 54, rotation: -8, depth: 0.78 },
  { x: 48, y: 13, size: 29, rotation: 19, depth: 0.48 },
  { x: 67, y: 18, size: 47, rotation: 7, depth: 0.72 },
  { x: 84, y: 12, size: 31, rotation: -24, depth: 0.5 },
  { x: 94, y: 26, size: 58, rotation: 17, depth: 0.86 },
  { x: 10, y: 43, size: 65, rotation: 11, depth: 1 },
  { x: 24, y: 37, size: 34, rotation: -27, depth: 0.55 },
  { x: 38, y: 43, size: 24, rotation: 22, depth: 0.42 },
  { x: 63, y: 39, size: 28, rotation: -13, depth: 0.45 },
  { x: 77, y: 43, size: 62, rotation: 26, depth: 0.94 },
  { x: 91, y: 50, size: 32, rotation: -9, depth: 0.52 },
  { x: 3, y: 69, size: 34, rotation: 24, depth: 0.56 },
  { x: 16, y: 72, size: 51, rotation: -12, depth: 0.82 },
  { x: 32, y: 67, size: 27, rotation: 30, depth: 0.45 },
  { x: 68, y: 69, size: 34, rotation: -21, depth: 0.58 },
  { x: 84, y: 71, size: 48, rotation: 10, depth: 0.78 },
  { x: 96, y: 75, size: 27, rotation: -30, depth: 0.46 },
  { x: 12, y: 90, size: 28, rotation: -4, depth: 0.48 },
  { x: 28, y: 88, size: 58, rotation: 18, depth: 0.9 },
  { x: 51, y: 91, size: 31, rotation: -20, depth: 0.52 },
  { x: 72, y: 88, size: 57, rotation: 9, depth: 0.88 },
  { x: 90, y: 91, size: 35, rotation: -16, depth: 0.58 },
]

const calculateRemaining = () => {
  const difference = Math.max(0, DISTRICTS_START.getTime() - Date.now())

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

function TimeUnit({ label, value }) {
  const formatted = String(value).padStart(2, '0')
  const previousValue = useRef(formatted)
  const outgoing = previousValue.current
  const digitCount = Math.max(formatted.length, outgoing.length)
  const currentDigits = formatted.padStart(digitCount, '0').split('')
  const previousDigits = outgoing.padStart(digitCount, '0').split('')

  useLayoutEffect(() => {
    previousValue.current = formatted
  }, [formatted])

  return (
    <div className="time-unit">
      <div className="time-unit__digits" aria-hidden="true">
        {currentDigits.map((digit, index) => {
          const previousDigit = previousDigits[index]
          const hasChanged = digit !== previousDigit

          return (
            <span className="time-unit__digit-window" key={`${label}-${index}`}>
              {hasChanged && (
                <span
                  className="time-unit__value time-unit__value--out"
                  key={`out-${index}-${previousDigit}-${digit}`}
                >
                  {previousDigit}
                </span>
              )}
              <span
                className={`time-unit__value ${hasChanged ? 'time-unit__value--in' : 'time-unit__value--static'}`}
                key={`in-${index}-${digit}`}
              >
                {digit}
              </span>
            </span>
          )
        })}
      </div>
      <span className="time-unit__label">{label}</span>
    </div>
  )
}

function App() {
  const [remaining, setRemaining] = useState(calculateRemaining)
  const [assetReady, setAssetReady] = useState(false)
  const heroRef = useRef(null)
  const navRef = useRef(null)
  const centerRef = useRef(null)
  const centerLogoRef = useRef(null)
  const titleRef = useRef(null)
  const countdownRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculateRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])

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

  useLayoutEffect(() => {
    if (!assetReady) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let idleSpin
    const context = gsap.context(() => {
      const marks = gsap.utils.toArray('.mark-field__item')
      const centerBounds = centerRef.current.getBoundingClientRect()
      const centerX = centerBounds.left + centerBounds.width / 2
      const centerY = centerBounds.top + centerBounds.height / 2

      if (reduceMotion) {
        gsap.set([navRef.current, centerRef.current, titleRef.current, countdownRef.current, marks], {
          autoAlpha: 1,
          clearProps: 'transform,filter',
        })
        return
      }

      document.body.classList.add('intro-running')
      const timeline = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          document.body.classList.remove('intro-running')
          idleSpin = gsap.to(centerLogoRef.current, {
            rotation: '+=360',
            duration: 34,
            ease: 'none',
            repeat: -1,
          })
        },
      })

      timeline
        .set([navRef.current, titleRef.current, countdownRef.current], { autoAlpha: 0 })
        .set(centerRef.current, { autoAlpha: 0, scale: 8.5, rotation: -9, filter: 'blur(9px)' })
        .set(marks, {
          autoAlpha: 0,
          x: (index, element) => {
            const bounds = element.getBoundingClientRect()
            return centerX - (bounds.left + bounds.width / 2)
          },
          y: (index, element) => {
            const bounds = element.getBoundingClientRect()
            return centerY - (bounds.top + bounds.height / 2)
          },
          scale: 0.12,
          rotation: 0,
        })
        .to(centerRef.current, { autoAlpha: 1, duration: 0.08 })
        .to(centerRef.current, {
          scale: 0.92,
          rotation: 2,
          filter: 'blur(0px)',
          duration: 1.45,
          ease: 'expo.out',
        })
        .to(centerRef.current, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2.4)' })
        .to(
          marks,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: (index) => FIELD_MARKS[index].rotation,
            duration: 1.15,
            stagger: { amount: 0.42, from: 'random' },
            ease: 'expo.out',
          },
          '-=0.58',
        )
        .fromTo(titleRef.current, { y: 18 }, { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out' }, '-=0.7')
        .fromTo(navRef.current, { y: -14 }, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power3.out' }, '-=0.58')
        .fromTo(countdownRef.current, { y: 28 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' }, '-=0.48')
    }, heroRef)

    return () => {
      document.body.classList.remove('intro-running')
      idleSpin?.kill()
      context.revert()
    }
  }, [assetReady])

  const handlePointerMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    event.currentTarget.style.setProperty('--pointer-x', x.toFixed(3))
    event.currentTarget.style.setProperty('--pointer-y', y.toFixed(3))
  }

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--pointer-x', '0')
    event.currentTarget.style.setProperty('--pointer-y', '0')
  }

  return (
    <main>
      <section
        className={`hero${assetReady ? ' is-ready' : ''}`}
        ref={heroRef}
        aria-labelledby="hero-title"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <header className="topbar" ref={navRef}>
          <a className="wordmark" href="#top" aria-label="Rouse DECA home">
            <span className="wordmark__diamond" aria-hidden="true" />
            <span>Rouse DECA</span>
          </a>

          <nav className="topbar__nav" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <Magnetic key={item.label} strength={0.24}>
                <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                  {item.label}
                </a>
              </Magnetic>
            ))}
          </nav>

        </header>

        <div className="hero__canvas" id="top">
          <div className="mark-field" aria-hidden="true">
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
                <img src="/deca-mark.png" alt="" />
              </span>
            ))}
          </div>

          <div className="hero__center" ref={centerRef}>
            <img
              className="hero__logo"
              ref={centerLogoRef}
              src="/deca-mark.png"
              alt="DECA diamond mark"
              fetchPriority="high"
              onLoad={() => setAssetReady(true)}
              onError={() => setAssetReady(true)}
            />
          </div>

          <div className="hero__title" ref={titleRef}>
            <p>Rouse High School</p>
            <h1 id="hero-title"><span>Rouse</span><span>DECA</span></h1>
            <p>Marketing · Finance · Hospitality · Management · Entrepreneurship</p>
          </div>
        </div>

        <section className="countdown" id="countdown" ref={countdownRef} aria-labelledby="countdown-title">
          <div className="countdown__heading">
            <p id="countdown-title">Time to DECA Districts</p>
            <time dateTime="2026-12-07T08:00:00-06:00">Monday · December 07 · Round Rock</time>
          </div>

          <div
            className="countdown__clock"
            role="timer"
            aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds until DECA Districts`}
          >
            <TimeUnit label="Days" value={remaining.days} />
            <TimeUnit label="Hours" value={remaining.hours} />
            <TimeUnit label="Minutes" value={remaining.minutes} />
            <TimeUnit label="Seconds" value={remaining.seconds} />
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
