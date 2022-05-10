import React, { useEffect, useState } from "react";
import { PENDING, ACCEPT } from "../../Common/constants";
import { useSelector, useDispatch } from "react-redux";
import { actGetOrdersWithStatus } from "../../Actions/OrdersAction/ordersAction";
import { formatVND } from "../../Utils/formatVND";
import { DataGrid } from "@material-ui/data-grid";
import ColoredLinearProgress from "../../Common/LineProgress";
import "./approveOrders.css";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function ApproveOrders() {
  const dispatch = useDispatch();
  // const lstOrder = useSelector((state) => state.ordersReducer.orders);
  const lstOrderPending = useSelector(
    (state) => state.ordersReducer.ordersPending
  );

  const isLoading = useSelector((state) => state.ordersReducer.isLoading);
  console.log("pending" + lstOrderPending);
  const [data, setData] = useState(lstOrderPending);
  const [pageSize, setPageSize] = useState(10);

  useEffect(async () => {
    try {
      await dispatch(actGetOrdersWithStatus(PENDING));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const menu = (order) => {
    return (
      <Menu
        // onClick={() => {
        //   console.log(order);
        // }}
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
        return (
          <div
          // className={
          //   params.row.codeSeller === "NW2021000469" ||
          //   params.row.codeSeller === "NW2021000218" ||
          //   params.row.codeSeller === "NW2021000470"
          //     ? "orderListEditDev"
          //     : "orderListEdit"
          // }
          >
            {params.row.code}
          </div>
        );
      },
    },
    {
      field: "codeSeller",
      headerName: "Mã CTV",
      flex: 1,
      renderCell: (params) => {
        return (
          <div
          // className={
          //   params.row.codeSeller === "NW2021000469" ||
          //   params.row.codeSeller === "NW2021000218" ||
          //   params.row.codeSeller === "NW2021000470"
          //     ? "orderListEditDev"
          //     : "orderListEdit"
          // }
          >
            {params.row.codeSeller}
          </div>
        );
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
                <button
                  className="btn-ghtk"
                  // onClick={() => handleChangeToDelivered(params.row)}
                >
                  Giao thành công
                </button>
              </>
            ) : (
              // <Link
              //   to={{
              //     pathname: `/GHTK/${params.row.idBill}`,
              //     state: params.row,
              //   }}
              // >
              //   <button className="btn-ghtk">Thêm GHTK</button>
              // </Link>
              <Dropdown overlay={menu(params.row)} placement="bottomLeft">
                <a>
                  <Space>
                    Chọn DVVC
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </>
        );
      },
    },
    // {
    //   field: "packing",
    //   headerName: "Đóng hàng",
    //   flex: 1,
    //   minWidth: 155,
    //   hide: !isAccept,
    //   renderCell: (params) => {
    //     return (
    //       <Link to={"/order/" + params.row.idBill}>
    //         <MoveToInboxIcon style={{ marginLeft: 15, marginTop: 20 }} />
    //       </Link>
    //     );
    //   },
    // },
    // {
    //   field: "delivery",
    //   headerName: "Giao hàng",
    //   flex: 1,
    //   minWidth: 155,
    //   hide: !isPreparing,
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         type="link"
    //         onClick={() => handleDelivery(params.row.code, params.row.idBill)}
    //       >
    //         <LocalShippingIcon style={{ marginLeft: 15 }} />
    //       </Button>
    //     );
    //   },
    // },
  ];

  return (
    <div className="approve-order-list">
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
