import Airtable from 'airtable'
import uniqid from 'uniqid'
import { startCase } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import uniq from 'lodash/uniq'
function get(obj, key, def, p, undef) {
  key = key.split ? key.split('.') : key
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef
  }
  return obj === undef ? def : obj
}
function set(obj, keys, val) {
  keys.split && (keys = keys.split('.'))
  var i = 0,
    l = keys.length,
    t = obj,
    x,
    k
  for (; i < l; ) {
    k = keys[i++]
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') break
    t = t[k] =
      i === l
        ? val
        : typeof (x = t[k]) === typeof keys
        ? x
        : keys[i] * 0 !== 0 || !!~('' + keys[i]).indexOf('.')
        ? {}
        : []
  }
}
const apiKey = process.env.REACT_APP_AIRTABLE_KEY
const baseName = process.env.REACT_APP_AIRTABLE_BASE
const getEquipmentBase = () => {
  return new Promise((resolve) => {
    let equipment =
      JSON.parse(
        typeof document !== 'undefined'
          ? localStorage.getItem('equipment')
          : '[]',
      ) || []

    if (equipment.length > 0) return resolve(equipment)

    const base = new Airtable({ apiKey }).base(baseName)
    base('Equipment')
      .select({ pageSize: 100, view: 'Grid view' })
      .eachPage(
        function page(records, fetchNextPage) {
          const newEquipment = records.map((r) => ({
            ...r._rawJson.fields,
            id: uniqid(),
            category: startCase(r._rawJson.fields.category.toLowerCase()),
          }))
          equipment = [...equipment, ...newEquipment]
          fetchNextPage()
        },
        function done(err) {
          if (typeof document !== 'undefined') {
            localStorage.setItem('equipment', JSON.stringify(equipment))
            localStorage.setItem('last-fetch', JSON.stringify(+new Date()))
          }
          resolve(equipment)
        },
      )
  })
}

const getEquipment = () => {
  return new Promise((resolve) => {
    getBrandOrder().then((brandOrder) => {
      getCategoryOrder().then((categoryOrder) => {
        if (typeof document !== 'undefined') {
          localStorage.setItem('brand-order', JSON.stringify(brandOrder))
          localStorage.setItem('category-order', JSON.stringify(categoryOrder))
        }
        getEquipmentBase().then((equipmentBase) => {
          resolve(equipmentBase)
        })
      })
    })
  })
}

export const submitCart = (fields) => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey }).base(baseName)
    base('Cart Submissions').create([{ fields }], function (err, records) {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

const setDefault = (obj, key, value) => {
  set(obj, key, get(obj, key, value))
  return get(obj, key, value)
}

export const useEquipment = () => {
  const [loading, setLoading] = useState(
    typeof document === 'undefined' || !localStorage.getItem('last-fetch'),
  )
  const brandOrder = JSON.parse(
    typeof document === 'undefined'
      ? '[]'
      : localStorage.getItem('brand-order') || '[]',
  )
  const categoryOrder = JSON.parse(
    typeof document === 'undefined'
      ? '[]'
      : localStorage.getItem('category-order') || '[]',
  )
  const [equipment, setEquipment] = useState([])

  const traits = useMemo(() => {
    const brands = getKey(equipment, 'brand').sort((a, b) => {
      const aIndex = brandOrder.indexOf(a)
      const bIndex = brandOrder.indexOf(b)
      if (aIndex > bIndex) return -1
      if (bIndex > aIndex) return 1
      return 0
    })
    let categories = {}

    equipment.forEach((e) => {
      setDefault(categories, `${e.category}`, {})
      if (e.sub_category) {
        const subKey = `${e.category}.${e.sub_category}`
        setDefault(categories, subKey, {})
        if (e.sub_sub_category) {
          // TODO: this is failing for sub categories with a dot in the name
          const subSubKey = `${subKey}.${e.sub_sub_category}`
          const subSub = setDefault(categories, subSubKey, [])
          set(categories, subSubKey, [...subSub, e])
        }
      }
    })
    const sortedCategoryNames = Object.keys(categories).sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a)
      const bIndex = categoryOrder.indexOf(b)
      if (aIndex > -1 && bIndex > -1) return aIndex - bIndex
      if (aIndex > bIndex) return -1
      if (bIndex > aIndex) return 1
      return 0
    })
    return { sortedCategoryNames, categories, brands }
  }, [equipment, brandOrder, categoryOrder])

  const fuse = useMemo(() => new Fuse(equipment, FUSE_CONFIG), [equipment])

  useEffect(() => {
    const lastFetch =
      typeof document === 'undefined'
        ? JSON.stringify(new Date())
        : localStorage.getItem('last-fetch')

    const msPassed = +new Date() - (+lastFetch || +new Date())

    if (msPassed > ONE_DAY) {
      if (typeof document !== 'undefined') localStorage.removeItem('equipment')
      setLoading(true)
    }

    getEquipment().then((result) => {
      setEquipment(result)
      setLoading(false)
    })
  }, [])

  return { loading, traits, fuse: fuse, equipment }
}

const sortAlpha = (a, b) => a.localeCompare(b)
const getKey = (arr, key) => uniq(arr?.map((d) => d[key]) || []).sort(sortAlpha)
const FUSE_CONFIG = { keys: ['name'], threshold: 0.2, minMatchCharLength: 1 }
const ONE_DAY = 1000 * 60 * 60 * 24

const getBrandOrder = () => {
  return new Promise((resolve) => {
    const base = new Airtable({ apiKey }).base(baseName)
    let order = []
    base('Brand Order')
      .select({ pageSize: 100, view: 'Grid view' })
      .eachPage(
        function page(records, fetchNextPage) {
          order = [...order, ...records.map((r) => r._rawJson.fields.Name)]
          fetchNextPage()
        },
        function done(err) {
          resolve(order)
        },
      )
  })
}

const getCategoryOrder = () => {
  return new Promise((resolve) => {
    const base = new Airtable({ apiKey }).base(baseName)
    let order = []
    base('Category Order')
      .select({ pageSize: 100, view: 'Grid view' })
      .eachPage(
        function page(records, fetchNextPage) {
          order = [...order, ...records.map((r) => r._rawJson.fields.Name)]
          fetchNextPage()
        },
        function done(err) {
          resolve(order)
        },
      )
  })
}
