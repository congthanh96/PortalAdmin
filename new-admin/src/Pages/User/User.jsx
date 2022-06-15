/**
 * Chi tiết tài khoản
 */
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import TopPage from "../../Components/toppage/topPage";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { Input, Spin, Collapse, Card, Avatar, Button } from "antd";
import { usersAPI } from "../../APIs";
import { toast } from "react-toastify";
import NoData from "../../Components/NoData/NoData";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SaveFilled,
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
  const [srcImgCardBefore, setSrcImgCardBefore] = useState("");
  const [srcImgCarAfter, setSrcImgCardAfter] = useState("");
  const [fileCardBefore, setFilImgCardBefore] = useState("");
  const [fileCarAfter, fileCardAfter] = useState("");
  const [referralCode, setReferralCode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await usersAPI.getUserByID(userID);
        setUser(res);
        setSrcImgCardBefore(res.urlIDCardBefore);
        setSrcImgCardAfter(res.urlIDcCardAffter);
        setReferralCode(res.iDrecommend);
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

  const handleUpdateCardBefore = (event) => {
    // let temp = {...user,urlIDCardBefore:(event.target.files[0])}
    // setSrcImgCardBefore(event.target.res)
    // console.log(temp)
    const [file] = event.target.files;
    setSrcImgCardBefore(URL.createObjectURL(file));
    console.log(file)
  };
  const genExtra = () => (
    <SaveFilled
      style={{ fontSize: "150%" }}
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
        saveImgCard();
      }}
    />
  );
  const saveImgCard = () => {};
  const saveReferralCode = async () => {
    console.log(referralCode);
    // var data = JSON.stringify({
    //   userName: email,
    //   password: password,
    // });
    let temp = { ...user, iDrecommend: referralCode };
    setUser(temp);
    try {
      let data = JSON.stringify({
        id: temp.id,
        lastName: temp.lastName,
        firstName: temp.first === " " ? temp.lastName : temp.first,
        phone: temp.phoneNumber,
        email: temp.email,
        password: "123@Admin",
        passwordConfirm: "123@Admin",
        urlIDCardBefore: temp.urlIDcCardAffter,
        urlIDCardAffter: temp.urlIDCardBefore,
        urlAvatar: temp.urlAvatar,
        cmndNgayCap: temp.cmndNgayCap,
        cmndSo: temp.cmndSo,
        cmndNoiCap: temp.cmndNoiCap,
        iDrecommend: temp.iDrecommend,
      });
      const res = await usersAPI.updateUserByID(data);
      toast.success("Cập nhật mã giới thiệu thành công");
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
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
                    style={{ objectFit: "contain" }}
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
            <Collapse
              // defaultActiveKey={["1"]}
              onChange={onChange}
            >
              <Panel header="Thông tin CMND/CCCD" key="1" extra={genExtra()}>
                <div className="css-data-component">
                  <p>Ngày cấp: {user.cmndNgayCap || <NoData />}</p>
                  <p>Nơi cấp: {user.cmndNoiCap || <NoData />}</p>
                  <p>Số: {user.cmndSo || <NoData />}</p>
                  <hr />
                  <div className="userUpdateUpload">
                    <p>Mặt trước CMND/CCCD:</p>
                    <label htmlFor="imgBefore">
                      <img
                        className="userUpdateImg"
                        src={
                          srcImgCardBefore ||
                          "https://newee.asia/asset/images/0408/logo.png"
                        }
                        alt=""
                      />
                    </label>
                    <hr />
                    <label htmlFor="imgAfter">
                      <p>Mặt sau CMND/CCCD:</p>
                      <img
                        className="userUpdateImg"
                        src={
                          srcImgCarAfter ||
                          "https://newee.asia/asset/images/0408/logo.png"
                        }
                        alt=""
                      />
                    </label>

                    {/* <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label> */}
                    <input
                      type="file"
                      id="imgBefore"
                      style={{ display: "none" }}
                      onChange={handleUpdateCardBefore}
                    />
                    <input
                      type="file"
                      id="imgAfter"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </Panel>
              <Panel header="Thông tin tài khoản ngân hàng" key="2">
                <div className="css-data-component">
                  <p>Ngân hàng: {user.bankName || <NoData />}</p>
                  <p>Tên chủ tài khoản: {user.holderName || <NoData />}</p>
                  <p>Số thẻ: {user.cardNumber || <NoData />}</p>
                  <p>Số tài khoản: {user.accountNumber || <NoData />}</p>
                  <p>
                    Ngày cấp:{" "}
                    {user.issueTme === "0/0" ? <NoData /> : user.issueTme}
                  </p>
                </div>
              </Panel>
              <Panel header="Thông tin người giới thiệu" key="3">
                <Input.Group compact className="css-data-component">
                  <Input
                    style={{ width: "calc(100% - 500px)" }}
                    defaultValue={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <Button type="primary" onClick={saveReferralCode}>
                    Submit
                  </Button>
                </Input.Group>
              </Panel>
            </Collapse>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default User;
