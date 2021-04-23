import React from 'react'

import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const RichTextItem = ({ content }) => {
  return documentToReactComponents(content, dtrOptions)
}

const dtrOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={node.data?.target?.fields?.file?.url}
        alt={node.data?.target?.fields?.title}
      />
    ),
  },
}
