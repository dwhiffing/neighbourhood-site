import React, { useEffect, useRef, useState } from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTE_TILES, EXPENDABLES_LINK } from '../constants'
import Studios from '../pages/studios'
import Index from '../pages/index'
import Services from '../pages/services'
import Equipment from '../pages/equipment'
import Feed from '../pages/feed'
import { Logo } from './Logo'

const COMPONENTS = {
  studios: Studios,
  '/': Index,
  services: Services,
  feed: Feed,
  equipment: Equipment,
  expendables: () => null,
}

const capitalize = (route) => route[0].toUpperCase() + route.slice(1)
export const Grid = ({ routePath, children }) => {
  let id
  let basePath = routePath
  if (routePath.length > 1 && routePath.includes('/')) {
    const split = routePath.split('/')
    basePath = split[0]
    id = split[1]
  }
  const routeIndex = APP_ROUTE_TILES.findIndex((r) => r === basePath)
  const topSize = STATIC_ROUTES.includes(basePath)
    ? '50'
    : routeIndex < 3
    ? '95'
    : '5'
  const bottomSize = STATIC_ROUTES.includes(basePath)
    ? '50'
    : routeIndex >= 3
    ? '95'
    : '5'

  const renderer = (route) => (
    <GridItem key={route} routePath={basePath} route={route}>
      {route === basePath ? (
        React.createElement(COMPONENTS[route], { id })
      ) : route === '/' ? (
        <Logo
          showName={false}
          className="mt-3 ml-1 max-w-none"
          style={{ width: 300, height: 45 }}
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

const DIRECT_ROUTE_NAVIGATION =
  typeof document !== 'undefined' ? window.location.search === '?ab' : null

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
          bottom: 16,
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

  useEffect(() => {
    if (routePath === 'feed') ref.current.scrollTop = 0
  }, [children, routePath])

  const LinkComponent = route === 'expendables' ? 'div' : Link

  return (
    <>
      <motion.div
        ref={ref}
        className="grid-item layout-scrollbar"
        initial={false}
        animate={{
          width: `${size}vw`,
          minWidth: 85,
          minHeight: 90,
          overflowY: route === routePath ? 'scroll' : 'hidden',
          overflowX: 'hidden',
        }}
      >
        {result}

        <LinkComponent
          style={linkStyle}
          className="cursor-pointer"
          onClick={() =>
            route === 'expendables' && window.open(EXPENDABLES_LINK)
          }
          to={routePath === '/' ? route : DIRECT_ROUTE_NAVIGATION ? route : '/'}
        />
      </motion.div>
    </>
  )
}

const STATIC_ROUTES = ['/', 'faq']
