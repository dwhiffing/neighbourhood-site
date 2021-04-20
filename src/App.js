import React from 'react'
import { Root, Routes } from 'react-static'
import { Link, Router } from '@reach/router'
import './app.css'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

function App() {
  return (
    <Root>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <MotionConfig>
            <Router>
              <Routes
                path="*"
                render={({ routePath, getComponentForPath }) => {
                  const element = getComponentForPath(routePath)

                  if (true) {
                    return (
                      <GridRoutes routePath={routePath}>{element}</GridRoutes>
                    )
                  }

                  return (
                    <AccordionRoutes routePath={routePath}>
                      {element}
                    </AccordionRoutes>
                  )
                }}
              />
            </Router>
          </MotionConfig>
        </React.Suspense>
      </div>
    </Root>
  )
}

export default App

const Accordion = ({ children, route, routePath }) => {
  const isOpen = routePath === route

  return (
    <>
      <Link to={route}>
        <motion.header initial={false}>
          <span>{route}</span>
        </motion.header>
      </Link>
      <AnimatePresence initial={false}>
        {isOpen && (
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

const AccordionRoutes = ({ routePath, children }) => {
  return routes.map((route) => (
    <Accordion routePath={routePath} route={route}>
      {children}
    </Accordion>
  ))
}

const GridItem = ({ children, route, routePath }) => {
  return (
    <>
      <motion.div
        layout
        className="grid-item"
        initial={{
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
        }}
      >
        <motion.div layout="position">
          <Link to={route}>
            <span>{route}</span>
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}

const GridRoutes = ({ routePath, children }) => {
  const routeIndex = routes.findIndex((r) => r === routePath)
  let gridTemplateColumns = `auto auto auto`
  let gridTemplateRows = `auto auto`
  const c = `88%`
  if (routeIndex === 1) {
    gridTemplateColumns = `auto ${c} auto`
    gridTemplateRows = `${c} auto`
  }
  if (routeIndex === 2) {
    gridTemplateColumns = `auto auto ${c}`
    gridTemplateRows = `${c} auto`
  }
  if (routeIndex === 3) {
    gridTemplateColumns = `${c} auto auto`
    gridTemplateRows = `auto ${c}`
  }
  if (routeIndex === 4) {
    gridTemplateColumns = `auto ${c} auto`
    gridTemplateRows = `auto ${c}`
  }
  if (routeIndex === 5) {
    gridTemplateColumns = `auto auto ${c}`
    gridTemplateRows = `auto ${c}`
  }
  return (
    <motion.div
      className="grid"
      style={{ gridTemplateColumns, gridTemplateRows }}
    >
      {routes.map((route) => (
        <GridItem routePath={routePath} route={route}>
          {children}
        </GridItem>
      ))}
    </motion.div>
  )
}

const routes = ['/', 'studios', 'equipment', 'about', 'feed', 'shop']
