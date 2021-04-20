import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from '@reach/router'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const { posts: routePosts } = useRouteData()
  useEffect(() => {
    if (routePosts?.length > 0) setPosts(routePosts)
  }, [routePosts])
  return (
    <div>
      <h1>It's blog time.</h1>
      <div>
        <a href="#bottom" id="top">
          Scroll to bottom!
        </a>
      </div>
      <br />
      All Posts:
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <a href="#top" id="bottom">
        Scroll to top!
      </a>
    </div>
  )
}
