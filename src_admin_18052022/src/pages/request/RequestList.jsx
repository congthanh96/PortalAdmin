import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { fetchAccept, fetchRequest, fetchTrans } from "../../reducers";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./reportList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

export default function RequestList() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.request.request);
  const isLoading = useSelector((state) => state.request.isLoading);
  const isRender = useSelector((state) => state.request.isRender);
  console.log("isLoading", isLoading);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState(allProducts);
  const [activeBtn, setActiveBtn] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const onClick = (index) => {
    setLoading(true);
    setActiveBtn(index);

    var filter = [];
    switch (index) {
      case 0:
        setRows(allProducts);
        break;
      case 1:
        filter = allProducts.filter((item) => item.status === "yêu cầu");
        setRows(filter);
        break;
      case 2:
        filter = allProducts.filter((item) => item.status === "đã duyệt");
        setRows(filter);
        break;
      case 3:
        filter = allProducts.filter(
          (item) => item.status === "đã chuyển khoản"
        );
        setRows(filter);
        break;

      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchRequest());
    }
  }, []);
  useEffect(() => {
    dispatch(fetchRequest());
  }, [isRender]);
  useEffect(() => {
    console.log(allProducts);
    setRows(allProducts);
  }, [allProducts]);
  const loadingPage = () => {
    dispatch(fetchRequest());
  };

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };
  const handleAccept = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(fetchAccept(id));
  };
  const handleTrans = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(fetchTrans(id));
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const Button = ({ type }) => {
    return (
      <button
        className={
          type === "hủy bỏ"
            ? "widgetLgButton"
            : type === "đã chuyển khoản"
            ? "widgetLgButton Accecpt"
            : type === "đã duyệt"
            ? "widgetLgButton Cancel"
            : "widgetLgButton  Pending"
        }
      >
        {type}
      </button>
    );
  };

  const columns = [
    { field: "id", headerName: "Mã giao dịch", width: 130 },
    {
      field: "codeSeller",
      headerName: "CodeSeller",
      width: 130,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row.codeSeller}>
            <button className="userListEdit">{params.row.codeSeller}</button>
          </Link>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <Button type={params.row.status} />;
      },
    },
    {
      field: "money",
      headerName: "Số tiền",
      width: 160,
      align: "right",
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value} VND`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <Link to={"/reports/" + params.row.idSeller}>
            <button className="userListEditMoney">
              {formatVND(params.row.money)}
            </button>
          </Link>
        );
      },
    },
    { field: "createTime", headerName: "Thời gian tạo", width: 100 },
    { field: "modifiTime", headerName: "Xử lý", width: 100 },
    { field: "modifier", headerName: "Người xử lý", width: 240 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "yêu cầu" && (
              <button
                className="productListEditConfirm"
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Thực hiện sẽ không thể thay đổi!",
                    subTitle: "Chắc chắn?",
                    onConfirm: () => {
                      handleAccept(params.row.id);
                    },
                  });
                }}
              >
                Duyệt yêu cầu
              </button>
            )}
            {params.row.status === "đã duyệt" && (
              <button
                className="productListEditTrans"
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Thực hiện sẽ không thể thay đổi!",
                    subTitle: "Chắc chắn?",
                    onConfirm: () => {
                      handleTrans(params.row.id);
                    },
                  });
                }}
              >
                Chuyển tiền
              </button>
            )}
          </>
        );
      },
    },
  ];

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allProducts.filter((row) => {
      return (
        row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.status?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.modifier?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className="productList">
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div className="product-list-header">
        <div className="header-left">
          <button
            type="button"
            className="productRefeshButton"
            onClick={() => loadingPage()}
          >
            Loading
          </button>

          <ButtonComponent
            color={activeBtn === 0 ? "primary" : "default"}
            variant={"contained"}
            onClick={() => onClick(0, "08")}
            loading={loading}
            name={"Tất cả"}
          />
          <ButtonComponent
            color={activeBtn === 1 ? "primary" : "default"}
            variant={"contained"}
            onClick={() => onClick(1, "09")}
            loading={loading}
            name={"Yêu cầu"}
          />
          <ButtonComponent
            color={activeBtn === 2 ? "primary" : "default"}
            variant={"contained"}
            onClick={() => onClick(2, "09")}
            loading={loading}
            name={"Đã duyệt"}
          />
          <ButtonComponent
            color={activeBtn === 3 ? "primary" : "default"}
            variant={"contained"}
            onClick={() => onClick(3, "09")}
            loading={loading}
            name={"Đã chuyển"}
          />
        </div>

        <div className="header-right">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{
              width: 420,
              height: 35,
              marginRight: 50,
              marginBottom: 10,
            }}
            placeholder="CodeSeller, trạng thái, người xử lý..."
          />
        </div>
      </div>
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <DataGrid
          rows={rows || allProducts}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          checkboxSelection
          components={{
            Toolbar: () => CustomToolbar("Request List"),
          }}
        />
      )}
    </div>
  );
}
