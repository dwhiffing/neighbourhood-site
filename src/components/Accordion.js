import React from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTE_TILES } from '../constants'

export const Accordion = ({ routePath, children }) =>
  APP_ROUTE_TILES.map((route) => (
    <AccordionItem routePath={routePath} route={route}>
      {children}
    </AccordionItem>
  ))

const AccordionItem = ({ children, route, routePath }) => {
  return (
    <>
      <Link to={route}>
        <motion.h2
          initial={false}
          style={{ padding: 20, borderBottom: '1px solid #004225' }}
        >
          {route[0].toUpperCase() + route.slice(1)}
        </motion.h2>
      </Link>

      <AnimatePresence initial={false}>
        {routePath === route && (
          <motion.section
            key="content"
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
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
