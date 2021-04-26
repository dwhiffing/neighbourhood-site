import React, { useEffect, useState } from 'react'
import logo from '../assets/logo2.png'
import { useRouteData } from 'react-static'

const Index = () => {
  const [data, setData] = useState([])
  const { faq } = useRouteData()

  useEffect(() => {
    setData(faq)
  }, [faq])

  return (
    <div className="overflow-hidden py-5">
      <img alt="Neighbourhood Studios" src={logo} style={{ height: 60 }} />
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
  )
}

export default Index
