import React from 'react'
import { Logo } from '../components/Logo'
import { useIsMobile } from '../useIsMobile'

const Index = () => {
  const mobile = useIsMobile()
  return (
    <div className="overflow-hidden">
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
          contact@neighbourhoodstudios.com
        </p>
      </div>
    </div>
  )
}

export default Index
