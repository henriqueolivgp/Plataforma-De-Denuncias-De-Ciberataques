import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './client/routes/App'
import './client/theme/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
