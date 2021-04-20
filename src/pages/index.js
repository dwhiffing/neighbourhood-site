import React from 'react'
import logo from '../assets/logo2.png'

const Index = () => (
  <div style={{ overflow: 'hidden' }}>
    <img alt="Neighbourhood Studios" src={logo} style={{ height: 60 }} />
    <p style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>
      24 McGee Street Toronto,
      <br />
      ON M4M 2K9 +1 647 748 0155
      <br />
      contact@neighbourhoodstudios.com
    </p>
  </div>
)

export default Index
