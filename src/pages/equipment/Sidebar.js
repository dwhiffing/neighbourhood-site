import uniq from 'lodash.uniq'
import React from 'react'

export function Sidebar(props) {
  const sidebar = useSidebar(props)
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
              value={props.query}
              className="search-input"
              onChange={(e) => props.setQuery(e.target.value)}
            />
          </div>
        </div>

        <a
          href="/#"
          onClick={sidebar.onResetCategory}
          className={`mt-4 mb-2 link large`}
        >
          All Categories
        </a>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ width: 150, minHeight: 100 }}
        >
          {props.categoryNames
            .filter((c) => sidebar.renderedCategories.includes(c))
            .map((c) => (
              <>
                <SidebarLink
                  label={c}
                  key={c}
                  active={props.category}
                  onClick={sidebar.getSetCategory(c)}
                />

                {sidebar.renderedSubCategories
                  .filter(() => props.category === c)
                  .map((s) => (
                    <>
                      <SidebarLink
                        label={s}
                        key={s}
                        active={props.subCategory}
                        onClick={sidebar.getSetSubCategory(s)}
                        offset={1}
                      />
                      {props.subCategory === s &&
                        sidebar.renderedSubSubCategories
                          .filter(() => props.category === c)
                          .map((ss) => (
                            <SidebarLink
                              label={ss}
                              key={ss}
                              active={props.subSubCategory}
                              onClick={sidebar.getSetSubSubCategory(ss)}
                              offset={2}
                            />
                          ))}
                    </>
                  ))}
              </>
            ))}
        </div>

        <a
          href="/#"
          onClick={sidebar.onResetBrand}
          className={`mt-4 mb-2 link large`}
        >
          All Brands
        </a>

        <div
          className="layout-scrollbar overflow-y-scroll flex flex-col"
          style={{ width: 150, minHeight: 200, flex: 1.5 }}
        >
          {sidebar.renderedBrands.map((b) => (
            <SidebarLink
              label={b}
              key={b}
              active={props.brand}
              onClick={sidebar.getSetBrand(b)}
            />
          ))}
        </div>

        {(props.brand || props.category) && (
          <button
            className="font-sans py-2 px-6 stroke"
            style={{ marginBottom: 12, fontSize: 12 }}
            onClick={sidebar.onReset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export function MobileFilters(props) {
  const sidebar = useSidebar(props)

  return (
    <div>
      <h2 className="font-serif">Category</h2>

      <select
        onChange={(e) => {
          props.setCategory(e.target.value)
          props.setSubCategory('')
          props.setSubSubCategory('')
        }}
      >
        <option value="">Everything</option>
        {props.categoryNames.map((c) => (
          <>
            <option value={c}>{c}</option>
          </>
        ))}
      </select>

      {sidebar.renderedSubCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Categories</h2>
          <select
            onChange={(e) => {
              props.setSubCategory(e.target.value)
              props.setSubSubCategory('')
            }}
          >
            <option value="">Everything</option>
            {sidebar.renderedSubCategories.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      {sidebar.renderedSubSubCategories.length > 0 && (
        <>
          <h2 className="font-serif mt-4">Sub Sub Categories</h2>
          <select
            onChange={(e) => {
              props.setSubSubCategory(e.target.value)
            }}
          >
            <option value="">Everything</option>
            {sidebar.renderedSubSubCategories.map((c) => (
              <>
                <option value={c}>{c}</option>
              </>
            ))}
          </select>
        </>
      )}

      <h2 className="font-serif mt-4">Brands</h2>

      <select
        onChange={(e) => {
          props.setBrand(e.target.value)
        }}
      >
        <option value="">Everything</option>
        {sidebar.renderedBrands.map((b) => (
          <>
            <option value={b}>{b}</option>
          </>
        ))}
      </select>
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

const SidebarLink = ({ label, active, onClick, offset = 0 }) => (
  <Link
    label={label}
    key={label}
    active={active === label}
    onClick={onClick}
    style={{ marginLeft: offset * 12 }}
  />
)

const useSidebar = ({
  equipment,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  subSubCategory,
  setSubSubCategory,
  brand,
  setBrand,
  setQuery,
}) => {
  return {
    getSetCategory: (c) => () => {
      setCategory(c)
      setSubCategory('')
      setSubSubCategory('')
    },
    getSetSubCategory: (s) => () => {
      setSubCategory(s)
      setSubSubCategory('')
    },
    getSetSubSubCategory: (s) => () => setSubSubCategory(s),
    getSetBrand: (b) => () => setBrand(b),

    renderedCategories: uniq(
      equipment
        .filter((i) => (brand ? i.brand === brand : true))
        .map((i) => i.category),
    ),
    renderedSubCategories: uniq(
      equipment
        .filter(
          (i) => i.category === category && (brand ? i.brand === brand : true),
        )
        .map((i) => i.sub_category),
    ),

    renderedSubSubCategories: uniq(
      equipment
        .filter(
          (i) =>
            i.sub_category === subCategory &&
            (brand ? i.brand === brand : true),
        )
        .map((i) => i.sub_sub_category)
        .filter((c) => !!c),
    ),
    renderedBrands: uniq(
      equipment
        .filter((i) =>
          subSubCategory
            ? i.sub_sub_category === subSubCategory
            : subCategory
            ? i.sub_category === subCategory
            : category
            ? i.category === category
            : true,
        )
        .map((i) => i.brand),
    ),
    onReset: (e) => {
      e?.preventDefault?.()
      setBrand('')
      setCategory('')
      setSubCategory('')
      setSubSubCategory('')
      setQuery('')
    },
    onResetCategory: (e) => {
      e?.preventDefault?.()
      setCategory('')
      setSubCategory('')
      setSubSubCategory('')
    },
    onResetBrand: (e) => {
      e?.preventDefault?.()
      setBrand('')
    },
  }
}
