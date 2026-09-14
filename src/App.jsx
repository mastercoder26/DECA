import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  function handleStart() {
    setMessage('You are ready to build.')
  }

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">React starter</p>
        <h1 id="hero-title">Make something delightful.</h1>
        <p className="intro">
          A clean JavaScript React scaffold, ready for your first component.
        </p>
        <button type="button" onClick={handleStart}>
          Get started
        </button>
        {message && <p className="status" role="status">{message}</p>}
      </section>
    </main>
  )
}

export default App
