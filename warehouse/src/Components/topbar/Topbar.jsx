/**
 * Topbar của trang web
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../../Assets/images/icon.png";
import logoNewee from "../../Assets/images/logo.png";
import { actLogout } from "../../Actions/AuthenticateAction/authenticateAction";
import { toastr } from "react-redux-toastr";
import "./topbar.css";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const logOut = async () => {
    try {
      await dispatch(actLogout());
      localStorage.removeItem("tokenADMIN");
      history.push("/login");
    } catch (err) {
      toastr.error(err);
    }
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link className="logo" to="/">
            <img src={logoNewee} alt="" className="topLogo" />
          </Link>
        </div>
        <div className="topRight">
          <img src={logo} alt="" className="topAvatar" />

          {isLogin ? (
            <div
              className=""
              onClick={logOut}
              style={{ marginLeft: 10, marginRight: 10, cursor: "pointer" }}
            >
              Đăng xuất
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
