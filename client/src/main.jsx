import {AuthProvider} from './context/Auth.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </AuthProvider>
)
