import { useLayoutEffect, useRef } from 'react'
import useCountdown from '../hooks/useCountdown.js'

// One unit of the clock. Digits that change roll out while the new one rolls in.
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
                <span className="time-unit__value time-unit__value--out" key={`out-${index}-${previousDigit}-${digit}`}>
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

function CountdownClock({ target, name = 'the event', compact = false }) {
  const remaining = useCountdown(target)
  const ariaLabel = `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds until ${name}`

  return (
    <div className={`countdown__clock${compact ? ' countdown__clock--compact' : ''}`} role="timer" aria-label={ariaLabel}>
      <TimeUnit label="Days" value={remaining.days} />
      <TimeUnit label="Hours" value={remaining.hours} />
      <TimeUnit label="Minutes" value={remaining.minutes} />
      <TimeUnit label="Seconds" value={remaining.seconds} />
    </div>
  )
}

export default CountdownClock
