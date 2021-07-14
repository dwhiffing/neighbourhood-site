import React from 'react'
import { Root } from 'react-static'
import { MotionConfig } from 'framer-motion'
import { AppRoutes, Loading } from './components/AppRoutes'
import { DEFAULT_TRANSITION } from './constants'
import './app.css'

const App = () => (
  <Root>
    {/* <React.Suspense fallback={<Loading />}> */}
    {/* Temporarily removing Loading fallback, since there are Suspense Issues on <Grid /> for the index. Since the site will be statically compiled, perhaps this won't be an issue?  */}
    <React.Suspense fallback={<div></div>}>
      <MotionConfig transition={DEFAULT_TRANSITION}>
        <AppRoutes />
      </MotionConfig>
    </React.Suspense>
  </Root>
)

export default App
