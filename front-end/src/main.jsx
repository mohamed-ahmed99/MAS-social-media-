import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AppProvider} from './hooks/useMyStore.jsx'
import {UserProvider} from './hooks/useUserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UserProvider> {/* it has the data of user from the server */}

      <AppProvider> {/* it has data I need it instead of sending in props*/}

          <App />

      </AppProvider>

    </UserProvider>
    
  </StrictMode>
)
