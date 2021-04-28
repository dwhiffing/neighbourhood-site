import React from 'react'
import { Link } from '@reach/router'
import { APP_ROUTE_TILES } from '../constants'
import { Logo } from './Logo'

export const Accordion = ({ routePath, children }) =>
  APP_ROUTE_TILES.map((route, index) => (
    <AccordionItem key={`route-${index}`} routePath={routePath} route={route}>
      {children}
    </AccordionItem>
  ))

const AccordionItem = ({ children, route, routePath }) => {
  return (
    <>
      <Link to={route}>
        <h2
          initial={false}
          className={`p-5 border-green ${
            route === routePath && route !== '/' ? '' : 'border-b'
          }`}
        >
          {route !== '/' ? (
            route[0].toUpperCase() + route.slice(1)
          ) : (
            <Logo style={{ marginTop: 10 }} />
          )}
        </h2>
      </Link>

      {routePath === route && children && (
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
