import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Toaster } from 'sonner'
import AppInitializer from './components/AppInitializer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppInitializer>

    <App />
      </AppInitializer>

    <Toaster richColors position="top-right" />
    </Provider>
  </StrictMode>,
)
