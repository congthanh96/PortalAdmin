/**
 * Danh sách đơn hàng đang chờ duyệt
 */
import React, { useEffect, useState } from "react";
import { PENDING, ACCEPT } from "../../Common/constants";
import { useSelector, useDispatch } from "react-redux";
import { actGetOrdersWithStatus } from "../../Actions/OrdersAction/ordersAction";
import { formatVND } from "../../Utils/formatVND";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ColoredLinearProgress from "../../Common/LineProgress";
import "./approveOrders.css";
import { toastr } from "react-redux-toastr";

export default function ApproveOrders() {
  const dispatch = useDispatch();
  const lstOrderPending = useSelector(
    (state) => state.ordersReducer.ordersPending
  );
  const isLoading = useSelector((state) => state.ordersReducer.isLoading);
  const [pageSize, setPageSize] = useState(10);

  useEffect(async () => {
    try {
      await dispatch(actGetOrdersWithStatus(PENDING));
    } catch (error) {
      toastr.warning("Không lấy được danh sách đơn hàng đang chờ duyệt!");
    }
  }, []);

  const menu = (order) => {
    return (
      <Menu
        items={[
          {
            label: (
              <Link
                to={{
                  pathname: `/GHTK/${order.idBill}`,
                  state: JSON.stringify(order),
                }}
              >
                GHTK
              </Link>
            ),
            key: "0",
          },
          {
            type: "divider",
          },
          {
            label: "Newee Express",
            key: "1",
            disabled: true,
          },

          {
            label: "Shopee Express",
            key: "2",
            disabled: true,
          },
        ]}
      />
    );
  };

  const columns = [
    { field: "idBill", headerName: "ID", width: 90, hide: true },
    {
      field: "createTime",
      headerName: "Ngày Đặt Hàng",
      width: 120,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "code",
      headerName: "Mã Đơn Hàng",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.code}</div>;
      },
    },
    {
      field: "codeSeller",
      headerName: "Mã CTV",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.codeSeller}</div>;
      },
    },
    {
      field: "pXa",
      headerName: "Thông Tin Người Nhận",
      flex: 1,
      minWidth: 120,
    },
    { field: "note", headerName: "Ghi chú", flex: 1, minWidth: 120 },
    { field: "paymentType", headerName: "Thanh Toán", flex: 1, minWidth: 120 },

    {
      field: "totalPrice",
      headerName: "Tổng Tiền	",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value} VND`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return <>{formatVND(params.row.totalPrice)}</>;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <>{params.row.status === ACCEPT ? "Accept" : params.row.status}</>
        );
      },
    },
    { field: "updater", headerName: "Người xử lý", flex: 1, minWidth: 120 },
    {
      field: "delivery",
      headerName: "Vận chuyển",
      flex: 1,
      minWidth: 160,
      //2022/04/13 Huynh-dt export file ADD
      //disableExport: true,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            {params.row.shipName ? (
              <>
                <button className="btn-ghtk">Giao thành công</button>
              </>
            ) : (
              <Dropdown overlay={menu(params.row)} placement="bottomLeft">
                  <Space>
                    Chọn DVVC
                    <DownOutlined />
                  </Space>
              </Dropdown>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="approve-order-list">
      <h2>Danh sách đơn hàng đang chờ duyệt</h2>
      {isLoading ? (
        <>
          <div className="linear">
            <ColoredLinearProgress />
          </div>
        </>
      ) : (
        <DataGrid
          rows={lstOrderPending}
          getRowId={(row) => row.idBill}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
        />
      )}
    </div>
  );
}
