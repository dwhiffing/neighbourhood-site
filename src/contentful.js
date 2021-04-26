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
  return response.items.map((i) => i.fields)
}

// TODO: Mobile
// TODO: Feed images need to be aligned correctly
// TODO: deploy
// TODO: Feed images/articles need to be links
// TODO: Studio tags needs to be links
// TODO: FAQ needs to embed anchor tags
// TODO: improve equipment page

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
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
    {
      name: 'B10 PLUS',
      brand: 'Profoto',
      category: 'Lighting',
      image: 'https://i.ibb.co/nRb2tks/placeholder.png',
    },
  ]
}
