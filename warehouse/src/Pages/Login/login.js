import React, { useState } from 'react'
//import NoSSR from 'react-no-ssr'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../Components/material/Button'
import CustomInput from '../../Components/material/CustomInput'
import * as constant from "../../Common/constants"
import './login.css'

function Login({ token, setToken }) {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value })
  }
  const history = useHistory()
  const handleSubmitLogin = async () => {
    try {
      await fetch('https://api.newee.asia:6001/Newee/Manager/Login', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userName: state.email,
          password: state.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          dispatch({
            type: constant.LOGIN,
            user: res,
          })

          setToken(res.data.token)

          history.push(`/`)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="form-login">
        <h3>Đăng nhập - Meta</h3>
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="password"
        />
        <Button
          type="button"
          color="primary"
          className="form__custom-button"
          onClick={() => handleSubmitLogin()}
        >
          Đăng nhập
        </Button>
        <Link to="/blog">
          <Button type="button" color="primary" className="form__custom-button">
            Test - blog
          </Button>
        </Link>
      </div>
  )
 // return <NoSSR>{content}</NoSSR>
}

export default Login
