import React from 'react'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { DottedLine } from '../components/DottedLine'
import { kebabCase } from 'lodash'

export const RichTextItem = ({ content }) => {
  return documentToReactComponents(content, dtrOptions)
}

const dtrOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={node.data?.target?.fields?.file?.url}
        alt={node.data?.target?.fields?.title}
        className="my-10"
      />
    ),
    [BLOCKS.HR]: (node) => <DottedLine className="my-20" />,
    [BLOCKS.HEADING_2]: (node) => {
      const label = node.content[0].value
      return <h2 id={kebabCase(label)}>{label}</h2>
    },
    [BLOCKS.QUOTE]: (node) => {
      console.log(node)
      return (
        <h2 className="font-serif ml-24 my-14 text-xl">
          {node.content[0].content[0].value}
        </h2>
      )
    },
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.indexOf('youtube.com') !== -1) {
        return (
          <div className="my-10">
            <iframe
              id="ytplayer"
              title="ytplayer"
              src={node.data.uri}
              type="text/html"
              width="640"
              height="360"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture ; fullscreen"
            />
          </div>
        )
      } else
        return (
          <a href={node.data.uri} target="_blank" rel="noreferrer">
            {node.content[0].value}
          </a>
        )
    },
  },
}
