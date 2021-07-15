import React, { useState } from 'react'
import { BasePage } from '../components/BasePage'
import { Link } from '@reach/router'
import uniq from 'lodash/uniq'
import { RichTextItem } from '../components/RichTextItem'
import { useSiteData } from 'react-static'

const Feed = ({ id }) => {
  const { posts } = useSiteData()

  const [filter, setFilter] = useState()
  const postTags = uniq(posts.map((i) => i.tag))
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({
      label: tag,
      onClick: () => setFilter(tag),
    }))
  const tags = [
    { label: 'Everything', onClick: () => setFilter() },
    ...postTags,
  ]

  return (
    <BasePage
      route="/feed"
      className="flex-1"
      heading="Feed"
      linkComponent={
        <div className="flex flex-col items-start fixed" style={{ width: 230 }}>
          <Link to="/feed">
            <h2 className="mb-4">{id ? '< Feed' : 'Feed'}</h2>
          </Link>

          {id
            ? null
            : tags.map((link, index) => (
                <SidebarLink
                  key={link.label}
                  filter={filter}
                  index={index}
                  label={link.label}
                  onClick={link.onClick}
                />
              ))}
        </div>
      }
    >
      {id ? (
        <Post item={posts.find((i) => i.id === id)} />
      ) : (
        <PostList items={posts} filter={filter} />
      )}
    </BasePage>
  )
}

export default Feed

const SidebarLink = ({ label, index, filter, href, onClick }) => (
  <a
    key={label}
    className={`link${
      (index === 0 ? !filter : filter === label.toLowerCase())
        ? ' link-active'
        : ''
    }`}
    href={href}
    onClick={onClick}
  >
    {label}
  </a>
)

const Post = ({ item }) =>
  item ? (
    <div>
      <div className="mt-2 mb-3">
        <span className="small">{item.tag}</span>
      </div>
      <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
      <RichTextItem content={item.content} />
    </div>
  ) : null

const PostList = ({ items, filter }) => (
  <div className="mt-16">
    {items
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .filter((item) => !filter || item.tag === filter)
      .map((item) => {
        return (
          <Link
            key={item.id}
            className="flex flex-1 flex-col mb-20"
            to={`/feed/${item.id}`}
          >
            <div className="flex flex-col md:flex-row md:items-end mb-1">
              <span className="small mr-16 mb-2">{item.tag}</span>

              <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
            </div>

            <img
              alt="blog_image"
              src={`${item.previewImage.fields.file.url}?w=1024`}
            />
          </Link>
        )
      })}
  </div>
)
