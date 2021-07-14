import React, { forwardRef } from 'react'
import { useContainerWidth } from '../useIsMobile'
import { Head } from './Head'

export const BasePage = forwardRef(
  (
    {
      heading = '',
      title = '',
      links = [],
      linkComponent,
      children,
      className = '',
      scrollPos,
      pageSize = 'max-w-3xl',
    },
    ref,
  ) => {
    const width = useContainerWidth()

    let activeSection = 0
    if (Array.isArray(children))
      children
        .flat()
        .slice(1)
        .forEach((c, i) => {
          const offset = c.ref?.current?.offsetTop || 0
          if (c.ref?.current && scrollPos > offset) activeSection = i + 1
        })

    return (
      <div className="flex pb-20">
        <Head title={title || heading} />

        {width > 900 &&
          (linkComponent || (
            <div
              className="flex flex-col items-start fixed"
              style={{ width: 230 }}
            >
              {heading ? <h2 className="mb-4">{heading}</h2> : null}

              {links.map((link, index) => (
                <a
                  key={link.label}
                  className={`link${
                    index === activeSection ? ' link-active' : ''
                  }`}
                  href={link.href}
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

        <div className="flex flex-1 justify-center">
          <div
            ref={ref}
            className={`layout-scrollbar ${pageSize} ${
              width > 900 && width < 1600 ? 'ml-40' : ''
            } ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    )
  },
)
