import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Condisonal } from './components/Condisonal.jsx'
import { RederingList } from './components/RederingList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Condisonal />
    <RederingList/>
  </StrictMode>,
)
