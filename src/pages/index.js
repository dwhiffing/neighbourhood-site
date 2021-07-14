import React from 'react'
import { Logo } from '../components/Logo'
import { useIsMobile } from '../useIsMobile'
import { Head } from '../components/Head'

const Index = () => {
  const mobile = useIsMobile()
  return (
    <React.Suspense fallback={<div>Loading... </div>}>
      <div className="overflow-hidden">
        <Head route="/" />

        <div className="py-1">
          {!mobile && <Logo className="mt-1 ml-1" style={{ height: 52 }} />}
          <p
            className={`font-serif whitespace-nowrap keep-all ${
              mobile ? '' : 'mt-4'
            }`}
          >
            24 McGee Street
            <br />
            Toronto, ON M4M 2K9
            <br />
            +1 647 748 0155
            <br />
            info@neighbourhoodstudios.com
          </p>
        </div>
      </div>
    </React.Suspense>
  )
}

export default Index
