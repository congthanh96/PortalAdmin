import Login from './Pages/Login/login';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from "./Components/topbar/Topbar"
//import './App.css'
// import Sidebar from './components/sidebar/Sidebar'
// import Topbar from './components/topbar/Topbar'
// import CreateSite from './pages/createSite/CreateSite'

export default function App() {
  const notistackRef = useRef()
  const dispatch = useDispatch()
  //const user = useSelector((state) => state.)

  const [token, setToken] = useState(() => {
    let isToken = localStorage.getItem('tokenADMIN')

    return isToken
  })

  useEffect(() => {
    console.log(token)
  }, [])


  const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }

  return (
    <BrowserRouter basename="/">
      <SnackbarProvider>
        <ScrollToTop />
        <Topbar token={token} setToken={setToken} />
        <Switch>
          <Route exact path="/">
            <Login token={token} setToken={setToken} />
          </Route>
          <Route exact path="/login">
            <Login token={token} setToken={setToken} />
          </Route>
        </Switch>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

