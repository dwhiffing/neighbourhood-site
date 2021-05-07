import React, { useMemo, useState } from 'react'
import { BasePage } from '../../components/BasePage'
import { useEquipment } from '../../airtable'
import { Sidebar } from './Sidebar'
import { CartModal } from './Cart'
import { motion } from 'framer-motion'
import { useIsMobile } from '../../useIsMobile'

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

  const results = useMemo(() => fuse.search(query).map((r) => r.item), [
    fuse,
    query,
  ])

  const sidebarProps = {
    ...traits,
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

  const getOnAddItem = (item) => () =>
    setCart((c) =>
      c.find((i) => i.id === item.id)
        ? c.filter((i) => i.id !== item.id)
        : [...c, { ...item, quantity: 1 }],
    )

  const onRemoveItem = (item) => setCart((c) => c.filter((i) => i !== item))

  const onUpdateQuantity = (item, quantity = '') => {
    setCart((c) => c.map((i) => (i.id === item.id ? { ...item, quantity } : i)))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ cart, ...formState })
  }

  return (
    <>
      <>
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

        <div className="relative">
          <button
            className="font-sans fixed top-0 right-0 mt-3 mr-3 px-6 mb-3 cart-modal-button"
            onClick={() => setCartOpen(true)}
          >
            {cart.length} Items
          </button>
        </div>

        <BasePage
          pageSize="max-w-2xl"
          className="pl-3"
          linkComponent={<Sidebar {...sidebarProps} />}
        >
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

          <div className="pt-16 flex flex-wrap justify-start">
            {equipment
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
              .slice(0, 100)
              .map((item, index) => (
                <EquipmentItem
                  key={item.name + index}
                  item={item}
                  index={index}
                  isInCart={cart.find((i) => i.id === item.id)}
                  onAdd={getOnAddItem(item)}
                />
              ))}
          </div>
        </BasePage>
      </>
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

const EquipmentItem = ({ item, index, onAdd, isInCart }) => {
  return (
    <div
      className={`${index % 2 === 0 ? 'mr-4' : ''} mb-12`}
      style={{ flex: '48% 0 1' }}
    >
      {item.image ? (
        <img
          src={item.image[0].url}
          alt={item.name}
          style={{ padding: 30, objectFit: 'contain', width: 300, height: 300 }}
        />
      ) : (
        <div
          style={{
            padding: 30,
            background: colors[index],
            width: 300,
            height: 300,
          }}
        ></div>
      )}

      <h2 className="mt-2" style={{ fontSize: 12 }}>
        {item.brand}
      </h2>
      <p className="font-serif mb-2">{item.name}</p>
      <button
        onClick={onAdd}
        style={{ backgroundColor: isInCart ? '#B01818' : '' }}
      >
        {isInCart ? 'Remove from List' : 'Add to List'}
      </button>
    </div>
  )
}

const getEquipmentFilter = (
  category,
  subCategory,
  subSubCategory,
  brand,
  query,
  results,
) => (e) => {
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
      enable-background="new 0 0 0 0"
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
