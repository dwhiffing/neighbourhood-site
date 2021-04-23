import React from 'react'

export const BasePage = ({ heading = '', links = [], children }) => (
  <div className="flex" style={{ minHeight: 1000 }}>
    <div className="flex flex-col items-start fixed" style={{ width: 230 }}>
      {heading ? <h2 className="mb-4">{heading}</h2> : null}

      {links.map((link, index) => (
        <a className="link" href={link.href}>
          {link.label}
        </a>
      ))}
    </div>

    <div className="flex-1" style={{ paddingLeft: 230, paddingRight: 230 }}>
      {children}
    </div>
  </div>
)
