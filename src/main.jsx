import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRouter from './router/AppRouter'
import { LanguageProvider } from './context/LanguageContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
