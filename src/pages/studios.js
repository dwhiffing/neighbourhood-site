import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useSiteData } from 'react-static'
import { DottedLine } from '../components/DottedLine'
import { BasePage } from '../components/BasePage'
import { motion } from 'framer-motion'

const Studios = ({ scrollPos }) => {
  const { studios } = useSiteData()

  const [refs, setRefs] = React.useState([])

  React.useEffect(() => {
    setRefs((elRefs) =>
      Array(studios.length)
        .fill()
        .map((_, i) => elRefs[i] || React.createRef()),
    )
  }, [studios.length])

  return (
    <BasePage
      heading="Studios"
      scrollPos={scrollPos}
      links={studios?.map((studio, index) => ({
        label: studio.name,
        href: `#studio-${index + 1}`,
      }))}
    >
      {studios?.map((studio, index) => (
        <StudioItem
          ref={refs[index]}
          key={'studio' + index}
          studio={studio}
          index={index}
        />
      ))}
    </BasePage>
  )
}

const StudioItem = forwardRef(({ studio, index }, ref) => {
  return (
    <div ref={ref} id={`studio-${index + 1}`} className="pt-2">
      <h1 className="mt-8 mb-5">{studio.name}</h1>

      <div className="flex mb-8">
        {studio.links?.map((link, i) => (
          <button
            key={'tag' + i}
            className="mr-2"
            onClick={() => window.open(link.fields.url, '_blank')}
          >
            {link.fields.label}
          </button>
        ))}
      </div>

      <StudioCarousel images={studio.images} />

      <div className="flex">
        <div className="flex-1">
          <h2>Space</h2>
          <ul>
            {studio.space.map((space, i) => (
              <li key={'space' + i}>{space}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h2>Specs</h2>
          <ul>
            {studio.specs.map((spec, i) => (
              <li key={'spec' + i}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>

      <DottedLine className="mt-12 mb-6" />
    </div>
  )
})

export default Studios

const StudioCarousel = ({ images }) => {
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
        className="flex flex-1 mb-5"
      >
        {images.map((image, i) => (
          <img
            key={'image' + i}
            alt="Studio"
            src={`http:${image.fields.file.url}`}
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
