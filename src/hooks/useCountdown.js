import { useEffect, useState } from 'react'

const MS_PER_DAY = 86_400_000
const MS_PER_HOUR = 3_600_000
const MS_PER_MINUTE = 60_000
const MS_PER_SECOND = 1_000

export const getRemaining = (target) => {
  const difference = Math.max(0, target.getTime() - Date.now())

  return {
    total: difference,
    days: Math.floor(difference / MS_PER_DAY),
    hours: Math.floor((difference / MS_PER_HOUR) % 24),
    minutes: Math.floor((difference / MS_PER_MINUTE) % 60),
    seconds: Math.floor((difference / MS_PER_SECOND) % 60),
  }
}

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    setRemaining(getRemaining(target))
    const timer = window.setInterval(() => setRemaining(getRemaining(target)), MS_PER_SECOND)
    return () => window.clearInterval(timer)
  }, [target])

  return remaining
}

export default useCountdown
