/**
 * Side bar của trang web
 */
import { ShoppingCart, Report, WorkOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(-1);

  useEffect(() => {
    sideBar.forEach((element) => {
      if (location.pathname === element.linkTo) {
        setIsActive(element.id);
      }
    });
  });

  const sideBar = [
    {
      id: 0,
      linkTo: "/products",
      nameIcon: "WorkOutline",
      nameLink: "Sản phẩm",
    },
    {
      id: 1,
      linkTo: "/orders",
      nameIcon: "ShoppingCart",
      nameLink: "Đóng hàng",
    },
    {
      id: 2,
      linkTo: "/approve-orders",
      nameIcon: "LibraryAddCheckIcon",
      nameLink: "Duyệt đơn hàng",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu"></div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {sideBar.map((value, index) => (
              <Link to={value.linkTo} className="link" key={value.id}>
                <li
                  className={
                    index === isActive
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                  onClick={() => setIsActive(index)}
                >
                  {value.nameIcon === "WorkOutline" ? (
                    <WorkOutline className="sidebarIcon" />
                  ) : value.nameIcon === "ShoppingCart" ? (
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
      </div>
    </div>
  );
}
