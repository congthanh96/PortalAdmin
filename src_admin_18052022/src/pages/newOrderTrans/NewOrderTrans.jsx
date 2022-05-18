import { useEffect, useState } from "react";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";

import { fetchOrderDetail } from "../../reducers";

import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
export default function NewOrderTrans() {
  let { orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order.orderDetail);
  const isLoading = useSelector((state) => state.order.isLoading);
  const [data, setData] = useState(orderDetail);
  useEffect(() => {
    dispatch(fetchOrderDetail(`${orderId}`));
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

  useEffect(() => { console.log(orderDetail); console.log(data)}, [Object.keys(orderDetail)])
  return (
    <div className="orderList">
      <div className="orderList-header">
        <h2>Chuyển trạng thái</h2>
        <Link to="/newproduct">
          <button className="productAddButton">In đơn hàng</button>
        </Link>
      </div>
      <div className="orderList container">
         {isLoading || orderDetail.length ===0 || orderDetail === undefined ? (
        <ColoredLinearProgress />
      ) : (
            <>
              
              <div className="order-header">
          <h4>Thông tin chi tiết đơn hàng: #{orderDetail[0]?.code || 'đang cập nhập'}</h4>
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
            <div className="order-body-info-desc"> {orderDetail[0]?.note}</div>
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
