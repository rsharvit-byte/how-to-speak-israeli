import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CARDS } from './cards'
import CardFace from './CardFace.jsx'

const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const FAN = {
  scale: [1, 0.92, 0.86, 0.8],
  y: [0, -14, 2, 16],
  rotate: [0, 2.2, 4.5, 7],
  x: [0, 38, 56, 74],
}

function cardVariants(settings) {
  return {
    visible: (index) => {
      const fanIndex = Math.min(index, 3)
      return {
        opacity: index > 3 ? 0 : 1,
        zIndex: CARDS.length - index,
        scale: FAN.scale[fanIndex],
        y: FAN.y[fanIndex],
        rotate: FAN.rotate[fanIndex],
        x: FAN.x[fanIndex],
        perspective: 400,
        transition: {
          zIndex: { delay: settings.zIndexDelay },
          scale: {
            type: 'spring',
            duration: settings.springDuration,
            bounce: settings.springBounce,
          },
          y: {
            type: 'spring',
            duration: settings.springDuration,
            bounce: settings.springBounce,
          },
          x: {
            type: 'spring',
            duration: settings.xSpringDuration,
            bounce: settings.xSpringBounce,
          },
        },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 50,
    },
  }
}

export default function CardStack({ settings, onFrontChange }) {
  const initialOrder = useMemo(() => CARDS.map((_, index) => index), [])
  const [order, setOrder] = useState(initialOrder)
  const [dragElastic, setDragElastic] = useState(settings.dragElastic)

  useEffect(() => {
    setDragElastic(settings.dragElastic)
  }, [settings.dragElastic])

  const frontIndex = order[0]
  const frontCard = CARDS[frontIndex]

  useEffect(() => {
    onFrontChange?.(frontCard, frontIndex)
  }, [frontCard, frontIndex, onFrontChange])

  const cycle = (direction = 1) => {
    setOrder((current) => {
      if (direction === 1) {
        return [...current.slice(1), current[0]]
      }
      return [current[current.length - 1], ...current.slice(0, -1)]
    })
  }

  useEffect(() => {
    let locked = false
    const onKey = (event) => {
      const tag = event.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (locked) return
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        locked = true
        cycle(1)
        window.setTimeout(() => {
          locked = false
        }, 420)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        locked = true
        cycle(-1)
        window.setTimeout(() => {
          locked = false
        }, 420)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const variants = cardVariants(settings)

  return (
    <div className="content-container">
      <AnimatePresence initial={false}>
        {order.map((cardIndex, position) => {
          const card = CARDS[cardIndex]
          return (
            <motion.div
              key={card.id}
              custom={position}
              variants={variants}
              initial="exit"
              animate="visible"
              exit="exit"
              drag={position === 0}
              style={{ pointerEvents: position === 0 ? 'auto' : 'none' }}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={dragElastic}
              onDragEnd={(_event, { offset, velocity }) => {
                const powerX = swipePower(offset.x, velocity.x)
                const powerY = swipePower(offset.y, velocity.y)
                const threshold = settings.swipeConfidenceThreshold
                if (powerX > threshold || powerY > threshold || powerX < -threshold || powerY < -threshold) {
                  cycle(1)
                }
              }}
              className={`card card-${position}`}
              role="group"
              aria-label={card.word}
            >
              <CardFace card={card} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
