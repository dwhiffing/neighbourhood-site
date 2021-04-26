import React from 'react'
import { useIsMobile } from '../useIsMobile'

export const BasePage = ({
  heading = '',
  links = [],
  linkComponent,
  children,
}) => {
  const isMobile = useIsMobile()

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
              <a className="link" href={link.href} onClick={link.onClick}>
                {link.label}
              </a>
            ))}
          </div>
        ))}

      <div className="flex flex-1 justify-center">
        <div className="layout-scrollbar max-w-3xl lg:ml-40  xl:ml-0">
          {children}
        </div>
      </div>
    </div>
  )
}
