/**
 * Danh sách đơn hàng đã được duyệt, đã đóng hàng và đã giao cho shipper
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetOrdersWithStatus } from "../../Actions/OrdersAction/ordersAction";
import ColoredLinearProgress from "../../Common/LineProgress";
import { formatVND } from "../../Utils/formatVND";
import { DataGrid } from "@material-ui/data-grid";
import { ButtonComponent } from "../../Components/orders/buttonComponent";
import { SHIPPING, ACCEPT, PREPARING } from "../../Common/constants";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { Modal, Button } from "antd";
import { ordersAPI } from "../../APIs";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toastr } from "react-redux-toastr";
import "./orders.css";

export default function Orders() {
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

  const isLoading = useSelector((state) => state.ordersReducer.isLoading);
  const [data, setData] = useState(lstOrderAccept);
  const [pageSize, setPageSize] = useState(10);
  const [activeBtn, setActiveBtn] = useState(0);
  const [isAccept, setIsAccept] = useState(true);
  const [isPreparing, setIsPreparing] = useState(false);

  const lstStatus = [
    { id: ACCEPT, name: "Đang chờ đóng", index: 0 },
    { id: PREPARING, name: "Đã đóng hàng xong", index: 1 },
    { id: SHIPPING, name: "Đã giao hàng cho shipper", index: 2 },
  ];

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
      field: "packing",
      headerName: "Đóng hàng",
      flex: 1,
      minWidth: 155,
      hide: !isAccept,
      renderCell: (params) => {
        return (
          //Xử lý xem đơn hàng trước khi xác nhận đóng hàng
          <Link to={"/order/" + params.row.idBill}>
            <MoveToInboxIcon style={{ marginLeft: 15, marginTop: 20 }} />
          </Link>
        );
      },
    },
    {
      field: "delivery",
      headerName: "Giao hàng",
      flex: 1,
      minWidth: 155,
      hide: !isPreparing,
      renderCell: (params) => {
        return (
          <Button
            type="link"
            onClick={() => handleDelivery(params.row.code, params.row.idBill)}
          >
            <LocalShippingIcon style={{ marginLeft: 15 }} />
          </Button>
        );
      },
    },
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

  useEffect(() => {
    switch (activeBtn) {
      case 0:
        setData(lstOrderAccept);
        break;
      case 1:
        setData(lstOrderPrepareing);
        break;
      case 2:
        setData(lstOrderShipping);
        break;
      default:
        setData(lstOrderAccept);
    }
  }, [lstOrderAccept, lstOrderPrepareing, lstOrderShipping]);

  // Xử lý hiển thị data khi chọn vào các button
  const onClick = async (id, index) => {
    switch (index) {
      case 0:
        setData(lstOrderAccept);
        setIsAccept(true);
        setIsPreparing(false);
        break;
      case 1:
        setData(lstOrderPrepareing);
        setIsAccept(false);
        setIsPreparing(true);
        break;
      case 2:
        setData(lstOrderShipping);
        setIsAccept(false);
        setIsPreparing(false);
        break;
      default:
        setData(lstOrderAccept);
        setIsAccept(true);
        setIsPreparing(false);
    }
    setActiveBtn(index);
  };

  // Xử lý khi nhấn vào button giao hàng cho shipper
  const handleDelivery = (code, idBill) => {
    Modal.confirm({
      title: `Xác nhận chuyển hàng cho shipper đơn hàng #${code}`,
      icon: <ExclamationCircleOutlined />,
      content:
        "Sau khi gửi hàng cho shipper thì đơn hàng sẽ chuyển sang trạng thái đã chuyển hàng cho shipper",
      okText: "OK",
      cancelText: "CANCEL",
      onOk: () => handleOk(code, idBill),
      onCancel: () => {
        console.log("cancel");
      },
    });
  };

  // Xử lý khi xác nhận gửi hàng cho shipper
  const handleOk = async (code, idBill) => {
    try {
      await ordersAPI.changeStatusProduct(idBill, SHIPPING);
      await dispatch(actGetOrdersWithStatus(PREPARING));
      await dispatch(actGetOrdersWithStatus(SHIPPING));
      toastr.success(`Gửi đơn hàng #${code} cho shipper thành công`);
    } catch (error) {
      toastr.error(error);
    }
  };

  return (
    <div className="orderList">
      <div className="header-left">
        {lstStatus.map((value, index) => (
          <ButtonComponent
            key={index}
            color={activeBtn === index ? "primary" : "default"}
            variant={"contained"}
            onClick={() => onClick(value.id, index)}
            loading={isLoading}
            name={value.name}
            mr={6}
            mb={4}
          />
        ))}
      </div>
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <DataGrid
          rows={data}
          getRowId={(row) => row.idBill}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          // 2022/04/13 Huynh-dt export file ADD
          // components={{
          //   Toolbar: () => CustomToolbar("Product List"),
          // }}
          // 2022/04/13 Huynh-dt export file ADD
        />
      )}
    </div>
  );
}
