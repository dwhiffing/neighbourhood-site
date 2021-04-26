import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'

import { BasePage } from '../components/BasePage'
import { RichTextItem } from '../components/RichTextItem'

const About = () => {
  const [data, setData] = useState([])
  const { about } = useRouteData()
  useEffect(() => {
    setData(about)
  }, [about])

  return (
    <BasePage links={[{ href: '#', label: 'About' }]}>
      <div className="about rich-content">
        {data?.map((data, i) => {
          return <AboutItem key={'about' + i} data={data} />
        })}
      </div>
    </BasePage>
  )
}

const AboutItem = ({ data }) => {
  return <RichTextItem content={data?.content} />
}

export default About
