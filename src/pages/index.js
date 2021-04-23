import React, { useEffect, useState } from 'react'
import logo from '../assets/logo2.png'
import { motion } from 'framer-motion'
import { useRouteData } from 'react-static'
import { RichTextItem } from '../components/RichTextItem'

const COORDS = [
  { x: 'calc(0vw - 0px)', y: 'calc(0vh - 0px)' },
  { x: 'calc(50vw - 111px)', y: 'calc(100vh - 222px)' },
  { x: 'calc(100vw - 222px)', y: 'calc(0vh - 0px)' },
]

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
      style={{
        position: 'absolute',
        width: 222,
        height: 222,
        background: '#004225',
        borderRadius: 300,
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <h1
        style={{
          color: '#fff',
          textAlign: 'center',
        }}
      >
        COVID-19 Protocols
      </h1>
    </motion.div>
  )
}

const Index = () => {
  const [showModal, setShowModal] = useState(false)
  const [showBall, setShowBall] = useState(false)
  const [data, setData] = useState([])
  const { faq } = useRouteData()
  useEffect(() => {
    setShowBall(true)
  }, [])
  useEffect(() => {
    console.log(faq)
    setData(faq)
  }, [faq])

  return (
    <div>
      <FAQBall setShowModal={setShowModal} showBall={showBall} />

      <div style={{ overflow: 'hidden', padding: '25px 20px' }}>
        <img alt="Neighbourhood Studios" src={logo} style={{ height: 60 }} />
        <p style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>
          24 McGee Street Toronto,
          <br />
          ON M4M 2K9 +1 647 748 0155
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
      onClick={() => setShowModal(false)}
      animate={{ opacity: showModal ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        pointerEvents: showModal ? 'auto' : 'none',
        opacity: showModal ? 1 : 0,
        zIndex: 100,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 66, 37, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ opacity: showModal ? 1 : 0, y: showModal ? 0 : 150 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'white',
          minHeight: '90vh',
          maxHeight: '90vh',
          width: '100%',
          maxWidth: 1100,
          display: 'flex',
          margin: '0 20px',
          padding: '50px 35px',
          borderRadius: 12,
        }}
      >
        <div
          style={{
            flex: 1,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'scroll',
          }}
        >
          <div className="flex">
            <div className="flex flex-col items-start">
              <h1 className="mr-4">Our COVID-19 Protocols</h1>
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
