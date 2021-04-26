import React from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTE_TILES } from '../constants'
import neighbourhoodLogo from '../assets/logo.png'

export const Grid = ({ routePath, children }) => {
  const routeIndex = APP_ROUTE_TILES.findIndex((r) => r === routePath)
  const topSize = STATIC_ROUTES.includes(routePath)
    ? '50'
    : routeIndex < 3
    ? '95'
    : '5'
  const bottomSize = STATIC_ROUTES.includes(routePath)
    ? '50'
    : routeIndex >= 3
    ? '95'
    : '5'

  return (
    <div className="flex flex-col h-screen">
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${topSize}vh`, minHeight: 90 }}
      >
        {APP_ROUTE_TILES.slice(0, 3).map((route) => (
          <GridItem key={route} routePath={routePath} route={route}>
            {children}
          </GridItem>
        ))}
      </motion.div>
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${bottomSize}vh`, minHeight: 90 }}
      >
        {APP_ROUTE_TILES.slice(3).map((route) => (
          <GridItem key={route} routePath={routePath} route={route}>
            {children}
          </GridItem>
        ))}
      </motion.div>
    </div>
  )
}

const GridItem = ({ children, route, routePath }) => {
  const routeIndex = APP_ROUTE_TILES.findIndex((r) => r === routePath)
  const _routeIndex = APP_ROUTE_TILES.findIndex((r) => r === route)
  let size = _routeIndex % 3 === routeIndex % 3 ? '94' : '3'

  if (STATIC_ROUTES.includes(routePath)) size = '33.3333'

  const activeRoute = STATIC_ROUTES.includes(routePath) || route === routePath
  const linkStyle =
    route === routePath
      ? { pointerEvents: 'none' }
      : { position: 'absolute', top: 8, left: 8, right: 8, bottom: 8 }

  const renderChildren =
    route === routePath || (route === '/' && routePath === 'faq')

  const result = (
    <AnimatePresence>
      {activeRoute ? (
        renderChildren ? (
          <motion.div
            style={{ minWidth: renderChildren ? '80vw' : '' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        ) : (
          <h2>{route[0].toUpperCase() + route.slice(1)}</h2>
        )
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
      <motion.div
        className="grid-item layout-scrollbar"
        animate={{
          width: `${size}vw`,
          minWidth: 90,
          minHeight: 90,
          overflowY: STATIC_ROUTES.includes(route)
            ? 'visible'
            : route === routePath
            ? 'scroll'
            : 'hidden',
          overflowX: STATIC_ROUTES.includes(route) ? 'visible' : 'hidden',
        }}
        initial={false}
      >
        {routePath !== route &&
        !(route === '/' && routePath === 'faq') &&
        STATIC_ROUTES.includes(route) ? (
          <img
            alt="Neighbourhood Studios"
            src={neighbourhoodLogo}
            className="absolute inset-0 m-5 max-w-none"
            style={{ height: 46, paddingLeft: 5, paddingTop: 5 }}
          />
        ) : null}

        {result}
        <Link style={linkStyle} to={routePath === '/' ? route : '/'} />
      </motion.div>
    </>
  )
}

const STATIC_ROUTES = ['/', 'faq']
