import path from 'path'
import { getStudios, getAbout } from './src/contentful'

const config = {
  getRoutes: async () => {
    const studios = await getStudios()
    const about = await getAbout()

    return [
      {
        path: '/studios',
        getData: () => ({ studios }),
      },
      {
        path: '/about',
        getData: () => ({ about }),
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
