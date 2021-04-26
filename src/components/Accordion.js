import React from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTE_TILES } from '../constants'
import logo from '../assets/logo2.png'

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
            <img
              alt="Neighbourhood Studios"
              src={logo}
              style={{ height: 52, marginTop: 10 }}
            />
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
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {children}
        </section>
      )}
    </>
  )
}
