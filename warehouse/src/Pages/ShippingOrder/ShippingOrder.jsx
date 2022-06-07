/**
 * Trang chi tiết đơn hàng và đóng hàng
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ordersAPI } from "../../APIs";
import ColoredLinearProgress from "../../Common/LineProgress";
import OrderDetail from "../../Components/order/OrderDetail";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SHIPPING } from "../../Common/constants";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router-dom";
import "./shippingOrder.css";

export default function ShippingOrder() {
  const history = useHistory();
  let { orderID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState("");
  const [productsInOrder, setProductsInOrder] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    await getDetailOrder();
    await getProductsInOrder();
    setIsLoading(false);
  }, []);

  // Lấy chi tiết đơn hàng
  const getDetailOrder = async () => {
    try {
      const res = await ordersAPI.getDetailOrder(orderID);
      setOrderDetail(res);
    } catch (error) {
      toastr.error(error);
    }
  };

  // Lấy chi tiết sản phẩm trong đơn hàng
  const getProductsInOrder = async () => {
    try {
      const res = await ordersAPI.getProductsInOrder(orderID);
      setProductsInOrder(res);
    } catch (error) {
      toastr.error(error);
    }
  };

  // Xử lý khi nhấn vào button giao hàng cho shipper
  const handleDelivery = (code, idBill) => {
    Modal.confirm({
      title: `Xác nhận chuyển hàng cho shipper đơn hàng #${orderDetail.code}`,
      icon: <ExclamationCircleOutlined />,
      content:
        "Sau khi gửi hàng cho shipper thì đơn hàng sẽ chuyển sang trạng thái đã chuyển hàng cho shipper",
      okText: "OK",
      cancelText: "CANCEL",
      onOk: () => handleOk(code, idBill),
      onCancel: () => {
      },
    });
  };

  // Xử lý xác nhận đóng hàng
  const handleOk = async () => {
    try {
      await ordersAPI.changeStatusProduct(orderID,SHIPPING );
      history.push({
        pathname: "/orders",
      });
      toastr.success(`Giao đơn hàng #${orderDetail.code} cho shipper thành công`);
    } catch (error) {
      toastr.error(error);
    }
  };

  return (
    <div className="shipping-container">
      <h2>Giao hàng cho shipper</h2>
      <hr />
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <React.Fragment>
          <OrderDetail
            orderDetail={orderDetail}
            productsInOrder={productsInOrder}
          />
          <div className="container-btn">
            <button className="btn-package" onClick={handleDelivery}>
              Giao hàng
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
