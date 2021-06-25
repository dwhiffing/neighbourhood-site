import React from 'react'
import { useSiteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { DetailedItem } from '../components/DetailedItem'

const Services = ({ scrollPos }) => {
  const { services } = useSiteData()
  const [refs, setRefs] = React.useState([])

  React.useEffect(() => {
    setRefs((elRefs) =>
      Array(services.length)
        .fill()
        .map((_, i) => elRefs[i] || React.createRef()),
    )
  }, [services.length])

  return (
    <BasePage
      heading="Services"
      scrollPos={scrollPos}
      links={services?.map((service, index) => ({
        label: service.name,
        href: `#service-${index + 1}`,
      }))}
    >
      {services?.map((service, index) => (
        <DetailedItem
          ref={refs[index]}
          key={'service' + index}
          type="service"
          name={service.name}
          images={service.images}
          index={index}
          links={service.links}
          sections={[
            { label: 'Space', items: service.space },
            { label: 'Specs', items: service.specs },
          ]}
        />
      ))}
    </BasePage>
  )
}

export default Services
