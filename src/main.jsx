import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import './assets/css/setting/_common.css'
import Home from './pages/Home'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/makeRoute' element={<Home />} />
        <Route path='/searchingRoute' element={<Home />} />
        <Route path='/searchingPlace' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
