import React from 'react'
import { useIsMobile } from '../useIsMobile'

export const BasePage = ({ heading = '', links = [], children }) => {
  const isMobile = useIsMobile()

  return (
    <div className="flex" style={{ minHeight: 1000 }}>
      {!isMobile && (
        <div className="flex flex-col items-start fixed" style={{ width: 230 }}>
          {heading ? <h2 className="mb-4">{heading}</h2> : null}

          {links.map((link, index) => (
            <a className="link" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div
        className="flex-1"
        style={{
          paddingLeft: isMobile ? 20 : 230,
          paddingRight: isMobile ? 20 : 230,
        }}
      >
        {children}
      </div>
    </div>
  )
}
