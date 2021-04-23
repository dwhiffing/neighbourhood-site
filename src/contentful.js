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

export const getStudios = () => getEntriesByType('studio')

export const getAbout = () => getEntriesByType('about')
export const getFaq = () => getEntriesByType('faq')

export const getFeed = async () => {
  const response = await fetch(
    'https://api.are.na/v2/channels/heat-iq9mikkaxpm?per=24',
  )
  const response2 = await fetch(
    'https://api.are.na/v2/channels/memory-dkh65nqsv8i?per=24',
  )
  // console.log(response, response2)
  return []
}

export const getEquipment = () => {
  return []
}
