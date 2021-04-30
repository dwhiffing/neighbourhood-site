import * as contentful from 'contentful'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

export const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
})

export const getEntriesByType = async (type) => {
  const response = await client.getEntries({ content_type: type })
  return response.items
    .map((i) => i.fields)
    .sort(({ index: aIndex = 99 }, { index: bIndex = 99 }) => aIndex - bIndex)
}

export const getStudios = () => getEntriesByType('studio')
export const getAbout = () => getEntriesByType('about')
export const getFaq = () => getEntriesByType('faq')

export const getFeed = async () => {
  const _images = await fetch(
    'https://api.are.na/v2/channels/heat-iq9mikkaxpm?per=24',
  )
  const _posts = await fetch(
    'https://api.are.na/v2/channels/memory-dkh65nqsv8i?per=24',
  )
  const images = await _images.json()
  const posts = await _posts.json()

  return [...images.contents, ...posts.contents]
}

export const getEquipment = () => {
  return [
    {
      id: 0,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 1,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 2,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 3,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 4,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 5,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 6,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 7,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 8,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      id: 9,
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
  ]
}
