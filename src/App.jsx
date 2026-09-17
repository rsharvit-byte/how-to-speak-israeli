import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardStack from './CardStack.jsx'
import { CARDS, DEFAULT_SETTINGS } from './cards'

export default function App() {
  const [front, setFront] = useState({ card: CARDS[0], index: 0 })
  const showNotes = useMemo(
    () => new URLSearchParams(window.location.search).has('notes'),
    []
  )

  const onFrontChange = useCallback((card, index) => {
    setFront({ card, index })
  }, [])

  return (
    <div className={`App${showNotes ? ' App--notes' : ''}`}>
      <div className="stage">
        <div className="copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={front.card.id}
              className="headline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {front.card.headline.map((line) => (
                <span
                  key={line.text}
                  className={`headline-line headline-line--${line.role}`}
                >
                  {line.text}
                  {line.emoji ? (
                    <span className="line-emoji" aria-hidden="true">
                      {line.emoji}
                    </span>
                  ) : null}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>
        <div className="stack-wrap">
          <CardStack settings={DEFAULT_SETTINGS} onFrontChange={onFrontChange} />
        </div>
      </div>

      <footer className="talk-footer">
        <div className="progress" aria-label={`Card ${front.index + 1} of ${CARDS.length}`}>
          {CARDS.map((card, index) => (
            <span
              key={card.id}
              className={`progress-dot${index === front.index ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </footer>

      {showNotes ? (
        <aside className="speaker-notes">
          <p className="speaker-notes-kicker">Say this</p>
          <h2>{front.card.word}</h2>
          <ul>
            {(front.card.notes || []).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  )
}
