import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Main from './pages/Main.tsx'
import Courts from './pages/Courts.tsx'
import Auth from './pages/Auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Main/>}/>
          <Route path='login' element={<Auth/>}/>
          <Route path='courts' element={<Courts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
