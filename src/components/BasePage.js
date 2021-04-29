import React, { forwardRef } from 'react'
import { useIsMobile } from '../useIsMobile'

export const BasePage = forwardRef(
  (
    {
      heading = '',
      links = [],
      linkComponent,
      children,
      className = '',
      scrollPos,
    },
    ref,
  ) => {
    const isMobile = useIsMobile()

    let activeSection = 0
    if (Array.isArray(children))
      children.slice(1).forEach((c, i) => {
        const offset = c.ref?.current?.offsetTop || 0
        if (scrollPos > offset) activeSection = i + 1
      })

    return (
      <div className="flex">
        {!isMobile &&
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
            className={`layout-scrollbar max-w-3xl lg:ml-40 xl:ml-0 ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    )
  },
)
