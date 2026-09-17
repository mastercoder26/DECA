import { useEffect, useRef, useState } from 'react'

const VIEW_WIDTH = 620
const VIEW_HEIGHT = 260
const STROKE_LENGTH = 2600 // generous upper bound for the glyph outlines

/**
 * Renders a word as outlined SVG text in a script face, then draws the outline
 * on with stroke-dashoffset before fading the fill in behind it.
 *
 * `start` gates the animation so it can wait for the hero intro to finish.
 * The draw only begins once the webfont is ready — otherwise the first frames
 * would be stroked in a fallback face and visibly reflow.
 */
function DrawnWord({ children, start, label }) {
  const [isFontReady, setFontReady] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    let isActive = true

    const markReady = () => {
      if (isActive) setFontReady(true)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(markReady, markReady)
    } else {
      markReady()
    }

    return () => {
      isActive = false
    }
  }, [])

  const isDrawing = start && isFontReady

  return (
    <span className={`drawn${isDrawing ? ' is-drawing' : ''}`} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} aria-hidden="true" focusable="false">
        <text
          ref={textRef}
          x="50%"
          y="74%"
          textAnchor="middle"
          className="drawn__text"
          style={{ strokeDasharray: STROKE_LENGTH, strokeDashoffset: isDrawing ? 0 : STROKE_LENGTH }}
        >
          {children}
        </text>
        <text x="50%" y="74%" textAnchor="middle" className="drawn__fill">
          {children}
        </text>
      </svg>
    </span>
  )
}

export default DrawnWord
