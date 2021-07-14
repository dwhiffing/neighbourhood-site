import React from 'react'
import { Logo } from '../components/Logo'
import { useIsMobile } from '../useIsMobile'
import { Head } from '../components/Head'
import { useSiteData } from "react-static"

export const IndexLayout = ({ mobile = false }) => {
  return (
    <div className="overflow-hidden">
      <div className="py-1">
        {!mobile && <Logo className="mt-1 ml-1" style={{ height: 52 }} />}
        <p
          className={`font-serif whitespace-nowrap keep-all ${mobile ? '' : 'mt-4'
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
  )
}


const Index = () => {
  let { seoFields } = useSiteData()
  const mobile = useIsMobile()

  return (
    <>
      <Head {...seoFields.find(fields => fields.route == "/")} />
      <IndexLayout mobile={mobile} />
    </>
  )
}

export default Index
