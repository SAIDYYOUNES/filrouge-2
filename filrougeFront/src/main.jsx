import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './Context/Context'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
      <Context>
        <Provider store={store}>
        <App />
        </Provider>
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
)
