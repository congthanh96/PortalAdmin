import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import SearchBar from "material-ui-search-bar";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { changeStatusOrder, fetchOrder, fetchOrderGHTK } from "../../reducers";
import ConfigAPI from "../../utils/ConfigAPI";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./productList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },

  fabProgress: {
    color: green[500],
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  options: {
    minHeight: 40,
  },
}));

export default function GhtkList() {
  const dispatch = useDispatch();
  let { codeSeller } = useParams();

  const history = useHistory();
  const classes = useStyles();

  const { orders, ghtk, isRender, isLoading } = useSelector(
    (state) => state.order
  );

  const [rows, setRows] = useState(ghtk);

  const [isDev, setIsDev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [checkSearch, setCheckSearch] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [isReloadFirst, setIsReloadFirst] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [sortModel, setSortModel] = useState([{ field: "code", sort: "desc" }]);

  useEffect(() => {
    console.log("đã chạy useEffect All Product");
    if (codeSeller === undefined) {
      setRows(ghtk);
    }
  }, [ghtk]);

  useEffect(() => {
    console.log("1");
    dispatch(fetchOrder("All"));
  }, [isRender]);

  useEffect(() => {
    if (ghtk.length !== 0 && codeSeller !== undefined) {
      requestSearch(codeSeller);
    }
  }, [codeSeller]);

  useEffect(() => {
    if (activeBtn === 1) {
      setRows(ghtk);
    }
  }, [ghtk]);

  const onClick = async (id, index) => {
    if (codeSeller !== undefined) {
      history.push("/orders");
    }

    setLoading(true);
    setActiveBtn(index);
    setIsDev(!isDev);
    var filter = [];
    switch (index) {
      case 0:
        await dispatch(fetchOrderGHTK());

        setRows(ghtk);

        break;

      case 1:
        await dispatch(fetchOrderGHTK());

        setRows(ghtk);
        break;

      default:
        break;
    }

    setLoading(false);
  };
  const downCategory = [
    { id: "All", name: "Loading", index: 0 },
    { id: "GHTK", name: "GHTK", index: 1 },
  ];

  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrder("All"));
    }
    dispatch(fetchOrderGHTK());
  }, []);

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const arrayStatus = [
    "Cancel",
    "Pending",
    "Accecpt",
    "Preparing",
    "Shipping",
    "Delivered",
  ];

  const handleTransStatus = async (idBill, status) => {
    console.log(idBill, status);
    setLoading2(idBill);
    let arrayStatusResult = [];
    let arrayStatus2 = [
      "Cancel",
      "Pending",
      "Accecpt",
      "Preparing",
      "Shipping",
      "Delivered",
    ];

    if (index1 === 0) {
      arrayStatusResult = arrayStatus2.splice(index1 + 1, index2);
      console.log("1");
    } else {
      arrayStatusResult = arrayStatus2.splice(index1, index2);
      if (status === "Pending") {
        ConfigAPI(`Newee/Bill/ChangeStatusTo/${idBill}/Cancel`, "POST", null)
          .then((res) => {
            console.log("res update bill", res);

            setNotify({
              isOpen: true,
              message: "Newee - Huỷ đơn hàng thành công!",
              type: "success",
            });
            dispatch(fetchOrder("All"));
            dispatch(fetchOrderGHTK());
            setLoading(false);
          })

          .catch((err) => {
            alert("Newee - Huỷ đơn hàng không thành công!");
            setNotify({
              isOpen: true,
              message: "Newee - Huỷ đơn hàng không thành công!",
              type: "error",
            });
            console.log("err", err);
            setLoading(false);
          });
      }
    }

    if (arrayStatusResult.length === 1 || index2 * 1 - index1 * 1 === 1) {
      console.log("3");
      await dispatch(changeStatusOrder(idBill, selectedCategory));
    } else if (index2 * 1 - index1 * 1 === 2 && status === "Preparing") {
      console.log("4");
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[2]));
    } else if (
      arrayStatusResult.length === 2 ||
      index2 * 1 - index1 * 1 === 2
    ) {
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      console.log("5");
    } else if (
      arrayStatusResult.length === 3 ||
      index2 * 1 - index1 * 1 === 3
    ) {
      console.log("6");
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[2]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[3]));
    } else if (
      arrayStatusResult.length === 5 ||
      (index2 * 1 - index1 * 1 === 4 && status === "Pending")
    ) {
      console.log("7");
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[2]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[3]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[4]));
    } else if (arrayStatusResult.length === 4 && status === "Pending") {
      console.log("8");
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[0]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[2]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[3]));
    } else if (arrayStatusResult.length === 4 && status === "Accecpt") {
      console.log("9");
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[1]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[2]));
      await dispatch(changeStatusOrder(idBill, arrayStatusResult[3]));
    }

    arrayStatusResult = [];
    arrayStatus2 = arrayStatus;

    setTimeout(() => {
      setLoading2(-1);
      setCheckStatus(!checkStatus);
    }, 3000);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedTown, setselectedTown] = useState("");
  const initialTown = [{ label: "Chọn Quận/Huyện", value: "1" }];
  const [getTowns, setGetTowns] = useState(initialTown);
  const [checkStatus, setCheckStatus] = useState(false);
  const townsFilter = useCallback(
    (name, key, status) => {
      setCheckStatus(!checkStatus);
      const arrayStatus3 = [
        "Cancel",
        "Pending",
        "Accecpt",
        "Preparing",
        "Shipping",
        "Delivered",
      ];
      if (name.target.value === "1") {
        setselectedTown("");
        // setSelectedCategory("");
      } else {
        setSelectedCategory(name.target.value);
        setselectedProvince(name.target.value);
        console.log("đã chạy", name.target.value, status);

        setIndex1(arrayStatus3.indexOf(status));
        setIndex2(arrayStatus3.indexOf(name.target.value));
      }
    },

    [selectedProvince]
  );

  const handleChangeToDelivered = (value) => {
    console.log("Button giao thành công", value);
    ConfigAPI(
      `Newee/Bill/ChangeToDeliveredV2?idBill=${value.idBill}&idUser=${value.idSeller}`,
      "POST",
      null
    )
      .then((res) => {
        console.log("res update bill", res);

        setNotify({
          isOpen: true,
          message:
            "GHTK - Cập nhập giao thành công! Click chuột nút Tất cả để kiểm tra, đơn hàng đã được chuyển thành Delivered - giao thành công",
          type: "success",
        });
        setLoading(false);

        history.push("/orders");
      })

      .catch((err) => {
        alert("GHTK - Cập nhập trạng thái giao thành công thất bại!");
        setNotify({
          isOpen: true,
          message: "GHTK - Cập nhập trạng thái giao thành công thất bại!",
          type: "error",
        });
        console.log(err.response);
        setLoading(false);

        history.push("/orders");
      });
  };
  const columns = [
    { field: "idBill", headerName: "ID", width: 90, hide: true },
    { field: "createTime", headerName: "Ngày Đặt Hàng", width: 120 },
    {
      field: "code",
      headerName: "Mã Đơn Hàng",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row.idBill}>
              <button
                className={
                  params.row.codeSeller === "NW2021000469" ||
                  params.row.codeSeller === "NW2021000218" ||
                  params.row.codeSeller === "NW2021000470"
                    ? "orderListEditDev"
                    : "orderListEdit"
                }
              >
                {params.row.code}
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "codeSeller",
      headerName: "Mã CTV",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row.codeSeller}>
            <button
              className={
                params.row.codeSeller === "NW2021000469" ||
                params.row.codeSeller === "NW2021000218" ||
                params.row.codeSeller === "NW2021000470"
                  ? "orderListEditDev"
                  : "orderListEdit"
              }
            >
              {params.row.codeSeller}
            </button>
          </Link>
        );
      },
    },
    { field: "pXa", headerName: "Thông Tin Người Nhận", width: 200 },
    { field: "note", headerName: "Ghi chú", width: 130 },
    { field: "paymentType", headerName: "Thanh Toán", width: 120 },

    {
      field: "totalPrice",
      headerName: "Tổng Tiền	",
      width: 130,
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
      headerName: "Actions",
      width: 250,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            {params.row.idShip ? (
              <Link
                to={{
                  pathname: `/status-GHTK/${params.row.idBill}/${params.row.idShip}`,
                  state: params.row,
                }}
              >
                <button className="orderListEditDev">
                  {params.row.shipStatusText}
                </button>
              </Link>
            ) : (
              <>
                <select
                  className={"order form-select " + params.row.status}
                  onClick={(value, key) =>
                    townsFilter(value, key, params.row.status)
                  }
                  onTouchStart={(value, key) =>
                    townsFilter(value, key, params.row.status)
                  }
                  onChange={(value, key) =>
                    townsFilter(value, key, params.row.status)
                  }
                >
                  <option className={params.row.status}>
                    {params.row.status}
                  </option>
                  {downCategory.map((value, key) => {
                    return (
                      <option
                        value={value.id}
                        key={key}
                        style={{ padding: 10 }}
                      >
                        {key + " - " + value.id + " -  " + value.name}
                      </option>
                    );
                  })}
                </select>
                <IconButton
                  aria-label="edit"
                  disabled={loading2 === params.row.idBill}
                  onClick={() => {
                    handleTransStatus(params.row.idBill, params.row.status);
                  }}
                >
                  <EditIcon />
                  {loading2 === params.row.idBill && (
                    <CircularProgress
                      size={38}
                      className={classes.fabProgress}
                    />
                  )}
                </IconButton>
              </>
            )}
          </>
        );
      },
    },
    {
      field: "shipName",
      headerName: "Vận chuyển",
      width: 200,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            {params.row.shipName ? (
              <>
                <button
                  className="productListEdit"
                  onClick={() => handleChangeToDelivered(params.row)}
                >
                  Giao thành công
                </button>
              </>
            ) : (
              <Link
                to={{
                  pathname: `/order-GHTK/${params.row.idBill}`,
                  state: params.row,
                }}
              >
                <button className="productListEdit">Thêm GHTK</button>
              </Link>
            )}
          </>
        );
      },
    },

    { field: "updater", headerName: "Người xử lý", width: 220 },
  ];

  const [searched, setSearched] = useState(codeSeller || "");

  const requestSearch = (searchedVal) => {
    console.log(orders);
    if (orders.length === 0 || orders.length === undefined) return;
    const filteredRows = orders.filter((row) => {
      return (
        row.code?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.fullName?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.updater?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });

    setRows(filteredRows);

    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setRows(orders);
  };

  // GHTK
  const getBillGHTK = async () => {};

  return (
    <div className="productList">
      <>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="product-list-header">
          <div className="header-left">
            {downCategory.map((value, index) => (
              <ButtonComponent
                key={index}
                color={activeBtn === index ? "primary" : "default"}
                variant={"contained"}
                onClick={() => onClick(value.id, index)}
                loading={loading}
                name={value.name}
                mr={6}
                mb={4}
              />
            ))}
          </div>

          <div className="header-right">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              style={{
                width: 230,
                height: 35,
                marginRight: 10,
                marginBottom: 10,
              }}
              placeholder="Mã đơn hàng, tên người nhận, tên người duyệt"
            />
          </div>
        </div>
        {isLoading ? (
          <ColoredLinearProgress />
        ) : (
          <DataGrid
            rows={rows}
            getRowId={(row) => row.idBill}
            disableSelectionOnClick
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            sortModel={sortModel}
            onSortModelChange={(model) => {
              if (!_.isEqual(model, sortModel)) {
                console.log("đã chạy !");
                setSortModel(model);
              }
            }}
            //2022/04/13 Huynh-dt export file ADD
            components={{
              Toolbar: () => CustomToolbar("GHTK"),
            }}
            //2022/04/13 Huynh-dt export file ADD
          />
        )}
      </>
    </div>
  );
}
