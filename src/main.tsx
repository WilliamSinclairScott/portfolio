import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'

import { Theme } from '@radix-ui/themes'
import './index.css'
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme
    appearance='dark'
    accentColor='mint'
    grayColor='sage'
    panelBackground='translucent'
    className='background'
    >
      <Router />
    </Theme> 
  </React.StrictMode>,
)
