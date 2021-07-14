import React from 'react'
import Helmet from 'react-helmet'
import { useSiteData } from 'react-static'

export const Head = ({ title = 'Neighbourhood' }) => {
  const { services } = useSiteData()

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={services[0].name} />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
      <meta property="og:site_name" content="" />
      <meta property="og:locale" content="" />
      <meta property="og:type" content="" />
    </Helmet>
  )
}
