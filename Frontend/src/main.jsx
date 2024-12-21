import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider,Route,Link} from 'react-router-dom'
import Home from './components/home.jsx'
import Register from './components/register.jsx'
import Login from './components/login.jsx'
import Dashbord from './components/dashbord.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/dashbord",
    element:<Dashbord/>
  },
  {
    path:"register",
    element:<Register/>
  },
  {
    path:"login",
    element:<Login/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
