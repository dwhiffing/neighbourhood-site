import React, { useState, useEffect } from 'react'
import { Routes } from 'react-static'
import { Router } from '@reach/router'
import { Grid } from './Grid'
import { Accordion } from './Accordion'

export const AppRoutes = () => {
  const [width, setWidth] = useState(window ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Router>
      <Routes
        path="*"
        render={({ routePath, getComponentForPath }) => {
          const element = getComponentForPath(routePath)

          return width > 850 ? (
            <Grid routePath={routePath}>{element}</Grid>
          ) : (
            <Accordion routePath={routePath}>{element}</Accordion>
          )
        }}
      />
    </Router>
  )
}
