import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import Magnetic from './components/Magnetic.jsx'

const DISTRICTS_START = new Date('2026-12-07T08:00:00-06:00')

const NAV_ITEMS = [
  ['About', '#about'],
  ['Past Results', '#results'],
  ['Sponsors', '#sponsors'],
  ['Help', '#help'],
  ['Resources', '#resources'],
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

  return (
    <div className="time-unit">
      <div className="time-unit__window" aria-hidden="true">
        <span className="time-unit__value" key={formatted}>{formatted}</span>
      </div>
      <span className="time-unit__label">{label}</span>
    </div>
  )
}

function App() {
  const [remaining, setRemaining] = useState(calculateRemaining)
  const [assetReady, setAssetReady] = useState(false)
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const titleRef = useRef(null)
  const countdownRef = useRef(null)
  const footerRef = useRef(null)

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
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([logoRef.current, navRef.current, titleRef.current, countdownRef.current, footerRef.current], {
          autoAlpha: 1,
          clearProps: 'transform,filter',
        })
        return
      }

      document.body.classList.add('intro-running')
      const timeline = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => document.body.classList.remove('intro-running'),
      })

      timeline
        .set([navRef.current, titleRef.current, countdownRef.current, footerRef.current], { autoAlpha: 0 })
        .set(logoRef.current, {
          autoAlpha: 0,
          xPercent: -50,
          scale: 7,
          rotation: -14,
          x: '-18vw',
          y: '18vh',
          filter: 'blur(2px)',
        })
        .to(logoRef.current, { autoAlpha: 1, duration: 0.16 })
        .to(logoRef.current, {
          scale: 0.38,
          rotation: 14,
          x: '24vw',
          y: '-12vh',
          filter: 'blur(0px)',
          duration: 0.92,
          ease: 'expo.inOut',
        })
        .to(logoRef.current, {
          scale: 1.75,
          rotation: -68,
          x: '-68vw',
          y: '18vh',
          duration: 0.72,
          ease: 'power4.in',
        })
        .set(logoRef.current, {
          scale: 1.5,
          rotation: 52,
          x: '68vw',
          y: '-22vh',
        })
        .to(logoRef.current, {
          scale: 0.78,
          rotation: -9,
          x: '-4vw',
          y: '3vh',
          duration: 0.95,
          ease: 'power3.out',
        })
        .to(logoRef.current, {
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 0.72,
          ease: 'elastic.out(1, 0.55)',
        })
        .fromTo(navRef.current, { y: -18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.9')
        .fromTo(titleRef.current, { y: 28 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.42')
        .fromTo(countdownRef.current, { y: 22 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.42')
        .fromTo(footerRef.current, { y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
    }, heroRef)

    return () => {
      document.body.classList.remove('intro-running')
      context.revert()
    }
  }, [assetReady])

  return (
    <main>
      <section
        className={`hero${assetReady ? ' is-ready' : ''}`}
        id="about"
        ref={heroRef}
        aria-labelledby="hero-title"
      >
        <header className="topbar" ref={navRef}>
          <a className="wordmark" href="#about" aria-label="Rouse DECA home">
            <span>RHS</span>
            <i aria-hidden="true" />
            <span>DECA</span>
          </a>

          <nav className="topbar__nav" aria-label="Primary navigation">
            {NAV_ITEMS.map(([label, href]) => (
              <Magnetic key={label}>
                <a href={href}>{label}</a>
              </Magnetic>
            ))}
          </nav>

          <span className="topbar__year">26—27</span>
        </header>

        <div className="hero__grid" aria-hidden="true" />
        <span className="hero__chapter" aria-hidden="true">DISTRICT 05 / TEXAS</span>

        <img
          className="hero__logo"
          ref={logoRef}
          src="/deca-mark.png"
          alt="DECA diamond mark"
          fetchPriority="high"
          onLoad={() => setAssetReady(true)}
        />

        <div className="hero__content">
          <h1 id="hero-title" ref={titleRef}>Rouse DECA</h1>

          <div className="countdown" id="countdown" ref={countdownRef}>
            <div className="countdown__heading">
              <p>Time to DECA Districts</p>
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
          </div>
        </div>

        <div className="hero__footer" ref={footerRef}>
          <span>Rouse High School</span>
          <span>Competition starts Monday, 8:00 AM CT</span>
          <span>Leander, Texas</span>
        </div>
      </section>

      <section className="landing-index" aria-label="Rouse DECA links">
        <a id="results" href="https://rhs.leanderisd.org/" target="_blank" rel="noreferrer">
          <span>01</span><strong>Past Results</strong><em>Rouse High School ↗</em>
        </a>
        <div id="sponsors">
          <span>02</span><strong>Sponsors</strong><em>Chapter partners</em>
        </div>
        <div id="help">
          <span>03</span><strong>Help</strong><em>Competition support</em>
        </div>
        <a id="resources" href="https://www.texasdeca.org/districts" target="_blank" rel="noreferrer">
          <span>04</span><strong>Resources</strong><em>Texas DECA ↗</em>
        </a>
      </section>
    </main>
  )
}

export default App
