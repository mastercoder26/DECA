import useReveal from '../hooks/useReveal.js'

/**
 * Wraps children in a scroll-triggered fade/rise. `delay` staggers siblings,
 * `as` keeps the markup semantic. Callers may pass their own `style`; it merges
 * with the delay variable rather than replacing it.
 */
function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const [ref, isVisible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
