import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/setting/_common.css'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>
)
