import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ordersAPI } from "../../APIs";
import ColoredLinearProgress from "../../Common/LineProgress";
import "./order.css";
import OrderDetail from "../../Components/order/OrderDetail";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PREPARING } from "../../Common/constants";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router-dom";

export default function Order() {
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
  


  const getDetailOrder = async () => {
    try {
      const res = await ordersAPI.getDetailOrder(orderID);
      setOrderDetail(res);
      console.log(res);
    } catch (error) {
      toastr.error(error);
      console.log(error);
    }
  };
  const getProductsInOrder = async () => {
    try {
      const res = await ordersAPI.getProductsInOrder(orderID);
      setProductsInOrder(res);
      console.log(res);
    } catch (error) {
      toastr.error(error);
      console.log(error);
    }
  };

  const  handlePacking = () => {
    Modal.confirm({
      title: `Xác nhận đóng gói đơn hàng #${orderDetail.code}`,
      icon: <ExclamationCircleOutlined />,
      content:
        "Sau khi đóng gói thì đơn hàng sẽ chuyển sang trạng thái đã đóng hàng xong",
      okText: "OK",
      cancelText: "CANCEL",
      onOk:()=>handleOk(),
      onCancel: () => {
        console.log("cancel");
      },
    });
  };

  const handleOk = async () => {
    console.log("Ok");
    try {
      await ordersAPI.changeStatusProduct(orderID,PREPARING)
      history.push({
        pathname: "/orders",
      });
      toastr.success(`Đóng gói đơn hàng #${orderDetail.code} thành công`)
    } catch (error) {
    toastr.error(error)
      console.log(error)
    }
  };

  return (
    <React.Fragment>
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
            <button className="btn-package" onClick={handlePacking}>
              Đóng hàng
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
