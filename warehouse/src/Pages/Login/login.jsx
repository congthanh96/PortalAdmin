import React, { useState } from 'react'
import NoSSR from 'react-no-ssr'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../Components/material/Button'
import CustomInput from '../../Components/material/CustomInput'
import * as constant from "../../Common/constants"
import './login.css'
import { actLogin } from '../../Actions/AuthenticateActions/authenticateActions'
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
    console.log(state)
    try {
      // await fetch('https://api.newee.asia:6001/Newee/Manager/Login', {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({
      //     userName: state.email,
      //     password: state.password,
      //   }),
      // })
      //   .then((response) => console.log(response.json()))
      // //   .then((res) => {
      //     dispatch({
      //       type: constant.LOGIN,
      //       //user: res,
      //     })
      dispatch(actLogin(state.email, state.password));
      //setToken(res.data.token)

      history.push(`/`)
      //})
    } catch (error) {
      console.log(error)
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
