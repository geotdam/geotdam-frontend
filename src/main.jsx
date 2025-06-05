import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/setting/_common.css'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makeRoute" element={<Home />} />
        <Route path="/searchingRoute" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
