import React from 'react'
import { Logo } from '../components/Logo'
import { useIsMobile } from '../useIsMobile'
import { Head } from "../components/Head"
import { useSiteData } from 'react-static'

const Index = () => {
  const mobile = useIsMobile()
  // const { seoFields } = useSiteData()
  return (
    <>
      <div className="overflow-hidden">

        {/* <Head {...seoFields.find(field => field.route == "/")} /> */}
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
    </>
  )
}

export default Index
