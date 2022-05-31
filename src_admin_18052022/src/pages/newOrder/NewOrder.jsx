import { useEffect, useState } from "react";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useParams } from "react-router-dom";
import ConfigAPI from "../../utils/ConfigAPI";
import {
  fetchOrderDetail,
  fetchOrderDetailID,
  fetchOrderDetailID2,
} from "../../reducers";

import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
export default function NewOrder() {
  let { orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order.orderDetail);
  const isLoading = useSelector((state) => state.order.isLoading);
  const [data, setData] = useState(orderDetail);
  const [isShowGHTK, setIsShowGHTK] = useState(false);
  const [isCheckPriceShippingGHTK, setIsCheckPriceShippingGHTK] = useState([]);
  const [GHTK_products, setGHTK_products] = useState([]);

  const [dataGHTK, setDataGHTK] = useState({
    products: [
      {
        name: "bút",
        weight: 0.1,
        quantity: 1,
        product_code: 1241,
      },
      {
        name: "tẩy",
        weight: 0.2,
        quantity: 1,
        product_code: 1254,
      },
    ],
    order: {
      id: "a4",
      pick_name: "HCM-nội thành",
      pick_address: "590 CMT8 P.11",
      pick_province: "TP. Hồ Chí Minh",
      pick_district: "Quận 3",
      pick_ward: "Phường 1",
      pick_tel: "0911222333",
      tel: "0911222333",
      name: "GHTK - HCM - Noi Thanh",
      address: "123 nguyễn chí thanh",
      province: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      hamlet: "Khác",
      is_freeship: "1",
      pick_date: "2016-09-30",
      pick_money: 47000,
      note: "Khối lượng tính cước tối đa: 1.00 kg",
      value: 3000000,
      transport: "fly",
      pick_option: "cod", // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
      deliver_option: "xteam", // nếu lựa chọn kiểu vận chuyển xfast
      pick_session: 2, // Phiên lấy xfast
      tags: [1, 7],
    },
  });
  useEffect(() => {
    dispatch(fetchOrderDetail(`${orderId}`));
    dispatch(fetchOrderDetailID(`${orderId}`));
    dispatch(fetchOrderDetailID2(`${orderId}`));
  }, []);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
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
    { field: "idBill", headerName: "ID", width: 0, hide: true },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 300,
      renderCell: (params) => {
        return <span>{params.row.productName}</span>;
      },
    },
    { field: "productf.brand", headerName: "Nhãn hiệu", width: 120 },
    { field: "variantName", headerName: "Phân loại", width: 120 },
    { field: "count", headerName: "Số lượng", width: 120 },

    {
      field: "price",
      headerName: "Giá	",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>;
      },
    },
  ];

  useEffect(() => {
    console.log(orderDetail);

    return;
  }, []);

  const [GHTK_Products, setGHTK_Products] = useState([]);
  const getPriceShippingGHTK = async () => {
    var data = {
      province: orderDetail[0].tp || "",
      district: orderDetail[0].qh || "",
      address: "406/36 Cộng Hoà",
      tags: [0],
      weight: 1000,
      value: orderDetail[0].totalPrice * 1,
      pick_district: "Quận Bình Thạnh",
      pick_province: "Thành Phố Hồ Chí Minh",
    };

    ConfigAPI(`ghtk/shipmentfee`, "POST", data)
      .then((res) => {
        console.log("GHTK - Get giá shipping GHTK thành công", res);
        console.log(
          "GHTK - Get giá shipping GHTK thành công",
          res.data.fee.fee
        );
        setIsCheckPriceShippingGHTK(res.data);
        runCreateBillGHTK(res.data);
      })
      .catch((err) => {
        alert(
          "Tạo đơn hàng không thành công! Vui lòng đăng nhập lại! Xin cảm ơn!"
        );
        console.log(err.response);
      });
  };

  const createBillGHTK = async (info) => {
    setIsShowGHTK(true);
    getPriceShippingGHTK();
  };

  const runCreateBillGHTK = async (info) => {
    var listProducts = [];
    orderDetail[0].billDetail.forEach((element) => {
      listProducts.push({
        name: `${element.productName}`,
        weight: element.weight * 1 || 1,
        quantity: element.count * 1,
        product_code: "",
      });
    });
    setGHTK_Products(listProducts);
    let dataLocal = {
      products: listProducts,
      order: {
        id: orderDetail[0].idBill || "id don hang", // id đơn hàng.
        pick_name: orderDetail[0].code, // Tên đơn hàng - mã đơn hàng.
        pick_address: "400 Nơ Trang Long", // Thông tin công ty: địa chỉ cụ thể.
        pick_province: "Thành Phố Hồ Chí Minh", // Thông tin công ty.
        pick_district: "Quận Bình Thạnh", // Thông tin công ty.
        pick_ward: "Phường 13", // Thông tin công ty.
        pick_tel: "0886769468", // Thông tin công ty.
        tel: orderDetail[0].phone || "0972200600", // Thông tin người nhận
        name: orderDetail[0].fullName,
        address: orderDetail[0].address || "400 cộng hoà",
        province: "Thành Phố Hồ Chí Minh " || orderDetail[0].tp,
        district: "Quận Tân Bình" || orderDetail[0].qh,
        ward: "Phường 13" || orderDetail[0].pXa + " phường 13 ",
        street: orderDetail[0].address,
        value: info.fee.insurance_fee * 1,
        hamlet: "khác",
        is_freeship: "1",
        pick_date: "2021-11-20",
        pick_money: orderDetail[0].totalPrice * 1 || 100000,
        note: "đơn hàng 123 - không cần gọi đâu nà",
        transport: "road",
        pick_option: "cod",
        deliver_option: "none",
        // pick_session: 2,
        tags: [0],
      },
    };

    setDataGHTK(dataLocal);

    // return;
    console.log(dataLocal);
    setTimeout(() => {
      ConfigAPI(`ghtk/post-order`, "POST", JSON.stringify(dataLocal))
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((err) => {
          alert(
            "Đăng đơn hàng lên GHTK không thành công! Vui lòng đăng nhập lại để thử lại!"
          );
          console.log(err.response);
        });
    }, 1000);
  };
  return (
    <div className="orderList">
      <div className="orderList-header">
        <h2>Newee Orders</h2>
        <div>
          <Link to="/newproduct" style={{ marginRight: 12 }}>
            <button className="productAddButton">In đơn hàng</button>
          </Link>

          <button
            className="productAddButton"
            onClick={() => {
              createBillGHTK();
            }}
          >
            Đăng đơn hàng GHTK
          </button>
        </div>
      </div>
      <div className="orderList container">
        {isLoading || orderDetail.length === 0 || orderDetail === undefined ? (
          <ColoredLinearProgress />
        ) : (
          <>
            {isShowGHTK && <pre>{JSON.stringify(dataGHTK, null, 2)}</pre>}

            <div className="order-header">
              <h4>
                Thông tin chi tiết đơn hàng: #
                {orderDetail[0]?.code || "đang cập nhập"}
              </h4>
              <h5>{orderDetail[0]?.createTime}</h5>
            </div>
            <div className="order-body">
              <div className="order-body-info">
                <div className="order-body-info-title">Mã CTV:</div>
                <div className="order-body-info-desc">
                  {orderDetail[0]?.codeSeller}
                </div>
              </div>
              <div className="order-body-info">
                <div className="order-body-info-title">
                  Tên, địa chỉ người nhận:
                </div>
                <div className="order-body-info-desc">
                  {orderDetail[0]?.fullName +
                    " - " +
                    orderDetail[0]?.pXa +
                    ", " +
                    orderDetail[0]?.qh +
                    ", " +
                    orderDetail[0]?.tp}
                </div>
              </div>
              <div className="order-body-info">
                <div className="order-body-info-title">Địa chỉ cụ thể:</div>
                <div className="order-body-info-desc">
                  {orderDetail[0]?.address}
                </div>
              </div>
              <div className="order-body-info">
                <div className="order-body-info-title">Ghi chú:</div>
                <div className="order-body-info-desc">
                  {" "}
                  {orderDetail[0]?.note}
                </div>
              </div>
              <div className="order-body-info product">
                <div className="order-body-info-title">Thông tin sản phẩm:</div>
                <div className="order-body-info-desc product">
                  <DataGrid
                    rows={orderDetail[0]?.billDetail}
                    getRowId={(row) => row.id}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="order-button"></div>
      </div>
    </div>
  );
}
