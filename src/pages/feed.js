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
      className="max-w-max flex-1"
      heading="Feed"
      links={[
        { label: 'Images', onClick: () => setFilter('images') },
        { label: 'Posts', onClick: () => setFilter('posts') },
      ]}
    >
      {filter === 'images' ? (
        <div className="flex flex-wrap md:mx-40">
          {images.map((i) => (
            <div
              className="flex justify-center items-center mb-40"
              style={{ width: '33%' }}
            >
              <img className="pl-4" alt={i.title} src={i.image.display.url} />
            </div>
          ))}
        </div>
      ) : filter === 'posts' ? (
        <div className="flex flex-1 flex-col" style={{ minWidth: 640 }}>
          {texts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((i) => (
              <div className="mb-12">
                <span className="small">
                  {format(new Date(i.created_at), 'MMMM d yyyy')}
                </span>
                <h1>{i.generated_title}</h1>
              </div>
            ))}
        </div>
      ) : null}
    </BasePage>
  )
}

export default Feed
