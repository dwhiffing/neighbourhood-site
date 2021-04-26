import React, { useEffect, useState } from 'react'
import { useRouteData } from 'react-static'
import { BasePage } from '../components/BasePage'
import { motion } from 'framer-motion'
import uniq from 'lodash/uniq'

const Equipment = () => {
  const [data, setData] = useState([])
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const { equipment } = useRouteData()

  useEffect(() => {
    setData(equipment)
  }, [equipment])

  const categories = uniq(data?.map((d) => d.category) || [])
  const brands = uniq(data?.map((d) => d.brand) || [])

  const sidebarProps = {
    categories,
    brands,
    category,
    setCategory,
    brand,
    setBrand,
    query,
    setQuery,
  }

  if (!data) return null

  return (
    <BasePage linkComponent={<EquipmentSidebar {...sidebarProps} />}>
      <div className="relative">
        <button
          className="absolute top-0 right-0 mt-3"
          onClick={() => setCartOpen(true)}
        >
          {cart.length} Items
        </button>

        <CartModal
          items={cart}
          showModal={cartOpen}
          setShowModal={setCartOpen}
          onRemove={(item) => setCart((c) => c.filter((i) => i !== item))}
        />
        <div className="pt-14 flex flex-wrap justify-center">
          {data?.map((item, index) => (
            <EquipmentItem
              item={item}
              index={index}
              onAdd={() => setCart((c) => [...c, item])}
            />
          ))}
        </div>
      </div>
    </BasePage>
  )
}

export default Equipment

const EquipmentItem = ({ item, index, onAdd }) => {
  return (
    <div
      className={`${index % 2 === 0 ? 'mr-4' : ''} mb-8`}
      style={{ flex: '43% 0 1' }}
    >
      <img src={item.image} alt={item.name} />
      <p>{item.brand}</p>
      <h2>{item.name}</h2>
      <button onClick={onAdd}>Add to List</button>
    </div>
  )
}

function EquipmentSidebar({
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
    <div>
      <h2 className="mb-4">Equipment</h2>
      <div className="flex flex-col items-start">
        <p>Categories</p>
        {categories.map((c) => (
          <a
            href="#/"
            onClick={() => setCategory(c)}
            className={`link ${category === c ? 'border-b border-green' : ''}`}
          >
            {c}
          </a>
        ))}
        <p>Brands</p>
        {brands.map((b) => (
          <a
            href="#/"
            onClick={() => setBrand(b)}
            className={`link ${brand === b ? 'border-b border-green' : ''}`}
          >
            {b}
          </a>
        ))}
        <p>Search</p>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
    </div>
  )
}

const CartModal = ({ showModal, setShowModal, items = [], onRemove }) => {
  return (
    <motion.div
      animate={{ opacity: showModal ? 1 : 0 }}
      transition={{ duration: 0.3 }}
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
        transition={{ duration: 0.3 }}
        className="bg-green w-full flex mx-4 rounded flex-col py-9 px-7"
        style={{ maxHeight: '90vh', maxWidth: 1100 }}
      >
        <p className="text-white" onClick={() => setShowModal(false)}>
          Close
        </p>

        <div>
          {items.map((item) => (
            <CartItem onRemove={onRemove} item={item} />
          ))}
        </div>

        <div>
          <form className="flex flex-col">
            <Input label="Name" source="name" />
            <Input label="Phone" source="phone" />
            <Input label="Email" source="email" />
            <Input label="Pickup Date" source="pickup_date" />
            <Input label="Return Date" source="return_date" />
            <Input label="Additional Details" source="details" />
            <button>Send Rental Request</button>
            <p>We respond to most inquiries within 2 hours</p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Input = ({ label, source }) => (
  <>
    <label>{label}</label>
    <input name={source} />
  </>
)

const CartItem = ({ item, onRemove }) => (
  <div>
    <p className="text-white">{item.brand}</p>
    <p className="text-white">{item.name}</p>
    <button onClick={() => onRemove(item)}>Remove</button>
  </div>
)
