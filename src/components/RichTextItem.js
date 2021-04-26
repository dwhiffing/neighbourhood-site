import React from 'react'

import { BLOCKS } from '@contentful/rich-text-types'
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
        className="my-12"
      />
    ),
    [BLOCKS.HR]: (node) => <DottedLine className="my-20" />,
    [BLOCKS.HEADING_2]: (node) => {
      const label = node.content[0].value
      return <h2 id={kebabCase(label)}>{label}</h2>
    },
  },
}
