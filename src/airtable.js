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
const getEquipment = () => {
  return new Promise((resolve) => {
    let equipment = JSON.parse(localStorage.getItem('equipment')) || []

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
          localStorage.setItem('equipment', JSON.stringify(equipment))
          localStorage.setItem('last-fetch', JSON.stringify(+new Date()))
          resolve(equipment)
        },
      )
  })
}

const setDefault = (obj, key, value) => {
  set(obj, key, get(obj, key, value))
  return get(obj, key, value)
}

export const useEquipment = () => {
  const [equipment, setEquipment] = useState([])

  const traits = useMemo(() => {
    let categories = {}

    equipment.forEach((e) => {
      setDefault(categories, `${e.category}`, {})
      if (e.sub_category) {
        const subKey = `${e.category}.${e.sub_category}`
        setDefault(categories, subKey, {})
        if (e.sub_sub_category) {
          const subSubKey = `${subKey}.${e.sub_sub_category}`
          const subSub = setDefault(categories, subSubKey, [])
          set(categories, subSubKey, [...subSub, e])
        }
      }
    })
    return {
      categories,
      brands: getKey(equipment, 'brand'),
    }
  }, [equipment])

  const fuse = useMemo(() => new Fuse(equipment, FUSE_CONFIG), [equipment])

  useEffect(() => {
    const lastFetch = localStorage.getItem('last-fetch')

    const msPassed = +new Date() - (+lastFetch || +new Date())

    if (msPassed > ONE_DAY) {
      localStorage.removeItem('equipment')
    }

    getEquipment().then(setEquipment)
  }, [])

  return { traits, fuse: fuse, equipment }
}

const sortAlpha = (a, b) => a.localeCompare(b)
const getKey = (arr, key) => uniq(arr?.map((d) => d[key]) || []).sort(sortAlpha)
const FUSE_CONFIG = { keys: ['name'], threshold: 0.2, minMatchCharLength: 1 }
const ONE_DAY = 1000 * 60 * 60 * 24
