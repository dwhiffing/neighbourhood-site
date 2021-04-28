import React, { useState } from 'react'
import { useSiteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { format } from 'date-fns'

const Feed = () => {
  const { feed } = useSiteData()
  const [filter, setFilter] = useState('images')

  const images = feed?.filter((i) => i.class === 'Image') || []
  const texts = feed?.filter((i) => i.class === 'Text') || []

  return (
    <BasePage
      className="flex-1"
      heading="Feed"
      linkComponent={
        <div className="flex flex-col items-start fixed" style={{ width: 230 }}>
          <h2 className="mb-4">Feed</h2>

          {[
            { label: 'Images', onClick: () => setFilter('images') },
            { label: 'Posts', onClick: () => setFilter('posts') },
          ].map((link, index) => (
            <a
              key={link.label}
              className="link"
              href={link.href}
              onClick={link.onClick}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex items-center justify-center">
            <svg
              width="27"
              height="16"
              viewBox="0 0 27 16"
              fill="none"
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.7395 11.2118L22.9965 8.26593C22.7674 8.08613 22.7674 7.79089 22.9965 7.61055L26.7396 4.66536C26.9695 4.4852 27.0655 4.18079 26.9533 3.9893C26.8409 3.79835 26.5271 3.73038 26.2567 3.83827L21.8057 5.61365C21.5352 5.72261 21.2802 5.57409 21.2396 5.28461L20.5703 0.526105C20.529 0.236801 20.3118 0 20.0868 0C19.8629 0 19.6458 0.236801 19.6056 0.525925L18.9359 5.28479C18.895 5.57427 18.6404 5.72243 18.3694 5.61383L13.9921 3.86793C13.7207 3.75969 13.2784 3.75969 13.0077 3.86793L8.62965 5.61383C8.35889 5.72243 8.10394 5.57427 8.06336 5.28479L7.39456 0.525925C7.35326 0.236801 7.13637 0 6.9123 0C6.68751 0 6.47008 0.236801 6.42968 0.525925L5.75998 5.28479C5.7194 5.57427 5.46463 5.72243 5.19387 5.61383L0.743129 3.83881C0.472554 3.73038 0.159248 3.79871 0.0468527 3.98948C-0.065363 4.18115 0.0303346 4.48574 0.259434 4.66554L4.00295 7.61072C4.23223 7.79107 4.23223 8.08631 4.00295 8.26629L0.259434 11.2118C0.0296164 11.392 -0.0655425 11.7146 0.0464936 11.9282C0.159068 12.1421 0.472375 12.2281 0.74259 12.1195L5.15348 10.3455C5.42459 10.2371 5.67667 10.3847 5.71455 10.6742L6.35086 15.4743C6.38928 15.7632 6.64137 15.9998 6.91104 15.9998C7.18036 15.9998 7.43262 15.7634 7.47122 15.4743L8.10861 10.6742C8.14631 10.3847 8.39947 10.2373 8.66915 10.3455L13.0077 12.0893C13.2781 12.1982 13.7205 12.1982 13.991 12.0893L18.3289 10.3455C18.5989 10.2371 18.8513 10.3847 18.8899 10.6742L19.5273 15.4743C19.5654 15.7632 19.8176 15.9998 20.0866 15.9998C20.3563 15.9998 20.6085 15.7634 20.6468 15.4743L21.2842 10.6742C21.323 10.3847 21.575 10.2373 21.8451 10.3455L26.2565 12.1195C26.5258 12.2281 26.84 12.142 26.9524 11.9283C27.065 11.7151 26.9693 11.3925 26.7396 11.2124L26.7395 11.2118ZM17.2164 8.30333L13.9199 10.8449C13.6892 11.0229 13.3108 11.0229 13.0808 10.8449L9.78323 8.30333C9.55269 8.12532 9.55089 7.83224 9.77964 7.65154L13.0833 5.04565C13.312 4.86494 13.6871 4.86494 13.916 5.04565L17.2196 7.65154C17.4489 7.83206 17.4471 8.12514 17.216 8.30351L17.2164 8.30333Z"
                fill="#004225"
              />
            </svg>
            <p className="small">Via Are.na</p>
          </div>
        </div>
      }
    >
      {filter === 'images' ? (
        <div className="flex flex-wrap">
          {images.map((i) => (
            <a
              key={i.id}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center mb-40"
              style={{ width: '33%' }}
              href={`https://www.are.na/block/${i.id}`}
            >
              <img className="pl-4" alt={i.title} src={i.image.display.url} />
            </a>
          ))}
        </div>
      ) : filter === 'posts' ? (
        <div className="flex flex-1 flex-col" style={{ minWidth: 640 }}>
          {texts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((i) => (
              <div key={i.id} className="mb-12">
                <span className="small">
                  {format(new Date(i.created_at), 'MMMM d yyyy')}
                </span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.are.na/block/${i.id}`}
                >
                  <h1 dangerouslySetInnerHTML={{ __html: i.content }} />
                </a>
              </div>
            ))}
        </div>
      ) : null}
    </BasePage>
  )
}

export default Feed
