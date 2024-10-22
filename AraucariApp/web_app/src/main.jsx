import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute.jsx';
import App from './App.jsx'
import Login from './views/Login.jsx'
import ReiniciarContrasena from './views/OlvidarContraseña.jsx'
import './index.css'
import { UserProvider } from './components/userContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      
      <Route path="/" element={<UserProvider><AuthRoute component={App} /> </UserProvider>} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ReiniciarContrasena />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
