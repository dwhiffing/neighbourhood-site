import React from 'react'
import { Link } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_ROUTES } from '../constants'

export const Accordion = ({ routePath, children }) =>
  APP_ROUTES.map((route) => (
    <AccordionItem routePath={routePath} route={route}>
      {children}
    </AccordionItem>
  ))

const AccordionItem = ({ children, route, routePath }) => (
  <>
    <Link to={route}>
      <motion.header initial={false}>
        <h2>{route}</h2>
      </motion.header>
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
