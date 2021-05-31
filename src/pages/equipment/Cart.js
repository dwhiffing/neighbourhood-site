import React from 'react'
import { motion } from 'framer-motion'
import { DottedLine } from '../../components/DottedLine'
import { Input, Textarea } from '../../components/Input'
import { CloseIcon } from '../../components/FAQContainer'

export const CartModal = ({
  showModal,
  setShowModal,
  items = [],
  onRemoveItem,
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
        className="flex fixed justify-center items-center z-30"
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
                  onRemoveItem={onRemoveItem}
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

              <p className="text-white text-center muted small">
                We respond to most inquiries within 2 hours
              </p>
              <p className="text-white text-center muted small">
                Mandatory fields marked with *
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const CartItem = ({ item, onRemoveItem, onUpdateQuantity }) => (
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
        <button onClick={() => onRemoveItem(item)} style={{ outline: 0 }}>
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
