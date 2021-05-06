import Airtable from 'airtable'
import uniqid from 'uniqid'
import { startCase } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import uniq from 'lodash/uniq'

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

export const useEquipment = () => {
  const [equipment, setEquipment] = useState([])

  const traits = useMemo(
    () => ({
      subCategories: getKey(equipment, 'sub_category'),
      categories: getKey(equipment, 'category'),
      brands: getKey(equipment, 'brand'),
      subSubCategories: getKey(equipment, 'sub_sub_category'),
    }),
    [equipment],
  )

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
const FUSE_CONFIG = { keys: ['name'], threshold: 0.2, minMatchCharLength: 2 }
const ONE_DAY = 1000 * 60 * 60 * 24
