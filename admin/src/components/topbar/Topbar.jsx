import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/images/icon.png'
import logoNewee from '../../assets/images/logo.png'
import { Logout } from '../../reducers'
import './topbar.css'

export default function Topbar({ token, setToken }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const logOut = async () => {
    try {
      await dispatch(Logout())

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
          <div style={{ marginRight: 12 }}>31/03/2022</div>
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img src={logo} alt="" className="topAvatar" />

          <div
            className=""
            onClick={logOut}
            style={{ marginLeft: 10, marginRight: 10, cursor: 'pointer' }}
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  )
}
