import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'
import Add from './pages/Add'
import Update from './pages/Update'
import { useRoutes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'


const routerConfig = [
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/detail/:id",
    element:<Detail/>
  },
  {
    path:"/add",
    element:<Add/>
  },
  {
    path:"/update/:id",
    element:<Update/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"*",
    element:<NotFound/>
  }
]
function App() {
  const router = useRoutes(routerConfig)
  return (
    <>
      {router}
    </>
  )
}

export default App
