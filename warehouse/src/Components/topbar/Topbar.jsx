import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../Assets/images/icon.png'
import logoNewee from '../../Assets/images/logo.png'
import { actLogout } from '../../Actions/AuthenticateAction/authenticateAction'
import './topbar.css'

export default function Topbar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogin = useSelector(state => state.authReducer.isLogin)

  const logOut = async () => {
    try {
      await dispatch(actLogout())
      localStorage.removeItem('tokenADMIN')
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
