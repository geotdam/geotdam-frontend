import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import './assets/css/setting/_common.css'
import Home from './pages/Home'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Home />
  </StrictMode>
)
