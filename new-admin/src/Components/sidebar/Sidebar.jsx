/**
 * Side bar của trang web
 */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DATA_ROUTE } from "../../Common/constants";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(-1);

  useEffect(() => {
    sideBar.forEach((element,index) => {
      if (location.pathname === element.linkTo) {
        setIsActive(index);
      }
    });
  });

  const sideBar = DATA_ROUTE.filter((e, index) => {
    return e.linkTo !== "/";
  });

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {/* <div className="sidebarMenu"> */}
        <h3 className="sidebarTitle">Quản lý</h3>
        <ul className="sidebarList">
          {sideBar.map((value, index) => (
            <Link to={value.linkTo} className="link" key={value.nameLink}>
              <li
                className={
                  index === isActive
                  ? "sidebarListItem active"
                      : "sidebarListItem"
                }
                onClick={() => setIsActive(index)}
              >
                {value.nameLink}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
