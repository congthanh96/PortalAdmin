import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomNoRowsOverlay } from "../../components/empty/CustomNoRowsOverlay";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { ButtonTimes } from "../../components/times/ButtonTimes";
import { fetchRanks } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./productList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

console.log(today);
console.log(dd);
console.log(mm);

var monthChange = mm,
  yearChange = yyyy;

export default function RankList() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.report.ranks);
  const [rows, setRows] = useState(allProducts);
  const isLoading = useSelector((state) => state.report.isLoading);
  const isRender = useSelector((state) => state.report.isRender);
  const [activeBtn, setActiveBtn] = useState(`${monthChange}`);
  const [month, setMonth] = useState(monthChange);
  const [pageSize, setPageSize] = useState(10);

  const [times, setTimes] = useState();

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

  const [loading, setLoading] = useState(false);
  const onClick = (month, index, year) => {
    setMonth(month);
    setActiveBtn(index);
    setLoading(true);
    dispatch(fetchRanks(1, 1000, month, year || yearChange));
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchRanks(1, 1000, monthChange, yearChange));
    }
    console.log("activeBtn", activeBtn);
  }, []);

  useEffect(() => {
    if (times && times?.full) {
      dispatch(fetchRanks(1, 1000, times.month, times.year));
    }
  }, [times]);

  useEffect(() => {
    console.log("ranks", allProducts);
    setRows(allProducts);
  }, [allProducts]);

  useEffect(() => {
    dispatch(fetchRanks(1, 1000, monthChange, yearChange));
    console.log("đã chạy isRender", isRender);
  }, [isRender]);

  const loadingPage = () => {
    dispatch(fetchRanks(1, 1000, monthChange, yearChange));
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // dispatch(deleteProducts(id));

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allProducts.filter((row) => {
      return row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  // table

  const columnss = [
    { id: "codeSeller", label: "CodeSeller", minWidth: 170 },
    { id: "rankPoint", label: "Điểm rank", minWidth: 100 },
    {
      id: "pointSeller",
      label: "Tổng doanh thu",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("IT-it"),
    },
    {
      id: "totalBonusSale",
      label: "Tổng số tiền nhận được",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("IT-it"),
    },
    {
      id: "moneyBonusRank",
      label: "Số tiền nhận thêm từ rank",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];
  const columns = [
    { field: "codeSeller", headerName: "CodeSeller", width: 170 },
    {
      field: "rankPoint",
      headerName: "Điểm rank",
      minWidth: 170,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.rankPoint)}</>;
      },
    },

    {
      field: "pointSeller",
      headerName: "Tổng doanh thu",
      minWidth: 170,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.pointSeller)}</>;
      },
    },
    {
      field: "totalBonusSale",
      headerName: "Tổng số tiền nhận được",
      minWidth: 170,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.totalBonusSale)}</>;
      },
    },
    {
      field: "moneyBonusRank",
      headerName: "Số tiền nhận thêm từ rank",
      minWidth: 170,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.moneyBonusRank)}</>;
      },
    },
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
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Xem</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="product-list-header">
          <div className="header-left d-flex-left">
            <button
              type="button"
              className="productRefeshButton"
              onClick={() => loadingPage()}
            >
              Loading
            </button>
            <div style={{ width: 250 }}>
              <ButtonTimes
                name="rankList"
                // label="Tháng năm"
                times={times}
                setTimes={setTimes}
              />
            </div>
          </div>
          <div className="header-right">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              style={{
                width: 320,
                height: 35,
                marginRight: 50,
                marginBottom: 10,
              }}
              placeholder="Mã CTV"
            />
          </div>
        </div>
        {isLoading ? (
          <ColoredLinearProgress />
        ) : (
          <DataGrid
            rows={rows || allProducts}
            getRowId={(row) => row.idSeller}
            disableSelectionOnClick
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              //2022/04/13 Huynh-dt export file ADD
              Toolbar: () => CustomToolbar("Rank List"),
              //2022/04/13 Huynh-dt export file ADD
            }}
          />
        )}
      </>
    </div>
  );
}
