import React from 'react'
import { Routes } from 'react-static'
import { Router } from '@reach/router'
import { Grid } from './Grid'
import { Accordion } from './Accordion'
import { useIsMobile } from '../useIsMobile'

export const AppRoutes = () => {
  const isMobile = useIsMobile()

  return (
    <Router>
      <Routes
        path="*"
        render={({ routePath, getComponentForPath }) => {
          const element = getComponentForPath(routePath)

          return isMobile ? (
            <Accordion routePath={routePath}>{element}</Accordion>
          ) : (
            <Grid routePath={routePath}>{element}</Grid>
          )
        }}
      />
    </Router>
  )
}
