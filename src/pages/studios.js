import React from 'react'
import { useSiteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { DetailedItem } from '../components/DetailedItem'
import { RichTextItem } from '../components/RichTextItem'

const Studios = ({ scrollPos }) => {
  const { studios, about } = useSiteData()
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
      heading="Studios"
      scrollPos={scrollPos}
      links={[
        ...studios?.map((studio, index) => ({
          label: studio.name,
          href: `#studio-${index + 1}`,
        })),
        { label: 'About', href: '#about' },
      ]}
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

      <div id="about" className="about rich-content mt-24">
        {about?.map((data, i) => {
          return <RichTextItem key={'about' + i} content={data?.content} />
        })}
      </div>
    </BasePage>
  )
}

export default Studios
