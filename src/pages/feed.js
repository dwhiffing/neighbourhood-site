import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { format } from 'date-fns'

const Feed = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('images')
  const { feed } = useRouteData()

  useEffect(() => {
    setData(feed)
  }, [feed])

  const images = data?.filter((i) => i.class === 'Image') || []
  const texts = data?.filter((i) => i.class === 'Text') || []

  return (
    <BasePage
      heading="Feed"
      links={[
        { label: 'Images', onClick: () => setFilter('images') },
        { label: 'Posts', onClick: () => setFilter('posts') },
      ]}
    >
      {filter === 'images'
        ? images.map((i) => <img alt={i.title} src={i.image.display.url} />)
        : filter === 'posts'
        ? texts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((i) => (
              <div className="mb-12">
                <span className="small">
                  {format(new Date(i.created_at), 'MMMM d yyyy')}
                </span>
                <h1>{i.generated_title}</h1>
              </div>
            ))
        : null}
    </BasePage>
  )
}

export default Feed
