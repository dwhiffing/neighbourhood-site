import React from 'react'
import { Root } from 'react-static'
import { MotionConfig } from 'framer-motion'
import { AppRoutes } from './components/AppRoutes'
import { DEFAULT_TRANSITION } from './constants'
import './app.css'

const App = () => (
  <Root>
    <React.Suspense fallback={<em>Loading...</em>}>
      <MotionConfig transition={DEFAULT_TRANSITION}>
        <AppRoutes />
      </MotionConfig>
    </React.Suspense>
  </Root>
)

export default App
