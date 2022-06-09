import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { DATA_ROUTE } from "../../Common/constants";
import "./topPage.css";
const topPage = ({ dataProps }) => {
  let data = DATA_ROUTE.filter((item) => dataProps.includes(item.nameLink));
  const lastItem = [...data].pop().nameLink 
  return (
    <>
      <div>
        {data.map((value, index) => {
          return (
            <div key={value.nameLink} className="css-chain">
              {data.length - 1 === index ? (
                <>{value.nameLink}</>
              ) : (
                <>
                  <a href={value.linkTo}>{value.nameLink}</a>
                  <RightOutlined style={{ height: 30, width: 30 }} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="css-title">{lastItem}</div>
    </>
  );
};

export default topPage;
