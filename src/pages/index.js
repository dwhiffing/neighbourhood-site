import React, { useEffect, useState } from 'react'
import logo from '../assets/logo2.png'
import { motion } from 'framer-motion'
import { useRouteData } from 'react-static'
import { RichTextItem } from '../components/RichTextItem'

const Index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showBall, setShowBall] = useState(false)
  const [data, setData] = useState([])
  const { faq } = useRouteData()

  useEffect(() => {
    setShowBall(true)
  }, [])
  useEffect(() => {
    setData(faq)
  }, [faq])

  return (
    <div>
      <FAQBall setShowModal={setShowModal} showBall={showBall} />

      <div className="overflow-hidden px-5 py-5">
        <img alt="Neighbourhood Studios" src={logo} style={{ height: 60 }} />
        <p className="font-serif whitespace-nowrap keep-all mt-4">
          24 McGee Street
          <br />
          Toronto, ON M4M 2K9
          <br />
          +1 647 748 0155
          <br />
          contact@neighbourhoodstudios.com
        </p>
      </div>

      <FAQModal
        showModal={showModal}
        setShowModal={setShowModal}
        content={data ? data[0]?.content : null}
      />
    </div>
  )
}

export default Index

const FAQModal = ({ showModal, setShowModal, content }) => {
  return (
    <motion.div
      className="faq-modal inset-0 flex justify-center items-center fixed z-20"
      onClick={() => setShowModal(false)}
      animate={{ opacity: showModal ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        pointerEvents: showModal ? 'auto' : 'none',
        opacity: showModal ? 1 : 0,
        background: 'rgba(0, 66, 37, 0.8)',
      }}
    >
      <motion.div
        animate={{ opacity: showModal ? 1 : 0, y: showModal ? 0 : 150 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.3 }}
        className="bg-white w-full flex mx-5 py-9 px-7 pr-4 relative rounded-xl"
        style={{ minHeight: '90vh', maxHeight: '90vh', maxWidth: 1100 }}
      >
        <button
          className="absolute top-0 right-0 mr-3 mt-3 bg-white"
          onClick={() => setShowModal(false)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.41425 7.00025L13.7072 1.70725C14.0982 1.31625 14.0982 0.68425 13.7072 0.29325C13.3162 -0.09775 12.6842 -0.09775 12.2933 0.29325L7.00025 5.58625L1.70725 0.29325C1.31625 -0.09775 0.68425 -0.09775 0.29325 0.29325C-0.09775 0.68425 -0.09775 1.31625 0.29325 1.70725L5.58625 7.00025L0.29325 12.2933C-0.09775 12.6842 -0.09775 13.3162 0.29325 13.7072C0.48825 13.9022 0.74425 14.0002 1.00025 14.0002C1.25625 14.0002 1.51225 13.9022 1.70725 13.7072L7.00025 8.41425L12.2933 13.7072C12.4882 13.9022 12.7443 14.0002 13.0002 14.0002C13.2562 14.0002 13.5122 13.9022 13.7072 13.7072C14.0982 13.3162 14.0982 12.6842 13.7072 12.2933L8.41425 7.00025Z"
              fill="#004225"
            />
          </svg>
        </button>
        <div
          className="flex-1 w-full overflow-y-scroll pr-6"
          style={{ maxHeight: '80vh' }}
        >
          <div className="flex">
            <div
              className="flex flex-col items-start"
              style={{ maxWidth: 260 }}
            >
              <h1 className="mr-4 font-sans">Our COVID-19 Protocols</h1>
              <a className="link" href="/#">
                Intro
              </a>
              <a className="link" href="/#">
                Safeguards
              </a>
            </div>

            <div className="flex-1">
              <RichTextItem content={content} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQBall(props) {
  return (
    <motion.div
      onClick={() => props.setShowModal(true)}
      animate={
        props.showBall
          ? null
          : {
              x: COORDS.map((c) => c.x),
              y: COORDS.map((c) => c.y),
            }
      }
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 10,
        type: 'tween',
        ease: 'linear',
      }}
      className="absolute bg-green flex justify-center items-center cursor-pointer rounded-full z-10"
      style={{ width: 222, height: 222 }}
    >
      <h1 className="text-white text-center">COVID-19 Protocols</h1>
    </motion.div>
  )
}

const COORDS = [
  { x: 'calc(0vw - 0px)', y: 'calc(0vh - 0px)' },
  { x: 'calc(50vw - 111px)', y: 'calc(100vh - 222px)' },
  { x: 'calc(100vw - 222px)', y: 'calc(0vh - 0px)' },
]
