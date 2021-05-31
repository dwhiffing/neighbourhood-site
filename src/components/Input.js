import React from 'react'

export const Input = ({
  label,
  source,
  className = '',
  placeholder = '',
  formState = {},
  setFormState = () => {},
  ...props
}) => (
  <div className={`flex flex-col ${className}`} {...props}>
    <label>{label}</label>
    <input
      onChange={(e) => {
        const value = e.target.value
        setFormState((fs) => ({ ...fs, [source]: value }))
      }}
      value={formState[source] ? formState[source] : ''}
      placeholder={placeholder}
      name={source}
    />
  </div>
)

export const Textarea = ({
  label,
  source,
  className,
  placeholder = '',
  formState = {},
  setFormState = () => {},
  ...props
}) => (
  <div className={`flex flex-col ${className}`} {...props}>
    <label>{label}</label>
    <textarea
      onChange={(e) => {
        const value = e.target.value
        setFormState((fs) => ({ ...fs, [source]: value }))
      }}
      value={formState[source] ? formState[source] : ''}
      placeholder={placeholder}
      name={source}
    />
  </div>
)
