import path from 'path'
import {
  getStudios,
  getAbout,
  getFeed,
  getEquipment,
  getFaq,
} from './src/contentful'

const config = {
  getRoutes: async () => {
    const studios = await getStudios()
    const about = await getAbout()
    const faq = await getFaq()
    const feed = await getFeed()
    const equipment = await getEquipment()

    return [
      {
        path: '/studios',
        getData: () => ({ studios }),
      },
      {
        path: '/about',
        getData: () => ({ about }),
      },
      {
        path: '/feed',
        getData: () => ({ feed }),
      },
      {
        path: '/equipment',
        getData: () => ({ equipment }),
      },
      {
        path: '/',
        getData: () => ({ faq }),
      },
    ]
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
