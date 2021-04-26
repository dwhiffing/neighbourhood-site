import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'
import { DottedLine } from '../components/DottedLine'
import { BasePage } from '../components/BasePage'

const Studios = () => {
  const [studios, setStudios] = useState([])
  const { studios: studiosData } = useRouteData()
  useEffect(() => {
    setStudios(studiosData)
  }, [studiosData])

  return (
    <BasePage
      heading="Studios"
      links={studios?.map((studio, index) => ({
        label: studio.name,
        href: `#studio-${index + 1}`,
      }))}
    >
      {studios?.map((studio, index) => (
        <StudioItem studio={studio} index={index} />
      ))}
    </BasePage>
  )
}

const StudioItem = ({ studio, index }) => {
  return (
    <div id={`studio-${index + 1}`}>
      <h1 className="mt-8 mb-5">{studio.name}</h1>

      <div className="flex mb-8">
        {studio.tags.map((tag) => (
          <button className="mr-2">{tag}</button>
        ))}
      </div>

      <div className="flex flex-col mb-8">
        <div className="flex mb-5">
          {studio.images.map((image) => (
            <img alt="Studio" src={`http:${image.fields.file.url}`} />
          ))}
        </div>

        <div className="flex">
          {studio.images.map((image) => (
            <div className="flex-1 bg-green" style={{ height: 3 }} />
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="flex-1">
          <h2>Space</h2>
          <ul>
            {studio.space.map((space) => (
              <li>{space}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h2>Specs</h2>
          <ul>
            {studio.specs.map((spec) => (
              <li>{spec}</li>
            ))}
          </ul>
        </div>
      </div>

      <DottedLine className="my-12" />
    </div>
  )
}

export default Studios
