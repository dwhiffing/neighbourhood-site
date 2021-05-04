import React, { useEffect, useMemo, useState } from 'react'
import { BasePage } from '../components/BasePage'
import { motion } from 'framer-motion'
import uniq from 'lodash/uniq'
import { DottedLine } from '../components/DottedLine'
import { CloseIcon } from '../components/FAQContainer'
import Airtable from 'airtable'
import uniqid from 'uniqid'
import Fuse from 'fuse.js'
import { startCase } from 'lodash'

const sortAlpha = (a, b) => a.localeCompare(b)
const apiKey = process.env.REACT_APP_AIRTABLE_KEY
const baseName = process.env.REACT_APP_AIRTABLE_BASE
const Equipment = () => {
  const [category, setCategory] = useState('')
  const [equipment, setEquipment] = useState([])
  const [brand, setBrand] = useState('')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [formState, setFormState] = useState({})

  const categories = useMemo(
    () => uniq(equipment?.map((d) => d.category) || []).sort(sortAlpha),
    [equipment],
  )
  const subCategories = useMemo(
    () => uniq(equipment?.map((d) => d.sub_category) || []).sort(sortAlpha),
    [equipment],
  )
  const subSubCategories = useMemo(
    () => uniq(equipment?.map((d) => d.sub_sub_category) || []).sort(sortAlpha),
    [equipment],
  )
  const brands = useMemo(
    () => uniq(equipment?.map((d) => d.brand) || []).sort(sortAlpha),
    [equipment],
  )
  const fuse = useMemo(
    () =>
      new Fuse(equipment, {
        keys: ['name'],
        threshold: 0.2,
        minMatchCharLength: 2,
      }),
    [equipment],
  )
  const results = useMemo(() => fuse.search(query).map((r) => r.item), [
    fuse,
    query,
  ])
  const sidebarProps = {
    categories,
    brands,
    category,
    subCategories,
    subSubCategories,
    setCategory,
    brand,
    setBrand,
    query,
    setQuery,
  }

  useEffect(() => {
    var base = new Airtable({ apiKey }).base(baseName)
    base('Equipment')
      .select({ pageSize: 100, view: 'Grid view' })
      .eachPage(
        function page(records, fetchNextPage) {
          const newEquipment = records.map((r) => ({
            ...r._rawJson.fields,
            id: uniqid(),
            category: startCase(r._rawJson.fields.category.toLowerCase()),
          }))
          setEquipment((e) => [...e, ...newEquipment])
          fetchNextPage()
        },
        function done(err) {},
      )
  }, [])

  return (
    <>
      <div className="relative">
        <button
          className="font-sans fixed top-0 right-0 mt-3 mr-3 px-6 mb-3"
          onClick={() => setCartOpen(true)}
          style={{
            borderRadius: 12,
            height: 50,
            fontSize: 16,
            fontWeight: '300',
          }}
        >
          {cart.length} Items
        </button>
      </div>

      <BasePage linkComponent={<EquipmentSidebar {...sidebarProps} />}>
        <CartModal
          items={cart}
          showModal={cartOpen}
          setShowModal={setCartOpen}
          formState={formState}
          setFormState={setFormState}
          onSubmit={(e) => {
            e.preventDefault()
            console.log({ cart, ...formState })
          }}
          onRemove={(item) => setCart((c) => c.filter((i) => i !== item))}
          onUpdateQuantity={(item, quantity = '') => {
            setCart((c) =>
              c.map((i) => (i.id === item.id ? { ...item, quantity } : i)),
            )
          }}
        />

        <div className="pt-16 flex flex-wrap justify-center">
          {equipment
            ?.filter((e) => {
              let valid = true
              if (category && e.category !== category) valid = false
              if (brand && e.brand !== brand) valid = false
              if (query && !results.some((r) => r.name === e.name))
                valid = false

              return valid
            })
            .slice(0, 100)
            .map((item, index) => (
              <EquipmentItem
                key={item.name + index}
                item={item}
                index={index}
                isInCart={cart.find((i) => i.id === item.id)}
                onAdd={() =>
                  setCart((c) =>
                    c.find((i) => i.id === item.id)
                      ? c.filter((i) => i.id !== item.id)
                      : [...c, { ...item, quantity: 1 }],
                  )
                }
              />
            ))}
        </div>
      </BasePage>
    </>
  )
}

export default Equipment

const EquipmentItem = ({ item, index, onAdd, isInCart }) => {
  return (
    <div
      className={`${index % 2 === 0 ? 'mr-4' : ''} mb-12`}
      style={{ flex: '48% 0 1' }}
    >
      {item.image && (
        <img
          src={item.image[0].url}
          alt={item.name}
          style={{ padding: 30, objectFit: 'contain', width: 300, height: 300 }}
        />
      )}

      <h2 className="mt-2" style={{ fontSize: 12 }}>
        {item.brand}
      </h2>
      <h2 className="font-serif mb-2">{item.name}</h2>
      <button
        onClick={onAdd}
        style={{ backgroundColor: isInCart ? '#B01818' : '' }}
      >
        {isInCart ? 'Remove from List' : 'Add to List'}
      </button>
    </div>
  )
}

// TODO: need to handle sub/subcategories
function EquipmentSidebar({
  subCategories,
  subSubCategories,
  categories,
  brands,
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
          style={{ maxHeight: 200, width: 220 }}
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
          style={{ maxHeight: 200, width: 220 }}
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
          style={{ maxHeight: 200, width: 220 }}
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

const CartModal = ({
  showModal,
  setShowModal,
  items = [],
  onRemove,
  onSubmit,
  formState,
  setFormState,
  onUpdateQuantity,
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-${showModal ? 'auto' : 'none'}`}
      onClick={() => setShowModal(false)}
    >
      <motion.div
        animate={{ opacity: showModal ? 1 : 0 }}
        className="flex fixed justify-center items-center z-20"
        style={{
          pointerEvents: showModal ? 'auto' : 'none',
          opacity: showModal ? 1 : 0,
          top: 0,
          right: 0,
        }}
      >
        <motion.div
          animate={{ opacity: showModal ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-green flex mx-3 my-3 rounded-xl flex-col py-4 px-7"
          style={{ maxHeight: '90vh', maxWidth: 372 }}
        >
          <p
            style={{ textAlign: 'right' }}
            className="text-white cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Close
          </p>

          <div
            className="layout-scrollbar"
            style={{ overflowY: 'scroll', maxHeight: 250 }}
          >
            <form>
              {items.map((item) => (
                <CartItem
                  key={item.name}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                  item={item}
                />
              ))}
            </form>
          </div>

          <div>
            <form className="flex flex-col">
              <div className="flex flex-1">
                <Input
                  placeholder="Full Name"
                  className="flex-1 mr-2"
                  label="Name*"
                  source="name"
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  placeholder="555-555-5555"
                  className="flex-1"
                  label="Phone"
                  source="phone"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>

              <Input label="Email*" placeholder="Email" source="email" />

              <div className="flex flex-1">
                <Input
                  className="flex-1 mr-2"
                  label="Pickup Date"
                  placeholder="DD/MM/YYYY"
                  source="pickup_date"
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  className="flex-1"
                  placeholder="DD/MM/YYYY"
                  label="Return Date"
                  source="return_date"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>

              <Textarea
                placeholder="Please share any PO Numbers, job names, etc"
                label="Additional Details"
                source="details"
                formState={formState}
                setFormState={setFormState}
              />

              <button
                className="mt-6 justify-center rounded bg-white mb-4"
                style={{ height: 41, color: '#004225' }}
                onClick={onSubmit}
              >
                Send Quote Request
              </button>

              <p
                className="text-white text-center muted"
                style={{ fontSize: 12, lineHeight: 1.7 }}
              >
                We respond to most inquiries within 2 hours
              </p>
              <p
                className="text-white text-center muted"
                style={{ fontSize: 12, lineHeight: 1.7 }}
              >
                Mandatory fields marked with *
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const Input = ({
  label,
  source,
  className = '',
  placeholder = '',
  formState,
  setFormState,
  ...props
}) => (
  <div className={`flex flex-col ${className}`} {...props}>
    <label>{label}</label>
    <input
      onChange={(e) => {
        const value = e.target.value
        setFormState((fs) => ({ ...fs, [source]: value }))
      }}
      value={formState && formState[source]}
      placeholder={placeholder}
      name={source}
    />
  </div>
)

const Textarea = ({
  label,
  source,
  className,
  placeholder = '',
  formState,
  setFormState,
  ...props
}) => (
  <div className={`flex flex-col ${className}`} {...props}>
    <label>{label}</label>
    <textarea
      onChange={(e) => {
        const value = e.target.value
        setFormState((fs) => ({ ...fs, [source]: value }))
      }}
      value={formState && formState[source]}
      placeholder={placeholder}
      name={source}
    />
  </div>
)

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div>
    <div className="flex justify-between">
      <div>
        <h2
          className="mt-2"
          style={{ fontSize: 12, lineHeight: 1.5, color: 'white' }}
        >
          {item.brand}
        </h2>
        <h2
          className="mb-2"
          style={{ fontSize: 16, lineHeight: 1.5, color: 'white' }}
        >
          {item.name}
        </h2>
      </div>
      <div className="flex items-center">
        <input
          value={item.quantity}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : +e.target.value
            if (value === '' || !Number.isNaN(value))
              onUpdateQuantity(item, value)
          }}
          onBlur={() => {
            if (item.quantity <= 0 || item.quantity === '')
              onUpdateQuantity(item, 1)
          }}
          className="mr-2 text-center"
          style={{
            width: 39,
            height: 30,
            border: '1px solid rgba(255, 255, 255, 0.59)',
          }}
        />
        <button onClick={() => onRemove(item)} style={{ outline: 0 }}>
          <CloseIcon fill="white" />
        </button>
      </div>
    </div>
    <DottedLine
      className="my-3"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(255 255 255) 30%, rgba(255, 255, 255, 0) 0%)',
      }}
    />
  </div>
)
