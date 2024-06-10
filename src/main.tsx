import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'

import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme
    appearance='dark'
    accentColor='mint'
    grayColor='sage'
    panelBackground='translucent'
    >
      <Router />
    </Theme> 
  </React.StrictMode>,
)
