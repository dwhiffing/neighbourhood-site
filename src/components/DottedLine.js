import React from 'react'

export const DottedLine = ({ style = {}, ...props }) => (
  <div
    {...props}
    className="w-full"
    style={{
      height: 1,
      backgroundImage:
        'linear-gradient(to right, #004225 30%, rgba(255, 255, 255, 0) 0%)',
      backgroundPosition: 'top',
      backgroundSize: '6px 1px',
      backgroundRepeat: 'repeat-x',
    }}
  />
)
