import path from 'path'
import {
  getStudios,
  getAbout,
  getFeed,
  getEquipment,
  getFaq,
} from './src/contentful'

const config = {
  getSiteData: async () => {
    const studios = await getStudios()
    const about = await getAbout()
    const feed = await getFeed()
    const equipment = await getEquipment()
    const faq = await getFaq()
    return { studios, about, feed, equipment, faq }
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-tailwindcss'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}

export default config
