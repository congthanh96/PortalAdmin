import React from "react";
import "./orderDetail.css";
import { formatVND } from "../../Utils/formatVND";
import { DataGrid } from "@material-ui/data-grid";

const OrderDetail = ({ orderDetail, productsInOrder }) => {
  const columns = [
    // { field: "id", headerName: "ID", width: 0, hide: true },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      flex: 2,
    },
    // { field: "productf.brand", headerName: "Nhãn hiệu", width: 120 },
    { field: "variantName", headerName: "Phân loại", flex: 1 },
    { field: "count", headerName: "Số lượng", flex: 0.5 },

    {
      field: "price",
      headerName: "Giá	",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>;
      },
    },
  ];

  return (
    <div className="order-container">
      <div className="order-header">
        <h4>Thông tin chi tiết đơn hàng: #{orderDetail.code}</h4>
        <h5>{orderDetail.createTime}</h5>
      </div>
      <div className="order-body">
        <div className="order-body-info">
          <div className="order-body-info-title">Mã CTV:</div>
          <div className="order-body-info-desc">{orderDetail.codeSeller}</div>
        </div>
        <div className="order-body-info">
          <div className="order-body-info-title">Tên, địa chỉ người nhận:</div>
          <div className="order-body-info-desc">
            {orderDetail.fullName +
              " - " +
              orderDetail.pXa +
              ", " +
              orderDetail.qh +
              ", " +
              orderDetail.tp}
          </div>
        </div>
        <div className="order-body-info">
          <div className="order-body-info-title">Địa chỉ cụ thể:</div>
          <div>{orderDetail.address}</div>
        </div>
        <div className="order-body-info">
          <div className="order-body-info-title">Ghi chú:</div>
          <div> {orderDetail.note}</div>
        </div>
      </div>
      <div className="products-container">
        <div className="products-container-title">Thông tin sản phẩm:</div>

        <DataGrid
          rows={productsInOrder}
          columns={columns}
          getRowId={(row) => row.variantId}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default OrderDetail;
