/**
 * Component chi tiết đơn hàng
 */
import React from "react";
import { formatVND } from "../../Common/formatVND";
// import { DataGrid } from "@material-ui/data-grid";
import { Table } from "antd";
import "./orderDetail.css";

const OrderDetail = ({ orderDetail, productsInOrder }) => {
  const columnsAntd = [
    {
      title: "Tên sản phẩm",
      key: "productName",
      dataIndex: "productName",
    },
    { dataIndex: "variantName", title: "Phân loại", key: "variantName" },
    { dataIndex: "count", title: "Số lượng", key: "count" },

    {
      dataIndex: "price",
      title: "Giá	",
      render: (text) => formatVND(text),
    },
  ];

  const Footer = () => {
    return (
      <>
        Tiền đơn hàng: {formatVND(orderDetail.totalPrice)}
        <br />
        Phí ship: {formatVND(orderDetail.priceShip)}
        <hr />
        Tổng tiền đơn hàng:{" "}
        {formatVND(orderDetail.totalPrice + orderDetail.priceShip)}
      </>
    );
  };

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

        {/* <DataGrid
          rows={productsInOrder}
          columns={columns}
          getRowId={(row) => row.variantId}
          disableSelectionOnClick
          autoHeight
        /> */}
        <Table
          dataSource={productsInOrder}
          columns={columnsAntd}
          rowKey={(row) => row.variantId}
          footer={Footer}
          bordered
        ></Table>
      </div>
    </div>
  );
};

export default OrderDetail;
