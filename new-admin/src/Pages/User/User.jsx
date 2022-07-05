/**
 * Chi tiết tài khoản
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopPage from "../../Components/toppage/topPage";
import { Input, Spin, Collapse, Card, Avatar, Button } from "antd";
import { usersAPI, imageAPI } from "../../APIs";
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

const User = () => {
  let { userID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [srcImgCardBefore, setSrcImgCardBefore] = useState("");
  const [srcImgCarAfter, setSrcImgCardAfter] = useState("");
  const [fileCardBefore, setFileImgCardBefore] = useState("");
  const [fileCardAfter, setFileImgCardAfter] = useState("");
  const [referralCode, setReferralCode] = useState("");

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

  const onChange = (key) => {
    // console.log(key);
    // console.log(user);
  };

  const handleUpdateCardBefore = (event) => {
    const [file] = event.target.files;
    setFileImgCardBefore(file);
    setSrcImgCardBefore(URL.createObjectURL(file));
  };

  const handleUpdateCardAfter = (event) => {
    const [file] = event.target.files;
    setFileImgCardAfter(file);
    setSrcImgCardAfter(URL.createObjectURL(file));
  };

  const genExtra = () => (
    <SaveFilled
      style={{ fontSize: "150%" }}
      onClick={async (event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
        setIsLoading(true);
        try {
          let dataPost = await postImage();
          // console.log(dataPost);
          if (dataPost.isSuccess) {
            await saveImgCard(dataPost.urlImageBefore, dataPost.urlImageAfter);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error(error);
        }
      }}
    />
  );

  const postImage = async () => {
    // let isSuccess= false;
    let dataPost = {
      isSuccess: false,

      urlImageBefore: user.urlIDCardBefore,

      urlImageAfter: user.urlIDcCardAffter,
    };

    try {
      if (fileCardBefore !== "") {
        let data = new FormData();
        data.append("File", fileCardBefore);
        data.append("Type", "IdCard");
        data.append("Width", 325);
        data.append("Height", 205);
        const res = await imageAPI.uploadImage(data);
        dataPost = { ...dataPost, isSuccess: true, urlImageBefore: res };
      }
      if (fileCardAfter !== "") {
        let data = new FormData();
        data.append("File", fileCardAfter);
        data.append("Type", "IdCard");
        data.append("Width", 325);
        data.append("Height", 205);
        const res = await imageAPI.uploadImage(data);
        dataPost = { ...dataPost, isSuccess: true, urlImageAfter: res };
      }
    } catch (error) {
      dataPost = { ...dataPost, isSuccess: false };
      toast.error("Lưu hình lển server bị lỗi");
    }
    return dataPost;
  };

  const saveImgCard = async (urlBefore, urlAfter) => {
    try {
      if (fileCardBefore !== "") {
        let data = JSON.stringify({
          id: user.id,
          lastName: user.lastName,
          firstName: user.first === " " ? user.lastName : user.first,
          phone: user.phoneNumber,
          email: user.email,
          password: "123@Admin",
          passwordConfirm: "123@Admin",
          urlIDCardBefore: urlBefore,
          urlIDCardAffter: urlAfter,
          urlAvatar: user.urlAvatar,
          cmndNgayCap: user.cmndNgayCap,
          cmndSo: user.cmndSo,
          cmndNoiCap: user.cmndNoiCap,
          iDrecommend: user.iDrecommend,
        });
        // console.log(data);
        await usersAPI.updateUserByID(data);
        toast.success("Cập nhật hình ảnh CMND/CCCD thành công");
      }
    } catch (error) {
      toast.error("Cập nhật hình ảnh CMND/CCCD không thành công");
    }
  };

  const saveReferralCode = async () => {
    setIsLoading(true);
    let temp = { ...user, iDrecommend: referralCode };
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
      await usersAPI.updateUserByID(data);
      setIsLoading(false);
      toast.success("Cập nhật mã giới thiệu thành công");
    } catch (error) {
      setIsLoading(false);
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
              accordion
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
                      onChange={handleUpdateCardAfter}
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
                    placeholder="nhập mã giới thiệu"
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <Button
                    type="primary"
                    onClick={saveReferralCode}
                    loading={isLoading}
                  >
                    Lưu
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
