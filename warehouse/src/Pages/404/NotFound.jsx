/**
 * Giao diện khi liên kết không tồn tại hoặc bị hỏng
 */
import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
const NotFound = () => (
  <div className="center">
    <div id="info">
      <h1>This page could not be found!!!</h1>
      <div>
        <Link to="/">Go Home</Link>
      </div>
      <img
        className="container-image"
        src="https://i.imgur.com/qIufhof.png"
        alt=""
      />
    </div>
  </div>
);

export default NotFound;
