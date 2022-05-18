import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./user.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { fetchUser, fetchUserDetail } from "../../reducers";

import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";

export default function User() {
  let { userId } = useParams();
  console.log(userId);
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.user.listUser);
  const detailUser = useSelector((state) => state.user.detailUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  console.log("isLoading", isLoading);
  console.log("isLoading", fetchData);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  const [data, setData] = useState(productRows);
  useEffect(() => {
    if (fetchData.length === 0) {
      dispatch(fetchUser());
    }
  }, []);
  useEffect(() => {
    if (userId !== null && userId.length < 13) {
      var filterID = fetchData.filter((item) => item.code === userId);
      console.log('đã chạy 123', filterID);
      if (filterID.length !== 0) {
        dispatch(fetchUserDetail(filterID[0].id));
      }
     
    } else dispatch(fetchUserDetail(userId));
    
  }, [userId, fetchData]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 600,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.link} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    // { field: "stock", headerName: "Stock", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price1",
      headerName: "Price",
      width: 140,
      // headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <span style={{ textAlign: "right" }}>
              {formatVND(params.row.price1)}
            </span>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="user">
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <div className="userTitleContainer">
            <h1 className="userTitle">Thông tin Seller</h1>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    detailUser?.urlAvatar === 0 ||
                    "https://newee.asia/asset/images/0408/logo.png"
                  }
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {detailUser?.first + " " + detailUser?.lastName}
                  </span>
                  <span className="userShowUserTitle">
                    {detailUser?.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Thông tin liên hệ</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {detailUser?.phoneNumber || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{detailUser?.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {detailUser?.commune || 'chưa cập nhập' +
                      ", " +
                      detailUser?.district +
                      ", " +
                      detailUser?.city }
                  </span>
                </div>

                <span className="userShowTitle">Thông tin Tài khoản NH</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {detailUser?.holderName || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {" "}
                    {detailUser?.accountNumber || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {" "}
                    {detailUser?.bankName || 'chưa cập nhập'}
                  </span>
                </div>

                <span className="userShowTitle">Thông tin CMND</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {detailUser?.cmndSo || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {" "}
                    {detailUser?.cmndNoiCap || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {" "}
                    {detailUser?.cmndNgayCap || 'chưa cập nhập'}
                  </span>
                </div>
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={
                      detailUser?.urlIDCardBefore ||
                      "https://newee.asia/asset/images/0408/logo.png"
                    }
                    alt=""
                  />
                  <img
                    className="userUpdateImg"
                    src={
                      detailUser?.urlIDcCardAffter ||
                      "https://newee.asia/asset/images/0408/logo.png"
                    }
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Chỉnh sửa thông tin</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Mã giới thiệu</label>
                    <input
                      type="text"
                      placeholder="Mã giới thiệu"
                      className="userUpdateInput"
                    />
                    <button type="button" className="userUpdateButton">
                      Cập nhập MGT
                    </button>
                  </div>
                </div>
                <div className="userUpdateRight"></div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
