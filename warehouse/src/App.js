import Login from './Pages/Login/login';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from "./Components/topbar/Topbar"
import NotFound from "./Pages/404/NotFound"
import './App.css'
import Sidebar from './Components/sidebar/Sidebar';


export default function App() {
  const notistackRef = useRef()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.authReducer.isLogin)
  // const [token, setToken] = useState(() => {
  //   let isToken = localStorage.getItem('tokenADMIN')
  //   return isToken
  // })

  const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }

  return (
    <BrowserRouter basename="/">

      <ScrollToTop />

      <Topbar/>
      <div className="container">
        {isLogin && <Sidebar />}
        <Suspense fallback={<div>Loading...</div>}>
          {isLogin ? (<></>) :
            (
              <Switch>
                <Route exact path="/">
                  <Login/>
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route path="*" component={NotFound} />

              </Switch>
            )}
        </Suspense>
      </div>
    </BrowserRouter >
  );
}

