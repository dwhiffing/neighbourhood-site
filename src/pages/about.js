import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'

import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const About = () => {
  const [data, setData] = useState([])
  const { about } = useRouteData()
  useEffect(() => {
    setData(about)
  }, [about])

  return (
    <div style={{ minHeight: 1000 }}>
      <AboutItem data={data} />
    </div>
  )
}

const AboutItem = ({ data }) => {
  return documentToReactComponents(data?.content, dtrOptions)
}

export default About

const dtrOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={node.data?.target?.fields?.file?.url}
        alt={node.data?.target?.fields?.title}
      />
    ),
  },
}
