import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const Carousel = ({ images }) => {
  const resetInterval = useRef()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let interval

    resetInterval.current = () => {
      interval && clearInterval(interval)
      interval = setInterval(() => {
        setIndex((i) => (i >= images.length - 1 ? 0 : i + 1))
      }, 6000)
    }

    resetInterval.current()

    return () => clearInterval(interval)
  }, [images])

  return (
    <div className="flex flex-col mb-8 overflow-hidden">
      <motion.div
        onClick={(e) => {
          resetInterval.current()
          var rect = e.target.getBoundingClientRect()
          const isLeft = e.clientX - rect.left <= rect.width / 2
          if (rect.left > 0)
            if (isLeft) {
              setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
            } else {
              setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
            }
        }}
        animate={{ x: `-${index * 100}%` }}
        className="flex items-center flex-1 mb-5"
      >
        {images.map((image, i) => (
          <img
            key={'image' + i}
            alt="Studio"
            src={`http:${image.fields.file.url}?w=1024`}
            className="w-full h-full"
          />
        ))}
      </motion.div>

      <div className="flex">
        {images.map((image, i) => (
          <div
            key={'dot' + i}
            className={`flex-1 bg-green ${i < images.length - 1 ? 'mr-2' : ''}`}
            style={{ height: 3, opacity: index === i ? 1 : 0.25 }}
          />
        ))}
      </div>
    </div>
  )
}
