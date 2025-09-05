import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRouter from './router/AppRouter'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import { TrainerProvider } from './context/TrainerContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrainerProvider>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </TrainerProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
