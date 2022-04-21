import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css"
const NotFound = () => (
  <div className='center'>
    <div id="info">
      <h3>This page could not be found</h3>
      <Link to="/">
      Go Home
    </Link>
   
  <img src="https://i.imgur.com/qIufhof.png" />
  </div>
  </div>
);

export default NotFound;