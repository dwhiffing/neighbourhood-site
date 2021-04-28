import React from 'react'
import { Logo } from '../components/Logo'

const Index = () => {
  return (
    <div className="overflow-hidden">
      <div className="hidden lg:block py-1">
        <Logo style={{ height: 52 }} />
        <p className="font-serif whitespace-nowrap keep-all mt-4">
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
