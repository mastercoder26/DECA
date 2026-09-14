import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import Magnetic from './components/Magnetic.jsx'

const DISTRICTS_START = new Date('2026-12-07T08:00:00-06:00')

const CHAPTER_ITEMS = [
  {
    id: 'about',
    label: 'About',
    meta: 'Rouse High School',
    title: 'Rouse DECA',
    body: 'Student members compete in marketing, finance, hospitality, management, and entrepreneurship.',
    accent: '#6fd7ff',
  },
  {
    id: 'results',
    label: 'Past Results',
    meta: 'Orlando · 2025',
    title: 'ICDC First Place',
    body: 'Rouse DECA brought home a first-place trophy from the International Career Development Conference.',
    accent: '#ffb7ee',
  },
  {
    id: 'sponsors',
    label: 'Sponsors',
    meta: 'Chapter support',
    title: 'Sponsor the team',
    body: 'Sponsorships help students cover registration, travel, lodging, and competition materials.',
    accent: '#ffe589',
  },
  {
    id: 'help',
    label: 'Help',
    meta: 'Member support',
    title: 'Competition help',
    body: 'Find deadlines, event guidance, practice materials, and answers before competition day.',
    accent: '#b8ffdd',
  },
  {
    id: 'resources',
    label: 'Resources',
    meta: 'Texas DECA',
    title: 'Official resources',
    body: 'Competitive-event information and the current Texas DECA calendar are available online.',
    accent: '#b9c4ff',
    href: 'https://www.texasdeca.org/districts',
  },
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

  useLayoutEffect(() => {
    previousValue.current = formatted
  }, [formatted])

  return (
    <div className="time-unit">
      <div className="time-unit__window" aria-hidden="true">
        <span className="time-unit__value time-unit__value--out" key={`out-${outgoing}-${formatted}`}>
          {outgoing}
        </span>
        <span className="time-unit__value time-unit__value--in" key={`in-${formatted}`}>
          {formatted}
        </span>
      </div>
      <span className="time-unit__label">{label}</span>
    </div>
  )
}

function App() {
  const [remaining, setRemaining] = useState(calculateRemaining)
  const [assetReady, setAssetReady] = useState(false)
  const [activeId, setActiveId] = useState('about')
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const scriptRef = useRef(null)
  const explorerRef = useRef(null)
  const countdownRef = useRef(null)
  const activeItem = CHAPTER_ITEMS.find((item) => item.id === activeId) ?? CHAPTER_ITEMS[0]

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculateRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return undefined

    const lenis = new Lenis({
      anchors: true,
      duration: 1.15,
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
      const revealTargets = [navRef.current, scriptRef.current, explorerRef.current, countdownRef.current]

      if (reduceMotion) {
        gsap.set([logoRef.current, ...revealTargets], {
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
          idleSpin = gsap.to(logoRef.current, {
            rotation: '+=360',
            duration: 38,
            ease: 'none',
            force3D: true,
            repeat: -1,
          })
        },
      })

      timeline
        .set(revealTargets, { autoAlpha: 0 })
        .set(logoRef.current, {
          autoAlpha: 0,
          xPercent: -50,
          yPercent: -50,
          scale: 6.5,
          rotation: -10,
          filter: 'blur(8px)',
        })
        .to(logoRef.current, { autoAlpha: 1, duration: 0.12 })
        .to(logoRef.current, {
          scale: 0.93,
          rotation: 2,
          filter: 'blur(0px)',
          duration: 1.55,
          ease: 'expo.out',
        })
        .to(logoRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.46,
          ease: 'back.out(2.2)',
        })
        .fromTo(
          scriptRef.current,
          { yPercent: 18, scale: 0.94, filter: 'blur(12px)' },
          { autoAlpha: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
          '-=0.52',
        )
        .fromTo(navRef.current, { y: -16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.72')
        .fromTo(explorerRef.current, { y: 26 }, { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out' }, '-=0.5')
        .fromTo(countdownRef.current, { y: 26 }, { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out' }, '-=0.58')
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
        style={{ '--active-color': activeItem.accent }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="hero__aurora" aria-hidden="true" />

        <div className="hero__shell">
          <header className="topbar" ref={navRef}>
            <a className="wordmark" href="#about" aria-label="Rouse DECA home">
              <span className="wordmark__mark">R</span>
              <span>Rouse High School</span>
            </a>

            <nav className="topbar__nav" aria-label="Primary navigation">
              {CHAPTER_ITEMS.map((item) => (
                <Magnetic key={item.id} strength={0.28}>
                  <a
                    href={`#${item.id}`}
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onClick={() => setActiveId(item.id)}
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
            </nav>
          </header>

          <div className="hero__stage">
            <h1 className="sr-only" id="hero-title">Rouse DECA</h1>
            <p className="hero__school">Rouse High School presents</p>

            <div className="hero__script-stage" ref={scriptRef} aria-hidden="true">
              <span className="hero__script" data-text="Deca">Deca</span>
            </div>

            <div className="hero__orbit" aria-hidden="true" />
            <img
              className="hero__logo"
              ref={logoRef}
              src="/deca-mark.png"
              alt="DECA diamond mark"
              fetchPriority="high"
              onLoad={() => setAssetReady(true)}
              onError={() => setAssetReady(true)}
            />
          </div>

          <div className="hero__bottom">
            <section className="explorer" id="explore" ref={explorerRef} aria-label="Explore Rouse DECA">
              <div className="explorer__tabs">
                {CHAPTER_ITEMS.map((item, index) => (
                  <Magnetic key={item.id} strength={0.2}>
                    <button
                      className={activeId === item.id ? 'is-active' : ''}
                      id={item.id}
                      type="button"
                      aria-pressed={activeId === item.id}
                      onMouseEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {item.label}
                    </button>
                  </Magnetic>
                ))}
              </div>

              <div className="explorer__panel" key={activeItem.id}>
                <span className="explorer__meta">{activeItem.meta}</span>
                <h2>{activeItem.title}</h2>
                <p>{activeItem.body}</p>
                {activeItem.href && (
                  <a href={activeItem.href} target="_blank" rel="noreferrer">
                    Open Texas DECA <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </section>

            <section className="countdown" id="countdown" ref={countdownRef} aria-labelledby="countdown-title">
              <div className="countdown__heading">
                <p id="countdown-title">Time to DECA Districts</p>
                <time dateTime="2026-12-07T08:00:00-06:00">Dec 07—08 · Round Rock</time>
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
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
