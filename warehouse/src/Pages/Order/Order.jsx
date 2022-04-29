import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ordersAPI } from "../../APIs";
import ColoredLinearProgress from '../../Common/LineProgress'
import "./order.css";

export default function Order() {
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
      console.log(error);
    }
  };
  const getProductsInOrder = async () => {
    try {
      const res = await ordersAPI.getProductsInOrder(orderID);
      setProductsInOrder(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <React.Fragment>
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (<>
      
      </>)}
    </React.Fragment>
  );
}
