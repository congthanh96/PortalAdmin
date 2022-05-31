import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";
import { toastr } from "react-redux-toastr";
import { SHIPPING, ACCEPT, PREPARING } from "../../Common/constants";
import { actGetOrdersWithStatus } from "../../Actions/OrdersAction/ordersAction";
import {
  //EditOutlined,
  //   EllipsisOutlined,
  //   SettingOutlined,
  UnorderedListOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import "./reports.css";

const Reports = () => {
    const dispatch = useDispatch();

    // Lấy danh sách đơn hàng đã được duyệt
    const lstOrderAccept = useSelector(
      (state) => state.ordersReducer.ordersAccept
    );
  
    // Lấy danh sách đơn hàng đã đóng hàng
    const lstOrderPrepareing = useSelector(
      (state) => state.ordersReducer.ordersPreparing
    );
  
    // Lấy danh sách đơn hàng đã giao cho shipper
    const lstOrderShipping = useSelector(
      (state) => state.ordersReducer.ordersShipping
    );

    const lstStatus = [
        { id: ACCEPT, name: "Đang chờ đóng", index: 0 },
        { id: PREPARING, name: "Đã đóng hàng xong", index: 1 },
        { id: SHIPPING, name: "Đã giao hàng cho shipper", index: 2 },
      ];

    useEffect(() => {
        try {
          lstStatus.forEach(async (status) => {
            await dispatch(actGetOrdersWithStatus(status.id));
          });
        } catch (error) {
          toastr.warning("Không thể lấy danh sách sản phẩm")
        }
      }, []);
console.log(lstOrderAccept)
  return (
    <div className="card">
      <div className="site-card-wrapper">
        <h2>Báo cáo</h2>
        <hr />
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Báo cáo số lượng nhập xuất hàng tháng"
              bordered={true}
              actions={[
                <UnorderedListOutlined key = "detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              Số lượng sản phẩm đã nhập thêm trong tháng: 
              <br/>
              Số lượng sản phẩm đã xuất trong tháng:
              <br/>
              <br/>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Báo cáo về trạng thái đơn hàng"
              bordered={true}
              actions={[
                <UnorderedListOutlined key = "detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              Số lượng đơn hàng đang chờ đóng: {lstOrderAccept.length}
              {<br/>}
              Số lượng đơn hàng đã đóng: {lstOrderPrepareing.length}
              {<br/>}
              Số lượng đơn hàng đã giao: {lstOrderShipping.length}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Báo cáo về số lượng sản phẩm"
              bordered={true}
              actions={[
                <UnorderedListOutlined key = "detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              Số lượng sản phẩm trong kho:
              <br/>
              Số lượng sản phẩm còn hàng:
              <br/>
              <br/>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
