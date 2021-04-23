import { useState, useEffect } from 'react'

export const useIsMobile = () => {
  const [width, setWidth] = useState(window ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width <= 850
}
