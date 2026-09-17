import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { FIELD_MARKS } from '../data/marks.js'
import { DISTRICTS_LABEL, DISTRICTS_START, NAV_ITEMS, TICKER_WORDS } from '../data/content.js'
import CountdownClock from '../components/CountdownClock.jsx'
import Magnetic from '../components/Magnetic.jsx'
import MarkField from '../components/MarkField.jsx'
import DiamondTrail from '../components/DiamondTrail.jsx'
import useInteractivePointer from '../hooks/useInteractivePointer.js'
import DrawnWord from '../components/DrawnWord.jsx'

const IDLE_SPIN_DURATION = 34

function Hero() {
  const [assetReady, setAssetReady] = useState(false)
  const [isIntroDone, setIntroDone] = useState(false)
  const heroRef = useRef(null)
  const navRef = useRef(null)
  const centerRef = useRef(null)
  const centerLogoRef = useRef(null)
  const titleRef = useRef(null)
  const actionsRef = useRef(null)
  const countdownRef = useRef(null)
  const canvasAreaRef = useRef(null)
  const pointerRef = useInteractivePointer(canvasAreaRef)

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
        gsap.set([navRef.current, centerRef.current, titleRef.current, actionsRef.current, countdownRef.current, marks], {
          autoAlpha: 1,
          clearProps: 'transform,filter',
        })
        setIntroDone(true)
        return
      }

      document.body.classList.add('intro-running')

      const timeline = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          document.body.classList.remove('intro-running')
          setIntroDone(true)
          idleSpin = gsap.to(centerLogoRef.current, {
            rotation: '+=360',
            duration: IDLE_SPIN_DURATION,
            ease: 'none',
            repeat: -1,
          })
        },
      })

      timeline
        .set([navRef.current, titleRef.current, actionsRef.current, countdownRef.current], { autoAlpha: 0 })
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
        .to(centerRef.current, { scale: 0.92, rotation: 2, filter: 'blur(0px)', duration: 1.45, ease: 'expo.out' })
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
        .fromTo(actionsRef.current, { y: 12 }, { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power3.out' }, '-=0.42')
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
    <section
      className={`hero${assetReady ? ' is-ready' : ''}`}
      ref={heroRef}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <header className="topbar" ref={navRef}>
        <Link className="wordmark" to="/" aria-label="Rouse DECA home">
          <span className="wordmark__diamond" aria-hidden="true" />
          <span>Rouse DECA</span>
        </Link>

        <nav className="topbar__nav" aria-label="Page sections">
          {NAV_ITEMS.map((item) => (
            <Magnetic key={item.label} strength={0.24}>
              <a href={item.href}>{item.label}</a>
            </Magnetic>
          ))}
        </nav>

        <Magnetic strength={0.2}>
          <Link className="topbar__cta" to="/hub">
            Member hub <span aria-hidden="true">→</span>
          </Link>
        </Magnetic>
      </header>

      <div className="hero__canvas" id="top" ref={canvasAreaRef}>
        <MarkField containerRef={canvasAreaRef} pointerRef={pointerRef} />
        <DiamondTrail containerRef={canvasAreaRef} pointerRef={pointerRef} />

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
          <p>Rouse High School&rsquo;s business &amp; leadership chapter</p>
          <h1 id="hero-title">
            <span>Rouse</span>
            <DrawnWord start={isIntroDone} label="DECA">DECA</DrawnWord>
          </h1>
          <p>Leander, Texas · Chartered chapter of Texas DECA</p>
        </div>

        <div className="hero__actions" ref={actionsRef}>
          <a className="button button--primary" href="#deca">
            What is DECA <span aria-hidden="true">↓</span>
          </a>
          <Link className="button button--quiet" to="/hub">
            Member hub <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {[0, 1, 2, 3].map((copy) => (
            <div className="hero__ticker-run" key={copy}>
              {TICKER_WORDS.map((word) => (
                <span key={`${copy}-${word}`}>
                  {word}
                  <i className="hero__ticker-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="countdown" id="countdown" ref={countdownRef} aria-labelledby="countdown-title">
        <div className="countdown__heading">
          <p id="countdown-title">Time to DECA Districts</p>
          <time dateTime={DISTRICTS_START.toISOString()}>{DISTRICTS_LABEL}</time>
        </div>
        <CountdownClock target={DISTRICTS_START} name="DECA Districts" />
      </section>
    </section>
  )
}

export default Hero
