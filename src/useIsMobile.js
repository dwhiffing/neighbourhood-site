import { useState, useEffect } from 'react'

export const useIsMobile = () => {
  const width = useContainerWidth()
  return width <= 900
}

export const useContainerWidth = () => {
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

  return width
}

export const useKeypress = (key, action) => {
  useEffect(() => {
    function onKeyup(e) {
      console.log(e.key)
      if (e.key === key) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [action, key])
}
