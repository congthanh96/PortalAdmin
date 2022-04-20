import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../Assets/images/icon.png'
import logoNewee from '../../Assets/images/logo.png'
import { actLogout } from '../../Actions/AuthenticateActions/authenticateActions'
import './topbar.css'
import { timeoutPromise } from '../../Utils/timeOut'
import authReducer from '../../Reducers/AuthenticateReducer/authenticateReducer'

export default function Topbar({ token, setToken }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogin = useSelector(state => state.authReducer.isLogin)
  console.log(isLogin)
  // useEffect(
  //   if(token!===null)
  //   {
  //     dispatch(authReducer())
  //   }
  // )
  const logOut = async () => {
    try {
      await dispatch(actLogout())
      localStorage.removeItem('tokenADMIN')
      setToken(null)
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link className="logo" to="/">
            <img src={logoNewee} alt="" className="topLogo" />
          </Link>
        </div>
        <div className="topRight">
          <div style={{ marginRight: 12 }}>{Date()}</div>
          <img src={logo} alt="" className="topAvatar" />

          {isLogin ?
            <div
              className=""
              onClick={logOut}
              style={{ marginLeft: 10, marginRight: 10, cursor: 'pointer' }}
            >
              Đăng xuất
            </div> :
            <></>
          }
        </div >
      </div>
    </div>
  )
}
