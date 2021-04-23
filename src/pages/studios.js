import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'

const Studios = () => {
  const [studios, setStudios] = useState([])
  const { studios: studiosData } = useRouteData()
  useEffect(() => {
    setStudios(studiosData)
  }, [studiosData])

  return (
    <div className="flex" style={{ minHeight: 1000 }}>
      <div className="flex flex-col" style={{ width: 200 }}>
        <p>Studios</p>
        {studios?.map((studio, index) => (
          <a href={`#studio-${index + 1}`}>{studio.name}</a>
        ))}
      </div>
      <div className="flex-1">
        {studios?.map((studio, index) => (
          <StudioItem studio={studio} index={index} />
        ))}
      </div>
    </div>
  )
}

const StudioItem = ({ studio, index }) => {
  return (
    <div id={`studio-${index + 1}`}>
      <p>{studio.name}</p>
      {studio.tags.map((tag) => (
        <p>{tag}</p>
      ))}
      {studio.images.map((image) => (
        <img alt="Studio" src={`http:${image.fields.file.url}`} />
      ))}
      {studio.space.map((space) => (
        <p>{space}</p>
      ))}
      {studio.specs.map((spec) => (
        <p>{spec}</p>
      ))}
    </div>
  )
}

export default Studios
