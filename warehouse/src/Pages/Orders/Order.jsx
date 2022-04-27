import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetOrders } from "../../Actions/OrdersAction/ordersAction";
import ColoredLinearProgress from "../../Common/LineProgress";
import { formatVND } from "../../Utils/formatVND";
import { DataGrid } from "@material-ui/data-grid";
import "./orders.css";
import { ButtonComponent } from "../../Components/orders/buttonComponent";

export default function Orders() {
  const dispatch = useDispatch();
  const lstOrder = useSelector((state) => state.ordersReducer.orders);
  const isLoading = useSelector((state) => state.ordersReducer.isLoading);
  const[data,setData]=useState(lstOrder)
  const [pageSize, setPageSize] = useState(10);
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    try {
      dispatch(actGetOrders());
      setData(lstOrder)
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClick = async (id, index) => {
    //isLoading(true)
    let   lstOrdertemp = lstOrder.filter((item) => item.status === "Pending");
    console.log(lstOrdertemp)
    console.log(id+"222"+index)
  }
  const columns = [
    { field: "idBill", headerName: "ID", width: 90, hide: true },
    { field: "createTime", headerName: "Ngày Đặt Hàng", width: 120, flex: 1 },
    {
      field: "code",
      headerName: "Mã Đơn Hàng",
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.codeSeller === "NW2021000469" ||
              params.row.codeSeller === "NW2021000218" ||
              params.row.codeSeller === "NW2021000470"
                ? "orderListEditDev"
                : "orderListEdit"
            }
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
            className={
              params.row.codeSeller === "NW2021000469" ||
              params.row.codeSeller === "NW2021000218" ||
              params.row.codeSeller === "NW2021000470"
                ? "orderListEditDev"
                : "orderListEdit"
            }
          >
            {params.row.codeSeller}
          </div>
        );
      },
    },
    { field: "pXa", headerName: "Thông Tin Người Nhận", flex: 1 },
    { field: "note", headerName: "Ghi chú", flex: 1 },
    { field: "paymentType", headerName: "Thanh Toán", flex: 1 },

    {
      field: "totalPrice",
      headerName: "Tổng Tiền	",
      flex: 1,
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
      // renderCell: (params) => {
      //   return (
      //     <>
      //       {params.row.idShip ? (
      //         <Link
      //           to={{
      //             pathname: `/status-GHTK/${params.row.idBill}/${params.row.idShip}`,
      //             state: params.row,
      //           }}
      //         >
      //           <button className="orderListEditDev">
      //             {params.row.shipStatusText}
      //           </button>
      //         </Link>
      //       ) : (
      //         <>
      //           <select
      //             className={"order form-select " + params.row.status}
      //             onClick={(value, key) =>
      //               townsFilter(value, key, params.row.status)
      //             }
      //             onTouchStart={(value, key) =>
      //               townsFilter(value, key, params.row.status)
      //             }
      //             onChange={(value, key) =>
      //               townsFilter(value, key, params.row.status)
      //             }
      //           >
      //             <option className={params.row.status}>
      //               {params.row.status}
      //             </option>
      //             {downCategory.map((value, key) => {
      //               return (
      //                 <option
      //                   value={value.id}
      //                   key={key}
      //                   style={{ padding: 10 }}
      //                 >
      //                   {key + " - " + value.id + " -  " + value.name}
      //                 </option>
      //               );
      //             })}
      //           </select>
      //           <IconButton
      //             aria-label="edit"
      //             disabled={loading2 === params.row.idBill}
      //             onClick={() => {
      //               handleTransStatus(params.row.idBill, params.row.status);
      //             }}
      //           >
      //             <EditIcon />
      //             {loading2 === params.row.idBill && (
      //               <CircularProgress
      //                 size={38}
      //                 className={classes.fabProgress}
      //               />
      //             )}
      //           </IconButton>
      //         </>
      //       )}
      //     </>
      //   );
      // },
    },
    // {
    //   field: "",
    //   headerName: "Vận chuyển",
    //   flex:1
    //    //2022/04/13 Huynh-dt export file ADD
    //   disableExport: true,
    //    //2022/04/13 Huynh-dt export file ADD
    //   // renderCell: (params) => {
    //   //   return (
    //   //     <>
    //   //       {params.row.shipName ? (
    //   //         <>
    //   //           <button
    //   //             className="productListEdit"
    //   //             onClick={() => handleChangeToDelivered(params.row)}
    //   //           >
    //   //             Giao thành công
    //   //           </button>
    //   //         </>
    //   //       ) : (
    //   //         <Link
    //   //           to={{
    //   //             pathname: `/order-GHTK/${params.row.idBill}`,
    //   //             state: params.row,
    //   //           }}
    //   //         >
    //   //           <button className="productListEdit">Thêm GHTK</button>
    //   //         </Link>
    //   //       )}
    //   //     </>
    //   //   );
    //   // },
    // },

    { field: "updater", headerName: "Người xử lý", flex: 1 },
  ];

  const downCategory = [
    { id: "All", name: "Tất cả", index: 0 },
    // { id: "Pending", name: "Đơn chờ duyệt", index: 1 },
    { id: "Accecpt", name: "Đang chờ đóng", index: 1 },
    { id: "Preparing", name: "Đã đóng hàng xong", index: 2 },
    { id: "Shipping", name: "Đã giao hàng cho shipper", index: 3 },
    // { id: "Delivered", name: "Giao thành công", index: 5 },
    // { id: "Delay", name: "Hoãn đơn", index: 6 },
    // { id: "Cancel", name: "Hủy đơn", index: 7 },
  ];
  return (
    <div className="orderList">
      <div className="header-left">
            {downCategory.map((value, index) => (
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
        // <>{JSON.stringify(lstOrder)}</>
        <DataGrid
          rows={data}
          getRowId={(row) => row.idBill}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
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
