import React from 'react'
import { useSiteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { DetailedItem } from '../components/DetailedItem'

// TODO: need to add service content model that duplicates studio content model and use here
const Services = ({ scrollPos }) => {
  const { studios } = useSiteData()
  const [refs, setRefs] = React.useState([])

  React.useEffect(() => {
    setRefs((elRefs) =>
      Array(studios.length)
        .fill()
        .map((_, i) => elRefs[i] || React.createRef()),
    )
  }, [studios.length])

  return (
    <BasePage
      heading="Services"
      scrollPos={scrollPos}
      links={studios?.map((studio, index) => ({
        label: studio.name,
        href: `#studio-${index + 1}`,
      }))}
    >
      {studios?.map((studio, index) => (
        <DetailedItem
          ref={refs[index]}
          key={'studio' + index}
          name={studio.name}
          images={studio.images}
          index={index}
          links={studio.links}
          sections={[
            { label: 'Space', items: studio.space },
            { label: 'Specs', items: studio.specs },
          ]}
        />
      ))}
    </BasePage>
  )
}

export default Services
