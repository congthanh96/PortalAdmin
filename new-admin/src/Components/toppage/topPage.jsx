/**
 * Top của nội dung trang web
 */
import React from "react";
import { Breadcrumb } from 'antd';
import "./topPage.css";
import { Link } from "react-router-dom";
const TopPage = ({ dataProps }) => {
  // let data = DATA_ROUTE.filter((item) => dataProps.includes(item.nameLink));
  const lastItem = [...dataProps].pop().nameLink 
  return (
    // <>
    //   <div>
    //     {data.map((value, index) => {
    //       return (
    //         <div key={value.nameLink} className="css-chain">
    //           {data.length - 1 === index ? (
    //             <>{value.nameLink}</>
    //           ) : (
    //             <>
    //               <a href={value.linkTo}>{value.nameLink}</a>
    //               <RightOutlined style={{ height: 30, width: 30 }} />
    //             </>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className="css-title">{lastItem}</div>
    // </>
   
    <>
      <Breadcrumb>
        {dataProps.map((value, index) => {
          return (
            <Breadcrumb.Item key={index}>
              {dataProps.length - 1 === index ? (
                <>{value.nameLink}</>
              ) : (
                <Link to={value.linkTo}>{value.nameLink}</Link>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <div className="css-title">{lastItem}</div>
    </>
  );
};

export default TopPage;
