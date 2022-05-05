import {
  ShoppingCart,
  Report,
  WorkOutline,
} from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export default function Sidebar() {
  const [isActive, setIsActive] = useState(-1);
  const sideBar = [
    {
      id: 1,
      linkTo: "/products",
      nameIcon: "WorkOutline",
      nameLink: "Sản phẩm",
    },
    { id: 2, linkTo: "/orders", nameIcon: "ShoppingCart", nameLink: "Đóng hàng" },
    { id: 3, linkTo: '/approve-orders', nameIcon: 'LibraryAddCheckIcon', nameLink: 'Duyệt đơn hàng' },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={isActive === -1 ? 'sidebarListItem active' : 'sidebarListItem'}
                onClick={() => setIsActive(-1)}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul> */}
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {sideBar.map((value, index) => (
              <Link to={value.linkTo} className="link" key={value.id}>
                <li
                  className={
                    isActive === index
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                  onClick={() => setIsActive(index)}
                >
                  { value.nameIcon === "WorkOutline" ? (
                    <WorkOutline className="sidebarIcon" />
                  )  : value.nameIcon === "ShoppingCart" ? (
                    <ShoppingCart className="sidebarIcon" />
                  ) : value.nameIcon === "LibraryAddCheckIcon" ? (
                    <LibraryAddCheckIcon className="LibraryAddCheckIcon" />
                  ) : (
                    <Report className="sidebarIcon" />
                  )}
                  {value.nameLink}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/settings" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Settings
              </li>
            </Link>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
