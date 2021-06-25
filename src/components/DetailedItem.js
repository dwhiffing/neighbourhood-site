import React, { forwardRef } from 'react'
import { DottedLine } from '../components/DottedLine'
import { Carousel } from '../components/Carousel'

export const DetailedItem = forwardRef(
  ({ name, images, index, type = 'studio', sections, links }, ref) => {
    return (
      <div ref={ref} id={`${type}-${index + 1}`} className="pt-2">
        <h1 className="mt-8 mb-5">{name}</h1>

        <div className="flex mb-8">
          {links?.map((link, i) => (
            <button
              key={'tag' + i}
              className="mr-2"
              onClick={() => window.open(link.fields.url, '_blank')}
            >
              {link.fields.label}
            </button>
          ))}
        </div>

        <Carousel images={images} />

        <div className="flex">
          {sections
            .filter((s) => !!s.items)
            .map((section, index) => (
              <div
                key={section.label}
                className={`flex-1 ${index === 0 ? 'mr-10' : ''}`}
              >
                <h2>{section.label}</h2>
                <ul>
                  {section.items?.map((item, i) => (
                    <li key={section.label + i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <DottedLine className="mt-12 mb-6" />
      </div>
    )
  },
)
