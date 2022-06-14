/**
 * Topbar của trang web
 */
import React, { useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import logo from "../../Assets/images/icon.png";
import logoNewee from "../../Assets/images/logo.png";
import checkAuth from "../../Utils/checkAuth";
import { UserContext, UpdateUserContext} from "../../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {LogoutOutlined} from '@ant-design/icons';
import "./topbar.css";

export default function Topbar() {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const user = useContext(UserContext)
  const updateUser = useContext(UpdateUserContext);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      updateUser({ type: "LOGIN_SET", userName: "", isLogin:false });
      localStorage.removeItem("tokenADMIN");
      localStorage.removeItem("userName");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div>
          <Link className="logo" to="/">
            <img src={logoNewee} alt="" className="topLogo" />
          </Link>
        </div>
        <div className="topRight">
          {user.isLogin ? (
            <>  
            <div className="css-name">
              {user.userName}
            </div>
              <div
                className="css-logout"
                onClick={logOut}
              >
                <LogoutOutlined  />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
