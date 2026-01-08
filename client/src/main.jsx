import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ייבוא כלי הניווט
import App from './App.jsx' // ייבוא הקומפוננטה הראשית שלך

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ה-BrowserRouter חייב לעטוף את App כדי שה-useNavigate יעבוד */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)