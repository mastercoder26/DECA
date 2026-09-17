const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LONG_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const toDate = (value) => (value instanceof Date ? value : new Date(value))

export const monthName = (monthIndex) => LONG_MONTHS[monthIndex]

export const shortDate = (value) => {
  const date = toDate(value)
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`
}

export const weekdayShortDate = (value) => {
  const date = toDate(value)
  return `${DAYS[date.getDay()]} · ${MONTHS[date.getMonth()]} ${date.getDate()}`
}

export const timeOfDay = (value) =>
  toDate(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

export const relativeDays = (value) => {
  const days = Math.ceil((toDate(value).getTime() - Date.now()) / 86_400_000)
  if (days < 0) return 'Past'
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days < 30) return `In ${days} days`
  return `In ${Math.round(days / 30)} months`
}

export const isSameDay = (a, b) => {
  const first = toDate(a)
  const second = toDate(b)
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}
