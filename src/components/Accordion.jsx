import { useId, useState } from 'react'

function AccordionItem({ question, answer, isOpen, onToggle }) {
  const panelId = useId()

  return (
    <div className={`accordion__item${isOpen ? ' is-open' : ''}`}>
      <h3 className="accordion__heading">
        <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
          <span>{question}</span>
          <span className="accordion__icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="accordion__panel" id={panelId} role="region" hidden={!isOpen}>
        <p>{answer}</p>
      </div>
    </div>
  )
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={item.q}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}

export default Accordion
