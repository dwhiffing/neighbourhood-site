import React, { useMemo, useState } from 'react'
import { BasePage } from '../../components/BasePage'
import { useEquipment, submitCart } from '../../airtable'
import { MobileFilters, Sidebar } from './Sidebar'
import { CartModal } from './Cart'
import { motion } from 'framer-motion'
import { useContainerWidth, useIsMobile, useKeypress } from '../../useIsMobile'

const Equipment = () => {
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [subSubCategory, setSubSubCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [formState, setFormState] = useState({})
  let { loading, traits, equipment, fuse } = useEquipment()
  const isMobile = useIsMobile()
  const width = useContainerWidth()

  let numPerRow = 1
  let flex = '100% 0 1'
  if (width > 500) {
    numPerRow = 2
    flex = '46% 0 1'
  }
  if (width > 1000) {
    numPerRow = 3
    flex = '30% 0 1'
  }
  if (width > 1400) {
    numPerRow = 4
    flex = '22% 0 1'
  }

  useKeypress('Escape', () => setCartOpen(false))

  const results = useMemo(
    () => fuse.search(query).map((r) => r.item),
    [fuse, query],
  )

  const getOnToggleItem = (item) => () => {
    if (cartOpen) return
    setCart((c) =>
      c.find((i) => i.id === item.id)
        ? c.filter((i) => i.id !== item.id)
        : [...c, { ...item, quantity: 1 }],
    )
  }

  const getOnChangeQuantity = (item) => (quantity) => {
    if (cartOpen) return
    setCart((c) =>
      c.map((i) =>
        i.id === item.id ? { ...i, quantity: Math.max(quantity, 1) } : i,
      ),
    )
  }

  const onRemoveItem = (item) => setCart((c) => c.filter((i) => i !== item))

  const onUpdateQuantity = (item, quantity = '') => {
    setCart((c) => c.map((i) => (i.id === item.id ? { ...item, quantity } : i)))
  }

  const onSubmit = () => {
    submitCart({
      items: cart.map((p) => `[${p.name} | Qty: ${p.quantity}]\n`).join(''),
      phone: formState.phone.replace(/-/g, ''),
      ...formState,
    })
      .then(() => {
        setCart([])
        setFormState({})
        setCartOpen(false)
        alert(
          'Thanks for your submission.  We will contact you with more details.',
        )
      })
      .catch(() => {
        alert('Sorry, your submission was invalid.')
      })
  }

  const items = padArray(
    equipment
      ?.filter(
        getEquipmentFilter(
          category,
          subCategory,
          subSubCategory,
          brand,
          query,
          results,
        ),
      )
      .slice(0, 200),
    numPerRow,
    '',
  )

  const sidebarProps = {
    ...traits,
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
  }

  return (
    <>
      <div className="equipment">
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-white z-10"
          initial={{ opacity: loading ? 1 : 0 }}
          animate={{ opacity: loading ? 1 : 0 }}
          style={{
            margin: isMobile ? 0 : '0vh 0vh 91px 170px',
            pointerEvents: 'none',
          }}
          exit={{ opacity: 0 }}
        >
          <div className="flex mt-20 justify-center items-center">
            <Loader />
          </div>
        </motion.div>

        <div className="relative z-10">
          <div className="absolute flex -top-16 lg:fixed lg:top-0 right-0 mt-3 mr-3 mb-3">
            <button
              className="px-6 equipment-button cart-modal-button"
              onClick={() => setCartOpen(true)}
            >
              My List ({cart.length})
            </button>
          </div>
        </div>

        <BasePage
          pageSize="max-w-6xl w-full"
          route="/equipment"
          className="lg:pl-3"
          linkComponent={<Sidebar {...sidebarProps} />}
        >
          {width < 900 && <MobileFilters {...sidebarProps} />}
          <div className="pt-16 flex flex-wrap justify-center">
            {items.map((item, index) => (
              <EquipmentItem
                key={index}
                item={item}
                flex={flex}
                index={index}
                cartItem={cart.find((i) => i.id === item.id)}
                onToggle={getOnToggleItem(item)}
                onChangeQuantity={getOnChangeQuantity(item)}
              />
            ))}
          </div>
          <CartModal
            items={cart}
            showModal={cartOpen}
            setShowModal={setCartOpen}
            formState={formState}
            setFormState={setFormState}
            onSubmit={onSubmit}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        </BasePage>
      </div>
    </>
  )
}

export default Equipment
const randomColor = require('randomcolor')
const colors = randomColor({
  count: 100,
  hue: 'random',
  luminosity: 'light',
})

const QuantitySelector = ({ quantity, onChange }) => (
  <div className="flex border-green overflow-hidden border rounded-md text-green select-none">
    <div
      className="flex items-center justify-center w-4 text-white bg-green"
      onClick={() => onChange(quantity - 1)}
    >
      -
    </div>
    <div
      className="flex items-center justify-center w-7"
      style={{ fontSize: 12 }}
    >
      {quantity}
    </div>
    <div
      className="flex items-center justify-center w-4 text-white bg-green"
      onClick={() => onChange(quantity + 1)}
    >
      +
    </div>
  </div>
)
const EquipmentItem = ({
  flex,
  item,
  index,
  onToggle,
  onChangeQuantity,
  cartItem,
}) => {
  const isInCart = !!cartItem
  const quantity = cartItem?.quantity
  if (item === '') return <div className="m-2" style={{ flex }} />
  return (
    <div className="equipment-item mx-2 mt-4 mb-8" style={{ flex }}>
      <div
        onClick={onToggle}
        className="square"
        style={{
          background: item.image ? null : colors[index],
        }}
      >
        {item.image && (
          <img
            src={item.image[0].thumbnails.large.url}
            alt={item.name}
            className="w-full"
            style={{ padding: 8, objectFit: 'contain' }}
          />
        )}
      </div>
      <div onClick={onToggle}>
        <h2 className="mt-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
          {item.brand}
        </h2>
      </div>
      <div onClick={onToggle}>
        <p className="mb-2">{item.name}</p>
      </div>
      <div
        className={`add-section flex justify-between ${
          isInCart ? 'active' : 'inactive'
        }`}
      >
        {isInCart && (
          <QuantitySelector quantity={quantity} onChange={onChangeQuantity} />
        )}
        <button
          onClick={onToggle}
          className={!isInCart ? 'stroke' : ''}
          style={{ backgroundColor: isInCart ? '#B01818' : '' }}
        >
          {isInCart ? 'Remove from List' : 'Add to List'}
        </button>
      </div>
    </div>
  )
}

const getEquipmentFilter =
  (category, subCategory, subSubCategory, brand, query, results) => (e) => {
    let valid = true
    if (category && e.category !== category) valid = false
    if (subCategory && e.sub_category !== subCategory) valid = false
    if (subSubCategory && e.sub_sub_category !== subSubCategory) valid = false
    if (brand && e.brand !== brand) valid = false
    if (query && !results.some((r) => r.name === e.name)) valid = false

    return valid
  }

function Loader() {
  return (
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      height={100}
      width={100}
    >
      <path
        fill="#004225"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

const padArray = (array, size = 1, value = '') => {
  const extra = size - (array.length % size)
  return [...array, ...new Array(extra === size ? 0 : extra).fill(value)]
}
