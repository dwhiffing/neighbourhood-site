import React from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTES } from '../constants'

export const Grid = ({ routePath, children }) => {
  const routeIndex = APP_ROUTES.findIndex((r) => r === routePath)
  const topSize = routeIndex === 0 ? '50' : routeIndex < 3 ? '95' : '5'
  const bottomSize = routeIndex === 0 ? '50' : routeIndex >= 3 ? '95' : '5'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${topSize}vh` }}
      >
        {APP_ROUTES.slice(0, 3).map((route) => (
          <GridItem routePath={routePath} route={route}>
            {children}
          </GridItem>
        ))}
      </motion.div>
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${bottomSize}vh` }}
      >
        {APP_ROUTES.slice(3).map((route) => (
          <GridItem routePath={routePath} route={route}>
            {children}
          </GridItem>
        ))}
      </motion.div>
    </div>
  )
}

const GridItem = ({ children, route, routePath }) => {
  const routeIndex = APP_ROUTES.findIndex((r) => r === routePath)
  const _routeIndex = APP_ROUTES.findIndex((r) => r === route)
  let size = _routeIndex % 3 === routeIndex % 3 ? '95' : '2.5'

  if (routeIndex === 0) size = '33.3333'
  const activeRoute = routeIndex === 0 || route === routePath
  const linkStyle = activeRoute
    ? {}
    : { position: 'absolute', top: 8, left: 8, right: 8, bottom: 8 }

  return (
    <>
      <motion.div
        className="grid-item"
        animate={{ width: `${size}vw`, height: `100%` }}
        initial={false}
      >
        <Link style={linkStyle} to={route}>
          <AnimatePresence initial={false}>
            {activeRoute && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span>{route}</span>
                <AnimatePresence initial={false}>
                  {route === routePath ? children : null}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </>
  )
}
