import uniq from 'lodash.uniq'
import React from 'react'

export function Sidebar({
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
  const categoryNames = Object.keys(categories)
  let subCategories = []
  let subSubCategories = []

  if (category) {
    subCategories = Object.keys(categories[category])
    if (categories[category] && subCategory) {
      subSubCategories = Object.keys(categories[category][subCategory] || {})
    }
  }

  const resultBrands = uniq(items.map((r) => r.brand))
  const resultCategories = uniq(items.map((r) => r.category))
  const groupItems = equipment.filter((e) => {
    if (category && e.category !== category) return false
    if (brand && e.brand !== brand) return false
    return true
  })
  const resultSubCategories = uniq(groupItems.map((r) => r.sub_category))
  const resultSubSubCategories = uniq(groupItems.map((r) => r.sub_sub_category))

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
            <p className="mt-4 mb-2">Category</p>

            <div
              className="layout-scrollbar overflow-y-scroll flex flex-col flex-1"
              style={{ width: 150, minHeight: 100 }}
            >
              {categoryNames
                .filter((c) =>
                  category
                    ? c === category
                    : brand
                    ? resultCategories.includes(c)
                    : true,
                )
                .sort((a, b) => a.localeCompare(b))
                .map((c) => (
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
                      .filter((c) =>
                        category ? resultSubCategories.includes(c) : true,
                      )
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
                                .filter((c) =>
                                  subCategory
                                    ? resultSubSubCategories.includes(c)
                                    : true,
                                )
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
            <p className="mt-4 mb-2">Brands</p>

            <div
              className="layout-scrollbar overflow-y-scroll flex flex-col"
              style={{ width: 150, minHeight: 100, flex: 2 }}
            >
              {brands
                .filter((b) => (category ? resultBrands.includes(b) : true))
                .sort((a, b) => a.localeCompare(b))
                .map((b) => (
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
            className="font-sans py-2 px-6"
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
  const categoryNames = Object.keys(categories)
  let subCategories = []
  let subSubCategories = []

  if (category) {
    subCategories = Object.keys(categories[category])
    if (categories[category] && subCategory) {
      subSubCategories = Object.keys(categories[category][subCategory] || {})
    }
  }

  const resultBrands = uniq(items.map((r) => r.brand))
  const resultCategories = uniq(items.map((r) => r.category))
  const groupItems = equipment.filter((e) => {
    if (category && e.category !== category) return false
    if (brand && e.brand !== brand) return false
    return true
  })
  const resultSubCategories = uniq(groupItems.map((r) => r.sub_category))
  const resultSubSubCategories = uniq(groupItems.map((r) => r.sub_sub_category))

  const renderedSubCategories = subCategories.filter((c) =>
    category ? resultSubCategories.includes(c) : true,
  )

  const renderedSubSubCategories = subSubCategories.filter((c) =>
    subCategory ? resultSubSubCategories.includes(c) : true,
  )

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
            {categoryNames
              .filter((c) =>
                category
                  ? c === category
                  : brand
                  ? resultCategories.includes(c)
                  : true,
              )
              .sort((a, b) => a.localeCompare(b))
              .map((c) => (
                <>
                  <option value={c}>{c}</option>
                </>
              ))}
          </select>
        </>
      )}

      {renderedSubCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Categories</h2>
          <select
            onChange={(e) => {
              setSubCategory(e.target.value)
              setSubSubCategory('')
            }}
          >
            <option value="">Everything</option>
            {renderedSubCategories.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      {renderedSubSubCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Sub Categories</h2>
          <select
            onChange={(e) => {
              setSubSubCategory(e.target.value)
            }}
          >
            <option value="">Everything</option>
            {renderedSubSubCategories.map((c) => (
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
            {brands
              .filter((b) => (category ? resultBrands.includes(b) : true))
              .sort((a, b) => a.localeCompare(b))
              .map((b) => (
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
