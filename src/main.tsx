import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Main from './pages/Main.tsx'
import Courts from './pages/Courts.tsx'
import Login from './pages/Login.tsx'
import { store  } from './store/store.ts'
import SignUp from './pages/SignUp.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import AdminDashboard from './components/AdminDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Main/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<SignUp/>}/>
            <Route path='courts' element={<Courts/>}/>
          </Route>
          <Route path='/admin' element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }>
            </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
