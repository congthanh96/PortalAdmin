/**
 * Trang đăng nhập
 */
import React, { useState, useContext } from "react";

import { Button, Form, Input, Space } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../../APIs";

import { UserContext,UpdateUserContext } from "../../Context/UserContext";

const Login = () => {
  // const dispatch = useDispatch();
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const updateUser = useContext(UpdateUserContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Xử lý khi nhập email và mật khẩu
  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  //Xử lý khi ấn button đăng nhập
  const handleSubmitLogin = async () => {
    try {
      var data = JSON.stringify({
        userName: state.email,
        password: state.password,
      });

      const response = await authAPI.login(data);
      console.log(response);
      updateUser({ type: "LOGIN_SET", userName: response.username, isLogin:true });
      localStorage.setItem("tokenADMIN", response.token);
      localStorage.setItem("userName",response.username)
      navigate("/");
    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Đăng nhập thất bại!");
      }
    }
  };

  return (
    <div className="pageLogin">
      <Form>
        <Form.Item
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Form.Item
            style={{ fontSize: 20, marginBottom: 0 }}
            label={<p style={{ fontSize: "20px" }}>Tài khoản</p>}
          ></Form.Item>
          <Input
            name="email"
            className="container-input"
            placeholder="email"
            prefix={<UserOutlined />}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Form.Item style={{ marginBottom: 0, fontSize: 20 }}>
            {<p style={{ fontSize: "20px" }}>Mật khẩu</p>}
          </Form.Item>
          <Space direction="vertical" className="content">
            <Input.Password
              name="password"
              className="container-input"
              placeholder="password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleChange}
            />
          </Space>
        </Form.Item>
        <Button className="btn-login" onClick={() => handleSubmitLogin()}>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default Login;
