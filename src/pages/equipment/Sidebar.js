import React from 'react'

// TODO: need to handle sub/subcategories
export function Sidebar({
  categories = {},
  brands = [],
  category,
  setCategory,
  subCategory,
  setSubCategory,
  subSubCategory,
  setSubSubCategory,
  brand,
  setBrand,
  query,
  setQuery,
}) {
  const categoryNames = Object.keys(categories)
  let subCategories = []
  let subSubCategories = []

  if (category) {
    subCategories = Object.keys(categories[category])
    if (categories[category] && subCategory) {
      subSubCategories = Object.keys(categories[category][subCategory] || {})
    }
  }

  return (
    <div className="fixed" style={{ marginLeft: 4 }}>
      <h2 className="mb-4">Equipment</h2>

      <div className="flex flex-col items-start">
        <p style={{ fontSize: 12, marginTop: 20 }}>Category</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ maxHeight: 370, width: 200 }}
        >
          {categoryNames.map((c) => (
            <>
              <Link
                label={c}
                key={c}
                active={category === c}
                onClick={() => {
                  setCategory(c)
                  setBrand('')
                  setSubCategory('')
                  setSubSubCategory('')
                }}
              />

              {c === category &&
                subCategories.map((s) => (
                  <>
                    <Link
                      label={s}
                      key={s}
                      active={subCategory === s}
                      onClick={() => {
                        setCategory(c)
                        setSubCategory(s)
                        setSubSubCategory('')
                      }}
                      style={{ marginLeft: 12 }}
                    />
                    {s === subCategory && (
                      <>
                        {subSubCategories.map((ss) => (
                          <Link
                            label={ss}
                            key={ss}
                            style={{ marginLeft: 24 }}
                            active={subSubCategory === ss}
                            onClick={() => {
                              setCategory(c)
                              setSubCategory(s)
                              setSubSubCategory(ss)
                            }}
                          />
                        ))}
                      </>
                    )}
                  </>
                ))}
            </>
          ))}
        </div>

        <p style={{ fontSize: 12, marginTop: 30 }}>Brands</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ maxHeight: 370, width: 200 }}
        >
          {brands.map((b) => (
            <Link
              label={b}
              key={b}
              active={brand === b}
              onClick={() => {
                setCategory('')
                setSubCategory('')
                setSubSubCategory('')
                setBrand(b)
              }}
            />
          ))}
        </div>

        <p style={{ fontSize: 12, marginTop: 30, marginBottom: 4 }}>Search</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col mb-3"
          style={{ maxHeight: 200, width: 200 }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: 164,
              height: 35,
              border: '1px solid #004225',
              padding: 6,
              outline: 0,
            }}
          />
        </div>
      </div>

      <Link
        label="Reset Filters"
        style={{ fontSize: 12 }}
        onClick={() => {
          setBrand('')
          setCategory('')
          setSubCategory('')
          setSubSubCategory('')
          setQuery('')
        }}
      />
    </div>
  )
}

const Link = ({ onClick, href = '#/', active, label, style }) => (
  <a
    href={href}
    onClick={onClick}
    className={`link ${active ? 'link-active' : ''}`}
    style={style}
  >
    {label}
  </a>
)
