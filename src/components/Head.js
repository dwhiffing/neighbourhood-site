import React from 'react'
import Helmet from 'react-helmet'
import { useSiteData } from 'react-static'

export const Head = ({ route }) => {
  const { seoFields } = useSiteData()
  const { description, title } = seoFields.find(
    (field) => field.route === route,
  ) || { title: 'Neighbourhood', description: 'Neighbourhood Studios' }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" cotent={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta
        property="og:image"
        content={'https://neighbourhoodstudios.com/socialshare.jpeg'}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
