import React, { useCallback, useEffect, useRef } from 'react'
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
  const invalid = items.length === 0 || !formState.name || !formState.email
  const node = useRef()
  const handleClick = useCallback(
    (e) => {
      if (!showModal || node.current.contains(e.target)) return
      e.preventDefault()
      e.stopPropagation()
      setTimeout(() => setShowModal(false), 100)
    },
    [showModal, setShowModal],
  )

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (
      !/^\d{3}-\d{3}-\d{4}$/.test(formState.phone) &&
      !/^\d{10}$/.test(formState.phone)
    ) {
      return alert('Your phone number is invalid')
    }
    if (!/^\S+@\S+$/.test(formState.email)) {
      return alert('Your email address is invalid')
    }
    if (+new Date(formState.shoot_start_date) < Date.now()) {
      return alert('Your shoot date is invalid')
    }
    if (
      +new Date(formState.shoot_end_date) < Date.now() ||
      +new Date(formState.shoot_end_date) <
        +new Date(formState.shoot_start_date)
    ) {
      return alert('Your shoot end date is invalid')
    }
    if (+new Date(formState.pickup_date) < Date.now()) {
      return alert('Your pickup date is invalid')
    }
    if (formState.pickup_date && !formState.pickup_time) {
      return alert('Your pickup time is invalid')
    }
    if (
      +new Date(formState.return_date) < Date.now() ||
      +new Date(formState.return_date) < +new Date(formState.pickup_date)
    ) {
      return alert('Your return date is invalid')
    }
    if (formState.return_date && !formState.return_time) {
      return alert('Your return time is invalid')
    }
    onSubmit()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick])

  const minDate = (
    formState.pickup_date && !Number.isNaN(Date.parse(formState.pickup_date))
      ? new Date(formState.pickup_date)
      : new Date()
  )
    .toISOString()
    .split('T')[0]

  const shootMinDate = (
    formState.shoot_start_date &&
    !Number.isNaN(Date.parse(formState.shoot_start_date))
      ? new Date(formState.shoot_start_date)
      : new Date()
  )
    .toISOString()
    .split('T')[0]

  return (
    <div className={`fixed z-30 inset-0 pointer-events-none`}>
      <motion.div
        ref={node}
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
                  label="Phone*"
                  source="phone"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>

              <Input
                label="Email*"
                placeholder="Email"
                source="email"
                formState={formState}
                setFormState={setFormState}
              />

              <div className="flex flex-1">
                <Input
                  className="flex-1 mr-2"
                  label="Pickup Date"
                  placeholder="YYYY/MM/DD"
                  source="pickup_date"
                  min={new Date().toISOString().split('T')[0]}
                  type="date"
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  className="flex-1"
                  label="Pickup Time"
                  placeholder="HH:MM (24 hours)"
                  source="pickup_time"
                  type="time"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>

              <div className="flex flex-1">
                <Input
                  className="flex-1 mr-2"
                  placeholder="YYYY/MM/DD"
                  label="Return Date"
                  source="return_date"
                  type="date"
                  min={minDate}
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  className="flex-1"
                  placeholder="HH:MM (24 hours)"
                  label="Return Time"
                  source="return_time"
                  type="time"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>

              <div className="flex flex-1">
                <Input
                  className="flex-1 mr-2"
                  placeholder="YYYY/MM/DD"
                  label="Shoot Start Date"
                  source="shoot_start_date"
                  type="date"
                  min={minDate}
                  formState={formState}
                  setFormState={setFormState}
                />

                <Input
                  className="flex-1"
                  placeholder="YYYY/MM/DD"
                  label="Shoot End Date"
                  source="shoot_end_date"
                  type="date"
                  min={shootMinDate}
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
                disabled={invalid}
                style={{
                  opacity: invalid ? 0.5 : 1,
                  height: 41,
                  color: '#004225',
                }}
                className="mt-6 justify-center rounded bg-white mb-4"
                onClick={onFormSubmit}
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
      <div className="mr-2">
        <h2
          className="mt-2"
          style={{ fontSize: 12, lineHeight: 1.5, color: 'white' }}
        >
          {item.brand}
        </h2>
        <h2
          className="mb-2"
          style={{ fontSize: 12, lineHeight: 1.5, color: 'white' }}
        >
          {item.name}
        </h2>
      </div>
      <div className="flex items-center mt-1">
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
      className="my-1"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(255 255 255) 30%, rgba(255, 255, 255, 0) 0%)',
      }}
    />
  </div>
)
