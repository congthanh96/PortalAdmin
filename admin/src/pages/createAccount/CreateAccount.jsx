// Đăng ký tài khoản mới với role là admin và validate các field 
// Huynh-dt
// 2022/04/12 - 2022/04/13

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
//import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';


const API = `https://api.newee.asia:6001`;


const useStyles = makeStyles(theme => ({
  title:{
    fontSize:20,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10),

    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

export default function CreateAccount({ handleClose }) {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Admin');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputProps, setInputProps] = useState({
    error: false,
    helperText: ""
  });

  // xử lý khi tạo một tài khoản
  const handleSubmit = e => {

    e.preventDefault();
    if (!handleConfirmPassword()) {
      return;
    }
    //console.log(firstName, lastName, email, password,);

    let data = {
      "userName": email,
      "passWord": password,
      "lastName": lastName,
      "firstName": firstName,
      "phone": phone,
      "email": email,
      "roles": [role],
    }
    //console.log(data);

    axios(`${API}/Newee/Manager/CreateUser`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${user}`,
      },
      method: "POST",
      data: JSON.stringify(data),
    })
      .then(function (response) {
        //handle success
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        enqueueSnackbar("Success", {
          variant: 'success',
          preventDuplicate: true
        });
        //console.log(response);
      })
      .catch(function (response) {
        //handle error
        enqueueSnackbar("Failed", {
          variant: 'error',
          preventDuplicate: true
        });
        //console.log(response);
      });
  };

  // xử lý khi nhập lại mật khẩu 
  const handleConfirmPassword = (e) => {
    if (confirmPassword !== password) {
      setInputProps({
        error: true,
        helperText: "Passwords don't match!"
      })
      return false;
    }
    else {
      setInputProps({
        error: false,
        helperText: ""
      })
      return true;
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <label className={classes.title}>
        Create Account
      </label>

      <TextField
        label="First Name"
        variant="standard"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />

      <TextField
        label="Last Name"
        variant="standard"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

      <TextField
        label="Email"
        variant="standard"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        variant="standard"
        type="password"
        inputProps={{ className: classes.input, pattern: "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}" }}
        required
        helperText="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <TextField
        {...inputProps}
        label="Confirm Password"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <TextField
        label="Phone"
        variant="standard"
        required
        inputProps={{ className: classes.input, pattern: "(84|0[3|5|7|8|9])+([0-9]{8})" }}
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <TextField
        label="Role"
        variant="standard"
        defaultValue={role}
        InputProps={{
          readOnly: true,
        }}
      />
      {/* <TextField variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </TextField> */}
      <div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </div>
    </form>

    // {/* <>
    // <ValidatorForm
    //     ref="form"
    //     onSubmit={this.handleSubmit}
    //     onError={errors => console.log(errors)}
    // >
    //     <TextValidator
    //         label="Email"
    //         onChange={this.handleChange}
    //         name="email"
    //         value={email}
    //         validators={['required', 'isEmail']}
    //         errorMessages={['this field is required', 'email is not valid']}
    //     />
    //     <Button type="submit">Submit</Button>
    // </ValidatorForm>
    // </> */}
  );
};