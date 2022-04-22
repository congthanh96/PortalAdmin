import React, { useState } from 'react'
import NoSSR from 'react-no-ssr'
import { useDispatch } from 'react-redux'
import {useHistory } from 'react-router-dom'
import Button from '../../Components/material/Button'
import CustomInput from '../../Components/material/CustomInput'
import './login.css'
import { actLogin } from '../../Actions/AuthenticateAction/authenticateAction'



function Login() {
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
    console.log(state)
    try {
       await dispatch(
        actLogin(state.email, state.password));
        history.push('/')
        //console.log("login successs")
    } catch (error) {
      console.log(error+"đá")
    }
  }

  const content = (
    <div className="pageLogin">
      <div className="formLogin">
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
          className="formCustomButton"
          onClick={() => handleSubmitLogin()}
        >
          Đăng nhập
        </Button>
      </div>

    </div>
  )
  return <NoSSR>{content}</NoSSR>
}

export default Login
