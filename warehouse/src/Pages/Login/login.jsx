/**
 * Trang đăng nhập
 */
import React, { useState } from "react";
import NoSSR from "react-no-ssr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Input, Space, Typography, Form } from "antd";
import { actLogin } from "../../Actions/AuthenticateAction/authenticateAction";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { toastr } from "react-redux-toastr";
import "./login.css";
const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Xử lý khi nhập email và mật khẩu
  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  // Xử lý khi ấn button đăng nhập
  const handleSubmitLogin = async () => {
    try {
      await dispatch(actLogin(state.email, state.password));

      // Xử lý khi đăng nhập thành công => sang trang chủ
      if (isLogin === true) {
        history.push("/");
      }
    } catch (error) {
      toastr.error("Đăng nhập thất bại!");
    }
  };

  const content = (
    <div className="pageLogin">
      <div className="formLogin">
        <Title level={3}>Đăng nhập - Warehouse Newee</Title>
        <Form form={form}>
          <Form.Item
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Form.Item
              style={{ marginBottom: 0 }}
              label="Tên đăng nhập"
            ></Form.Item>
            <Input
              name="email"
              size="large"
              placeholder="email"
              prefix={<UserOutlined />}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Form.Item style={{ marginBottom: 0 }} label="Mật khẩu"></Form.Item>
            <Space direction="vertical" className="content">
              <Input.Password
                name="password"
                size="large"
                placeholder="password"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={handleChange}
                className=""
              />
            </Space>
          </Form.Item>
        </Form>
        <Button
          className="btn-login"
          type="primary"
          onClick={() => handleSubmitLogin()}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
  return <NoSSR>{content}</NoSSR>;
}

export default Login;
