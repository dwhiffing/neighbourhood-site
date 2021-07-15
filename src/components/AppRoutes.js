import React from 'react'
import { Routes, useSiteData } from 'react-static'
import { Router } from '@reach/router'
import { Grid } from './Grid'
import { Accordion } from './Accordion'
import { useIsMobile } from '../useIsMobile'
import Index from '../pages/index'
import { FAQContainer } from './FAQContainer'

export const AppRoutes = () => {
  const isMobile = useIsMobile()
  const data = useSiteData()

  return (
    <Router>
      <Routes
        path="*"
        render={({ routePath }) => (
          <div>
            {isMobile ? (
              <Accordion routePath={routePath} />
            ) : (
              <Grid routePath={routePath} />
            )}
            <FAQContainer data={data.faq} showBall={routePath === '/'} />
          </div>
        )}
      />
    </Router>
  )
}

export const Loading = () => {
  const isMobile = useIsMobile()

  return isMobile ? (
    <Accordion routePath="/">{<Index />}</Accordion>
  ) : (
    <Grid routePath="/">{<Index />}</Grid>
  )
}
