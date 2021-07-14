

import React from 'react'
import universal, { setHasBabelPlugin } from 'react-universal-component'

setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
  ignoreBabelRename: true
}

const t_0 = universal(import('__react_static_root__/src/pages/404.js'), universalOptions)
      t_0.template = '__react_static_root__/src/pages/404.js'
      
const t_1 = universal(import('__react_static_root__/src/pages/equipment/Cart.js'), universalOptions)
      t_1.template = '__react_static_root__/src/pages/equipment/Cart.js'
      
const t_2 = universal(import('__react_static_root__/src/pages/equipment/index.js'), universalOptions)
      t_2.template = '__react_static_root__/src/pages/equipment/index.js'
      
const t_3 = universal(import('__react_static_root__/src/pages/equipment/Sidebar.js'), universalOptions)
      t_3.template = '__react_static_root__/src/pages/equipment/Sidebar.js'
      
const t_4 = universal(import('__react_static_root__/src/pages/expendables.js'), universalOptions)
      t_4.template = '__react_static_root__/src/pages/expendables.js'
      
const t_5 = universal(import('__react_static_root__/src/pages/feed.js'), universalOptions)
      t_5.template = '__react_static_root__/src/pages/feed.js'
      
const t_6 = universal(import('__react_static_root__/src/pages/index.js'), universalOptions)
      t_6.template = '__react_static_root__/src/pages/index.js'
      
const t_7 = universal(import('__react_static_root__/src/pages/services.js'), universalOptions)
      t_7.template = '__react_static_root__/src/pages/services.js'
      
const t_8 = universal(import('__react_static_root__/src/pages/studios.js'), universalOptions)
      t_8.template = '__react_static_root__/src/pages/studios.js'
      

// Template Map
export default {
  '__react_static_root__/src/pages/404.js': t_0,
'__react_static_root__/src/pages/equipment/Cart.js': t_1,
'__react_static_root__/src/pages/equipment/index.js': t_2,
'__react_static_root__/src/pages/equipment/Sidebar.js': t_3,
'__react_static_root__/src/pages/expendables.js': t_4,
'__react_static_root__/src/pages/feed.js': t_5,
'__react_static_root__/src/pages/index.js': t_6,
'__react_static_root__/src/pages/services.js': t_7,
'__react_static_root__/src/pages/studios.js': t_8
}
// Not Found Template
export const notFoundTemplate = "__react_static_root__/src/pages/404.js"

