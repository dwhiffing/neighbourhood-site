import React, { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { RichTextItem } from '../components/RichTextItem'
import { kebabCase } from 'lodash'
import { useContainerWidth, useKeypress } from '../useIsMobile'

const DURATION = 10
const SIZE = 222

export const FAQContainer = ({ data, showBall }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="absolute inset-0 pointer-events-none">
      <FAQBall
        heading={data[0].ctaLabel}
        setShowModal={setShowModal}
        showBall={showBall}
      />
      <FAQModal
        heading={data ? data[0]?.heading : null}
        showModal={showModal}
        setShowModal={setShowModal}
        content={data ? data[0]?.content : null}
      />
    </div>
  )
}

const FAQModal = ({ showModal, setShowModal, heading, content }) => {
  const ref = useRef()
  const [scrollPos, setScrollPos] = useState(0)
  const links = content.content
    .filter((c) => c.nodeType === 'heading-2')
    .map((c) => c.content[0].value)

  useEffect(() => {
    const setScroll = () => setScrollPos(ref.current.scrollTop)
    ref.current?.addEventListener('scroll', setScroll)
    const _ref = ref.current
    return () => _ref.removeEventListener('scroll', setScroll)
  }, [ref])

  useKeypress('Escape', () => setShowModal(false))

  return (
    <motion.div
      className="rich-content inset-0 flex justify-center items-center fixed z-20"
      onClick={() => setShowModal(false)}
      animate={{ opacity: showModal ? 1 : 0 }}
      style={{
        pointerEvents: showModal ? 'auto' : 'none',
        opacity: showModal ? 1 : 0,
        background: 'rgba(0, 66, 37, 0.8)',
      }}
    >
      <motion.div
        animate={{ opacity: showModal ? 1 : 0, y: showModal ? 0 : 150 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full flex mx-5 py-9 px-7 pr-4 relative rounded-xl"
        style={{ minHeight: '80vh', maxHeight: '80vh', maxWidth: 1100 }}
      >
        <button
          className="absolute top-0 right-0 mr-3 mt-3 bg-white"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon />
        </button>
        <div
          ref={ref}
          className="flex-1 w-full overflow-y-scroll pr-6 layout-scrollbar"
          style={{ maxHeight: '80vh' }}
        >
          <div className="flex">
            <div
              className="hidden flex-col items-start fixed md:flex"
              style={{ maxWidth: 260 }}
            >
              <h1 className="mr-4 font-sans">{heading}</h1>
              {links.map((link, i, arr) => {
                let targetOffset = 99999
                let nextTargetOffset = 99999
                if (typeof document !== 'undefined') {
                  const nextLink = arr[i + 1]
                  const target = document.getElementById(kebabCase(link))
                  targetOffset = target?.offsetTop - 50
                  if (nextLink) {
                    const nextTarget = document.getElementById(
                      kebabCase(nextLink),
                    )
                    nextTargetOffset = nextTarget?.offsetTop - 50
                  }
                }
                return (
                  <a
                    key={link + i}
                    className={`link${
                      scrollPos > targetOffset && scrollPos < nextTargetOffset
                        ? ' link-active'
                        : ''
                    }`}
                    href={`/#${kebabCase(link)}`}
                  >
                    {link}
                  </a>
                )
              })}
            </div>

            <div className="flex-1 pl-0 md:pl-60">
              <RichTextItem content={content} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQBall(props) {
  const [direction, setDirection] = useState(1)
  const base = useMotionValue(0)
  const width = useContainerWidth()
  const finalSize = width > 900 ? SIZE : SIZE / 1.5
  const x = useTransform(base, (v) => `calc(${100 * v}vw - ${finalSize * v}px)`)
  const y = useTransform(base, (v) => {
    let value = v <= 0.5 ? 200 * v : 200 * (1 - v)
    let offset = v <= 0.5 ? finalSize * 2 * v : finalSize * 2 * (1 - v)
    return `calc(${value}vh - ${offset}px)`
  })

  useEffect(() => {
    animate(base, direction, {
      duration: DURATION,
      type: 'tween',
      ease: 'linear',
      onComplete: () => setDirection((i) => (i === 1 ? 0 : 1)),
    })
  }, [base, direction])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: props.showBall ? 1 : 0 }}
      style={{ transformOrigin: 'center center' }}
      onHoverStart={() => base.stop()}
      onHoverEnd={() => {
        const duration =
          direction === 1
            ? DURATION - DURATION * base.get()
            : DURATION * base.get()
        animate(base, direction, {
          duration,
          type: 'tween',
          ease: 'linear',
          onComplete: () => setDirection((i) => (i === 1 ? 0 : 1)),
        })
      }}
    >
      <motion.div
        onClick={() => props.setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        style={{
          x,
          y,
          pointerEvents: props.showBall ? 'auto' : 'none',
          width: finalSize,
          height: finalSize,
        }}
        className="absolute bg-green flex justify-center items-center cursor-pointer rounded-full z-10 pointer-events-auto p-5"
      >
        {width > 900 ? (
          <h1 className="text-white text-center">{props.heading}</h1>
        ) : (
          <h2
            className="text-white font-serif text-center"
            style={{ color: 'white' }}
          >
            {props.heading}
          </h2>
        )}
      </motion.div>
    </motion.div>
  )
}

export const CloseIcon = ({ fill = '#004225' }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.41425 7.00025L13.7072 1.70725C14.0982 1.31625 14.0982 0.68425 13.7072 0.29325C13.3162 -0.09775 12.6842 -0.09775 12.2933 0.29325L7.00025 5.58625L1.70725 0.29325C1.31625 -0.09775 0.68425 -0.09775 0.29325 0.29325C-0.09775 0.68425 -0.09775 1.31625 0.29325 1.70725L5.58625 7.00025L0.29325 12.2933C-0.09775 12.6842 -0.09775 13.3162 0.29325 13.7072C0.48825 13.9022 0.74425 14.0002 1.00025 14.0002C1.25625 14.0002 1.51225 13.9022 1.70725 13.7072L7.00025 8.41425L12.2933 13.7072C12.4882 13.9022 12.7443 14.0002 13.0002 14.0002C13.2562 14.0002 13.5122 13.9022 13.7072 13.7072C14.0982 13.3162 14.0982 12.6842 13.7072 12.2933L8.41425 7.00025Z"
        fill={fill}
      />
    </svg>
  )
}
