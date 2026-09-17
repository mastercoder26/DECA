import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import useStoredCollection from '../hooks/useStoredCollection.js'
import { QUESTION_TOPICS, SEED_QUESTIONS } from '../data/questions.js'
import { OFFICERS } from '../data/chapter.js'
import { weekdayShortDate } from '../lib/format.js'

const STORAGE_KEY = 'rouse-deca:questions'
const MAX_LENGTH = 300
const FILTERS = ['All', 'Answered', 'Awaiting reply']

function Ask() {
  const { items, add, update } = useStoredCollection(STORAGE_KEY, SEED_QUESTIONS)
  const [body, setBody] = useState('')
  const [topic, setTopic] = useState(QUESTION_TOPICS[0])
  const [error, setError] = useState('')
  const [justPosted, setJustPosted] = useState(false)
  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    const sorted = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (filter === 'Answered') return sorted.filter((item) => item.answer)
    if (filter === 'Awaiting reply') return sorted.filter((item) => !item.answer)
    return sorted
  }, [items, filter])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = body.trim()

    if (trimmed.length < 8) {
      setError('Give us a little more to work with — at least a full sentence.')
      return
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Keep it under ${MAX_LENGTH} characters so officers can answer quickly.`)
      return
    }

    add({
      id: `q-${Date.now()}`,
      author: 'Anonymous',
      topic,
      body: trimmed,
      createdAt: new Date().toISOString(),
      answer: null,
      upvotes: 0,
      isMine: true,
    })

    setBody('')
    setError('')
    setJustPosted(true)
    window.setTimeout(() => setJustPosted(false), 4000)
  }

  const handleUpvote = (id) => {
    update(id, (question) =>
      question.hasVoted
        ? { ...question, upvotes: question.upvotes - 1, hasVoted: false }
        : { ...question, upvotes: question.upvotes + 1, hasVoted: true },
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Question board"
        title="Ask an officer."
        lead="Questions post anonymously. An officer or the advisor replies, and answered questions stay on the board."
      />

      <div className="ask-split">
        <section className="askform" aria-labelledby="askform-title">
          <h2 id="askform-title">Post a question</h2>

          <form onSubmit={handleSubmit} noValidate>
            <label className="field field--underline">
              <span className="field__label">Topic</span>
              <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                {QUESTION_TOPICS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="field field--underline">
              <span className="field__label">Your question</span>
              <textarea
                rows={5}
                value={body}
                maxLength={MAX_LENGTH}
                placeholder="What do I bring to Districts?"
                onChange={(event) => {
                  setBody(event.target.value)
                  if (error) setError('')
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'ask-error' : 'ask-count'}
              />
            </label>

            <p className="askform__count" id="ask-count">
              {body.length}/{MAX_LENGTH} · posted anonymously
            </p>

            {error && <p className="askform__error" id="ask-error" role="alert">{error}</p>}

            <button type="submit" className="button button--primary">
              Post question <span aria-hidden="true">→</span>
            </button>

            <p className="askform__status" role="status">
              {justPosted ? 'Posted. Officers usually reply within a day.' : ''}
            </p>
          </form>

          <div className="askform__officers">
            <p className="eyebrow">Who answers</p>
            <ul>
              {OFFICERS.map((officer) => (
                <li key={officer.name}>
                  <b>{officer.name}</b> — {officer.focus}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="askboard" aria-labelledby="askboard-title">
          <div className="askboard__head">
            <h2 id="askboard-title">The board</h2>
            <div className="chipbar" role="group" aria-label="Filter questions">
              {FILTERS.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`chip${filter === option ? ' is-active' : ''}`}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <ul className="askboard__list">
            {visible.map((question, index) => (
              <Reveal as="li" className="qcard" key={question.id} delay={Math.min(index, 6) * 60}>
                <div className="qcard__meta">
                  <span className="qcard__topic">{question.topic}</span>
                  <time dateTime={question.createdAt}>{weekdayShortDate(question.createdAt)}</time>
                  {question.isMine && <span className="qcard__mine">Yours</span>}
                </div>

                <p className="qcard__body">{question.body}</p>

                {question.answer ? (
                  <div className="qcard__answer">
                    <p>{question.answer.body}</p>
                    <p className="qcard__answer-by">{question.answer.author}</p>
                  </div>
                ) : (
                  <p className="qcard__pending">Waiting on an officer reply.</p>
                )}

                <button
                  type="button"
                  className={`upvote${question.hasVoted ? ' is-voted' : ''}`}
                  onClick={() => handleUpvote(question.id)}
                  aria-pressed={Boolean(question.hasVoted)}
                >
                  <span aria-hidden="true">▲</span> {question.upvotes}
                  <span className="upvote__text">same question</span>
                </button>
              </Reveal>
            ))}
          </ul>

          {visible.length === 0 && <p className="empty">Nothing here yet.</p>}
        </section>
      </div>
    </>
  )
}

export default Ask
