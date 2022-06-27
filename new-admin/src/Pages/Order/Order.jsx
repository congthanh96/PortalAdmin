/**
 * Trang chi tiết đơn hàng
 */
import React, { useEffect, useState } from "react";
import { formatVND } from "../../Common/formatVND";
// import { DataGrid } from "@material-ui/data-grid";
import { Table, Spin } from "antd";
import TopPage from "../../Components/toppage/topPage";
import { ordersAPI } from "../../APIs";
import { toast } from "react-toastify";
import "./order.css";
import { useParams } from "react-router-dom";

const Order = () => {
  let { orderID } = useParams();
  const [orderDetail, setOrderDetail] = useState("");
  const [productsInOrder, setProductsInOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/orders",
      nameLink: "Danh sách đơn hàng",
    },
    {
      linkTo: "",
      nameLink: "Chi tiết đơn hàng",
    },
  ];
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

  useEffect(() => {
    const fetchData = async () => {
      await getDetailOrder();
      await getProductsInOrder();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Lấy chi tiết đơn hàng
  const getDetailOrder = async () => {
    try {
      const res = await ordersAPI.getDetailOrder(orderID);
      setOrderDetail(res);
    } catch (error) {
      toast.error("Không thể lấy thông tin chi tiết đơn hàng");
    }
  };

  // Lấy chi tiết sản phẩm trong đơn hàng
  const getProductsInOrder = async () => {
    try {
      const res = await ordersAPI.getProductsInOrder(orderID);
      setProductsInOrder(res);
    } catch (error) {
      toast.error("Không thể lấy sản phẩm trong đơn hàng");
    }
  };

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
    <React.Fragment>
      <div className="orders-container">
        <Spin spinning={isLoading}>
          <TopPage dataProps={dataTop} />
          <div className="order-container">
            <div className="order-header">
              <h4>Thông tin chi tiết đơn hàng: #{orderDetail.code}</h4>
              <h5>{orderDetail.createTime}</h5>
            </div>
            <div className="order-body">
              <div className="order-body-info">
                <div className="order-body-info-title">Mã CTV:</div>
                <div className="order-body-info-desc">
                  {orderDetail.codeSeller}
                </div>
              </div>
              <div className="order-body-info">
                <div className="order-body-info-title">
                  Tên, địa chỉ người nhận:
                </div>
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
        </Spin>
      </div>
    </React.Fragment>
  );
};

export default Order;
