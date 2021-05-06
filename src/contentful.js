import * as contentful from 'contentful'
import dotenv from 'dotenv'

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
