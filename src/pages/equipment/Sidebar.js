import React from 'react'

// TODO: need to handle sub/subcategories
export function Sidebar({
  subCategories,
  subSubCategories,
  categories = [],
  brands = [],
  category,
  setCategory,
  brand,
  setBrand,
  query,
  setQuery,
}) {
  return (
    <div className="fixed" style={{ marginLeft: 4 }}>
      <h2 className="mb-4">Equipment</h2>

      <div className="flex flex-col items-start">
        <p style={{ fontSize: 12, marginTop: 20 }}>Category</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ maxHeight: 350, width: 200 }}
        >
          {categories.map((c) => (
            <a
              key={c}
              href="#/"
              onClick={() => {
                setCategory(c)
                setBrand('')
              }}
              className={`link ${category === c ? 'link-active' : ''}`}
            >
              {c}
            </a>
          ))}
        </div>

        <p style={{ fontSize: 12, marginTop: 30 }}>Brands</p>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ maxHeight: 350, width: 200 }}
        >
          {brands.map((b) => (
            <a
              href="#/"
              key={b}
              onClick={() => {
                setCategory('')
                setBrand(b)
              }}
              className={`link ${brand === b ? 'link-active' : ''}`}
            >
              {b}
            </a>
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

      <a
        className="link"
        href="#/"
        style={{ fontSize: 12 }}
        onClick={() => {
          setBrand('')
          setCategory('')
          setQuery('')
        }}
      >
        Reset Filters
      </a>
    </div>
  )
}
