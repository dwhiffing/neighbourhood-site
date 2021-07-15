import React from 'react'
import { Link } from '@reach/router'
import { APP_ROUTE_TILES, EXPENDABLES_LINK } from '../constants'
import { Logo } from './Logo'
import { getComponentForPath } from './Grid'

export const Accordion = ({ routePath }) => {
  return APP_ROUTE_TILES.map((route, index) => (
    <AccordionItem key={`route-${index}`} routePath={routePath} route={route}>
      {getComponentForPath(route, routePath)}
    </AccordionItem>
  ))
}

const AccordionItem = ({ children, route, routePath }) => {
  const LinkComponent = route === 'expendables' ? 'div' : Link
  return (
    <>
      <LinkComponent
        className="cursor-pointer"
        onClick={() => route === 'expendables' && window.open(EXPENDABLES_LINK)}
        to={routePath !== '/' ? '/' : route}
      >
        <h2
          initial={false}
          className={`p-5 border-green ${
            route === routePath ? '' : 'border-b'
          }`}
        >
          {route !== '/' ? (
            route[0].toUpperCase() + route.slice(1)
          ) : (
            <Logo style={{ marginTop: 10, height: 50 }} />
          )}
        </h2>
      </LinkComponent>

      {routePath.includes(route) && children && (
        <section
          key="content"
          className="px-5"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
        >
          {children}
        </section>
      )}
    </>
  )
}
