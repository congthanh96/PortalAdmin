/**
 * Danh sách sản phẩm
 */

 import React from 'react';
 import "./users.css";
 import TopPage from "../../Components/toppage/topPage"
 const Users = () => {
    
   const data = ["Trang chủ", "Tài khoản"]
   return (
     <div className="users-container">
       <TopPage dataProps={data}/>
     </div>
   );
 }
 export default Users
 