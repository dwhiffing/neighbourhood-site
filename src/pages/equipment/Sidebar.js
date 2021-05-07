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
      <div
        className="flex flex-col items-start overflow-hidden"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <div>
          <h2 className="mb-4">Equipment</h2>

          <p className="mt-4 mb-2">Search</p>

          <div
            className="layout-scrollbar overflow-y-scroll flex flex-col mb-2"
            style={{ width: 200 }}
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

          {/* <Link
            label="Reset Filters"
            style={{ fontSize: 12 }}
            onClick={() => {
              setBrand('')
              setCategory('')
              setSubCategory('')
              setSubSubCategory('')
              setQuery('')
            }}
          /> */}
        </div>

        <p className="mt-4 mb-2">Category</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ width: 200, minHeight: 100 }}
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

        <p className="mt-4 mb-2">Brands</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col flex-1"
          style={{ width: 200, minHeight: 100 }}
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
      </div>
    </div>
  )
}

const Link = ({ onClick, href = '#/', active, label, style }) => (
  <a
    href={href}
    onClick={onClick}
    className={`link ${active ? 'link-active' : ''}`}
    style={{ ...style, fontSize: 12 }}
  >
    {label}
  </a>
)
