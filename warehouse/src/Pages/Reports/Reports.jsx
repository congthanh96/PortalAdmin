import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";
import { toastr } from "react-redux-toastr";
import { SHIPPING, ACCEPT, PREPARING } from "../../Common/constants";
import { actGetOrdersWithStatus } from "../../Actions/OrdersAction/ordersAction";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  //EditOutlined,
  //   EllipsisOutlined,
  //   SettingOutlined,
  UnorderedListOutlined,
  DownloadOutlined,
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
      //   dataPieChart = [
      // { name: "Đang chờ đóng", value: lstOrderAccept.length },
      // { name: "Đã đóng", value: 200 },
      // { name: "Đã giao cho shipper", value: 300 },
      //   ]
    } catch (error) {
      toastr.warning("Không thể lấy danh sách sản phẩm");
    }
  }, []);

  const dataLineChart = [
    {
      name: "Tháng 1",
      import: 3100,
      export: 2200,
    },
    {
      name: "Tháng 2",
      import: 1020,
      export: 3300,
    },
    {
      name: "Tháng 3",
      import: 1000,
      export: 2400,
    },
    {
      name: "Tháng 4",
      import: 3000,
      export: 1400,
    },
    {
      name: "Tháng 5",
      import: 2000,
      export: 2400,
    },
  ];

  const dataPieChart = [
    { name: "Đang chờ đóng", value: lstOrderAccept.length },
    { name: "Đã đóng", value: lstOrderPrepareing.length },
    { name: "Đã giao cho shipper", value: lstOrderShipping.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const dataBarChart = [
    {
      name: "Tháng 1",
      stocking: 4100,
      outOfStock: 1400,
    },
    {
      name: "Tháng 2",
      stocking: 4000,
      outOfStock: 2400,
    },
    {
      name: "Tháng 3",
      stocking: 3000,
      outOfStock: 500,
    },
    {
      name: "Tháng 4",
      stocking: 1300,
      outOfStock: 2400,
    },
    {
      name: "Tháng 5",
      stocking: 2000,
      outOfStock: 4400,
    },
  ];

  return (
    <div className="card">
      <div className="site-card-wrapper">
        <h2>Báo cáo</h2>
        <hr />
        <Row gutter={16}>
          <Col span={8}>
            <Card
            style={{backgroundColor:"#F5F5F5"}}
              title="Báo cáo số lượng nhập xuất hàng tháng"
              bordered={true}
              actions={[
                <UnorderedListOutlined key="detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              {/* Số lần nhập kho trong tháng:
              <br />
              Số lần xuất kho trong tháng:
              <br />
              <br /> */}

              <LineChart
                width={400}
                height={400}
                data={dataLineChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="import"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="export" stroke="#82ca9d" />
              </LineChart>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ backgroundColor: "#FFFAFA" }}
              title="Báo cáo về trạng thái đơn hàng"
              bordered={true}
              actions={[
                <UnorderedListOutlined key="detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              {/* Số lượng đơn hàng đang chờ đóng: {lstOrderAccept.length}
              {<br />}
              Số lượng đơn hàng đã đóng: {lstOrderPrepareing.length}
              {<br />}
              Số lượng đơn hàng đã giao: {lstOrderShipping.length} */}
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dataPieChart}
                  cx={150}
                  cy={150}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ backgroundColor: "#F5FFFA" }}
              title="Báo cáo về số lượng sản phẩm theo tháng"
              bordered={true}
              actions={[
                <UnorderedListOutlined key="detail" />,
                <DownloadOutlined key="download" />,
              ]}
            >
              {/* Số lượng sản phẩm trong kho:
              <br />
              Số lượng sản phẩm hiện tại còn hàng :
              <br />
              <br /> */}
              <BarChart
                width={400}
                height={400}
                data={dataBarChart}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stocking" stackId="a" fill="#90EE90" />
                <Bar dataKey="outOfStock" stackId="a" fill="#FF8C00" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
