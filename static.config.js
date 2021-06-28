import path from 'path'
import {
  getStudios,
  getAbout,
  getFaq,
  getPosts,
  getServices,
  getURL,
} from './src/contentful'

const config = {
  getSiteData: async () => {
    const studios = await getStudios()
    const about = await getAbout()
    const services = await getServices()
    const posts = await getPosts()
    const faq = await getFaq()
    const urls = await getURL()
    return { studios, services, posts, about, faq, urls }
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
