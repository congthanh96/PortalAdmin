/**
 * Chi tiết tài khoản
 */
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import TopPage from "../../Components/toppage/topPage";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { Input, Spin, Collapse, Card, Avatar } from "antd";
import { usersAPI } from "../../APIs";
import { toast } from "react-toastify";
import NoData from "../../Components/NoData/NoData";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./user.css";
const { Panel } = Collapse;
const { Meta } = Card;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const User = () => {
  let { userID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await usersAPI.getUserByID(userID);
        setUser(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Không tồn tại user");
      }
    };

    fetchData();
  }, [userID]);

  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/users",
      nameLink: "Danh sách tài khoản",
    },
    {
      linkTo: "/user/" + { userID },
      nameLink: "Tài khoản",
    },
  ];

  const onChange = (key) => {
    console.log(key);
    console.log(user);
  };
  return (
    <div className="user-container">
      <Spin spinning={isLoading}>
        <TopPage dataProps={dataTop} />
        <div className="container-data">
          <div className="container-data-item">
            <Card
              style={{ width: 400, padding: 4 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      user?.urlAvatar === 0 ||
                      "https://newee.asia/asset/images/0408/logo.png"
                    }
                  />
                }
                title={user.first + " " + user.lastName}
              />
              <div style={{ marginTop: 20 }}>
                Email: {user.email}
                <br />
                Số điện thoại: {user.phoneNumber}
              </div>
            </Card>
          </div>
          <div className="container-data-item css-infor">
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header="Thông tin tài khoản ngân hàng" key="1">
                <p>Ngân hàng: {(user.bankName==="")?<NoData/>:user.bankName}</p>
                <p>Tên chủ tài khoản: {(user.holderName==="")?<NoData/>:user.holderName}</p>
                <p>Số thẻ: {(user.cardNumber==="")?<NoData/>:user.cardNumber}</p>
                <p>Số tài khoản: {(user.accountNumber==="")?<NoData/>:user.accountNumber}</p>
                <p>Ngày cấp: {(user.issueTme==="0/0")?<NoData/>:user.issueTme}</p>
              </Panel>
              <Panel header="Thông tin chứng minh nhân dân" key="2">
                <p>Ngày cấp: {(user.cmndNgayCap==="")?<NoData/>:user.cmndNgayCap}</p>
                <p>Nơi cấp: {(user.cmndNoiCap==="")?<NoData/>:user.cmndNoiCap}</p>
                <p>Số: {(user.cmndSo==="")?<NoData/>:user.cmndSo}</p>
              </Panel>
              <Panel header="Thông tin người giới thiệu" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default User;
