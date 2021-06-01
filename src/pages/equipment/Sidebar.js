import React from 'react'

export function Sidebar({
  categories = {},
  sortedCategoryNames,
  brands = [],
  equipment,
  items,
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
            style={{ width: 230 }}
          >
            <input
              value={query}
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {!brand && (
          <>
            <a onClick={() => setCategory('')} className="link large mt-4 mb-2">
              All Categories
            </a>

            <div
              className="layout-scrollbar overflow-y-scroll flex flex-col flex-1"
              style={{ width: 150, minHeight: 100 }}
            >
              {sortedCategoryNames.map((c) => (
                <>
                  <Link
                    label={c}
                    key={c}
                    active={category === c}
                    onClick={() => {
                      setCategory(c)
                      setSubCategory('')
                      setSubSubCategory('')
                    }}
                  />

                  {subCategories
                    .filter(() => category === c)
                    .map((s) => (
                      <>
                        <Link
                          label={s}
                          key={s}
                          active={subCategory === s}
                          onClick={() => {
                            setSubCategory(s)
                            setSubSubCategory('')
                          }}
                          style={{ marginLeft: 12 }}
                        />
                        {subCategory === s && (
                          <>
                            {subSubCategories
                              .filter(() => category === c)

                              .map((ss) => (
                                <Link
                                  label={ss}
                                  key={ss}
                                  style={{ marginLeft: 24 }}
                                  active={subSubCategory === ss}
                                  onClick={() => setSubSubCategory(ss)}
                                />
                              ))}
                          </>
                        )}
                      </>
                    ))}
                </>
              ))}
            </div>
          </>
        )}

        {!category && (
          <>
            <a onClick={() => setBrand('')} className="link large mt-4 mb-2">
              All Brands
            </a>

            <div
              className="layout-scrollbar overflow-y-scroll flex flex-col"
              style={{ width: 150, minHeight: 100, flex: 1.5 }}
            >
              {brands.map((b) => (
                <Link
                  label={b}
                  key={b}
                  active={brand === b}
                  onClick={() => {
                    setBrand(b)
                  }}
                />
              ))}
            </div>
          </>
        )}

        {(brand || category) && (
          <button
            className="font-sans py-2 px-6 stroke"
            style={{ marginBottom: 12, fontSize: 12 }}
            onClick={() => {
              setBrand('')
              setCategory('')
              setSubCategory('')
              setSubSubCategory('')
              setQuery('')
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export function MobileFilters({
  sortedCategoryNames,
  categories = {},
  brands = [],
  equipment,
  items,
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
  let subCategories = []
  let subSubCategories = []

  if (category) {
    subCategories = Object.keys(categories[category])
    if (categories[category] && subCategory) {
      subSubCategories = Object.keys(categories[category][subCategory] || {})
    }
  }

  return (
    <div>
      {/* <p className="mt-4 mb-2">Search</p>

          <div
            className="layout-scrollbar overflow-y-scroll flex flex-col mb-2"
            style={{ width: 230 }}
          >
            <input
              value={query}
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div> */}
      {!brand && (
        <>
          <h2 className="font-serif">Category</h2>

          <select
            onChange={(e) => {
              setCategory(e.target.value)
              setSubCategory('')
              setSubSubCategory('')
            }}
          >
            <option value="">Everything</option>
            {sortedCategoryNames.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      {subCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Categories</h2>
          <select
            onChange={(e) => {
              setSubCategory(e.target.value)
              setSubSubCategory('')
            }}
          >
            <option value="">Everything</option>
            {subCategories.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      {subSubCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Sub Categories</h2>
          <select
            onChange={(e) => {
              setSubSubCategory(e.target.value)
            }}
          >
            <option value="">Everything</option>
            {subSubCategories.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      {!category && (
        <>
          <h2 className="font-serif mt-4">Brands</h2>

          <select
            onChange={(e) => {
              setBrand(e.target.value)
            }}
          >
            <option value="">Everything</option>
            {brands.map((b) => (
              <>
                <option value={b}>{b}</option>
              </>
            ))}
          </select>
        </>
      )}
    </div>
  )
}

const Link = ({ onClick, href = '#/', active, label, style }) => (
  <a
    href={href}
    onClick={onClick}
    className={`link ${active ? 'link-active' : ''}`}
    style={{ ...style }}
  >
    {label}
  </a>
)
