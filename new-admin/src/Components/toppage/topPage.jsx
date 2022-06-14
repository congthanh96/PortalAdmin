import React from "react";
import { DATA_ROUTE } from "../../Common/constants";
import { Breadcrumb } from 'antd';
import "./topPage.css";
const topPage = ({ dataProps }) => {
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
                <a href={value.linkTo}>{value.nameLink}</a>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <div className="css-title">{lastItem}</div>
    </>
  );
};

export default topPage;
