import React, { useEffect, useRef, useState } from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTE_TILES } from '../constants'
import Studios from '../pages/studios'
import Index from '../pages/index'
import About from '../pages/about'
import Equipment from '../pages/equipment'
import Feed from '../pages/feed'
import { Logo } from './Logo'

const COMPONENTS = {
  studios: Studios,
  '/': Index,
  about: About,
  feed: Feed,
  equipment: Equipment,
  expendables: () => null,
}

const capitalize = (route) => route[0].toUpperCase() + route.slice(1)
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

  const renderer = (route) => (
    <GridItem key={route} routePath={routePath} route={route}>
      {route === routePath ? (
        React.createElement(COMPONENTS[route])
      ) : route === '/' ? (
        <Logo
          showName={false}
          className="mt-2 max-w-none"
          style={{ width: 300 }}
        />
      ) : (
        <h2 style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {capitalize(route)}
        </h2>
      )}
    </GridItem>
  )

  return (
    <div className="flex flex-col h-screen">
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${topSize}vh`, minHeight: 90 }}
      >
        {APP_ROUTE_TILES.slice(0, 3).map(renderer)}
      </motion.div>
      <motion.div
        className="grid"
        initial={false}
        animate={{ height: `${bottomSize}vh`, minHeight: 90 }}
      >
        {APP_ROUTE_TILES.slice(3).map(renderer)}
      </motion.div>
    </div>
  )
}

const DIRECT_ROUTE_NAVIGATION = window ? window.location.search === '?ab' : null

const GridItem = ({ children, route, routePath }) => {
  const ref = useRef()
  const [scrollPos, setScrollPos] = useState(0)
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
      <motion.div
        className="absolute"
        key={renderChildren ? 'children' : 'h2'}
        style={{
          minWidth: renderChildren ? '80vw' : '',
          top: 10,
          left: 16,
          right: 16,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: DIRECT_ROUTE_NAVIGATION
            ? 1
            : route === '/' || activeRoute
            ? 1
            : 0,
        }}
        exit={{ opacity: 0 }}
      >
        {React.cloneElement(children, { scrollPos })}
      </motion.div>
    </AnimatePresence>
  )

  useEffect(() => {
    const setScroll = () => setScrollPos(ref.current.scrollTop)
    ref.current.addEventListener('scroll', setScroll)
    const _ref = ref.current
    return () => _ref.removeEventListener('scroll', setScroll)
  }, [ref])

  return (
    <>
      <motion.div
        ref={ref}
        className="grid-item layout-scrollbar"
        animate={{
          width: `${size}vw`,
          minWidth: 90,
          minHeight: 90,
          overflowY: route === routePath ? 'scroll' : 'hidden',
          overflowX: 'hidden',
        }}
        initial={false}
      >
        {result}
        <Link
          style={linkStyle}
          to={routePath === '/' ? route : DIRECT_ROUTE_NAVIGATION ? route : '/'}
        />
      </motion.div>
    </>
  )
}

const STATIC_ROUTES = ['/', 'faq']
