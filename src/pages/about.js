import React from 'react'
import { useSiteData } from 'react-static'

import { BasePage } from '../components/BasePage'
import { RichTextItem } from '../components/RichTextItem'

const About = () => {
  const { about } = useSiteData()

  return (
    <BasePage links={[{ href: '#', label: 'About' }]}>
      <div className="about rich-content">
        {about?.map((data, i) => {
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
