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
      {data?.map((data) => {
        return <AboutItem data={data} />
      })}
    </BasePage>
  )
}

const AboutItem = ({ data }) => {
  return <RichTextItem content={data?.content} />
}

export default About
