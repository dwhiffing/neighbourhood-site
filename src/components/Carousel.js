import React, { useEffect, useState } from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
// import { useIsMobile } from '../useIsMobile'

export const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(
    typeof document !== 'undefined' ? window.innerWidth : 0,
  )

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="mb-5">
      <ResponsiveCarousel
        showThumbs={false}
        showIndicators={false}
        showArrows={width > 900}
        showStatus={false}
        onChange={setIndex}
        infiniteLoop
        interval={6000}
        autoPlay
        emulateTouch
        className="carousel flex flex-1 mb-5"
      >
        {images.map((image, i) => (
          <div className="flex flex-1 items-center" key={'image' + i}>
            <img
              alt="Studio"
              src={`http:${image.fields.file.url}?w=1024`}
              className="w-full h-full"
            />
          </div>
        ))}
      </ResponsiveCarousel>

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
