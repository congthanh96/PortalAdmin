import { DataGrid } from "@material-ui/data-grid";
import _ from "lodash";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { CustomNoRowsOverlay } from "../../components/empty/CustomNoRowsOverlay";
import { ButtonTimes } from "../../components/times/ButtonTimes";
import { productRows } from "../../dummyData";
import { fetchReports, sendReportPersonAction } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./reportList.css";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;
console.log(today);
console.log(dd);

var monthChange = mm,
  yearChange = yyyy;

export default function ReportList() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { reportId } = useParams();

  const allData = useSelector((state) => state.report.reports);

  const monthRequest = useSelector((state) => state.report.month);
  const [pageSize, setPageSize] = useState(50);
  const isLoading = useSelector((state) => state.report.isLoading);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(`${monthChange}`);
  const [month, setMonth] = useState(monthChange);
  const [rows, setRows] = useState(allData);
  const [checkSearch, setCheckSearch] = useState(false);
  const [sortModel, setSortModel] = useState([
    { field: "sumbonus", sort: "desc" },
  ]);

  const [times, setTimes] = useState();

  const loadingPage = () => {
    cancelSearch();
  };

  const [data, setData] = useState(productRows);

  useEffect(() => {
    reloadPage();
  }, []);
  useEffect(() => {
    if (reportId !== undefined) {
      requestSearch(`${reportId}`);
    }
  }, [reportId, checkSearch]);

  useEffect(() => {
    if (times && times?.fullYear) {
      dispatch(fetchReports(times.month, times.year));
    }
  }, [times]);

  const reloadPage = async () => {
    if (allData.length === 0 || monthRequest !== monthChange) {
      await dispatch(fetchReports(monthChange, yearChange));
      setCheckSearch(!checkSearch);
    }
    setCheckSearch(!checkSearch);
  };

  useEffect(() => {
    setRows(allData);
  }, [allData]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const sendReportPerson = async (id) => {
    console.log(id, month);
    dispatch(sendReportPersonAction(month, id));
  };

  const columns = [
    {
      field: "codeSeller",
      headerName: "CodeSeller",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row.codeSeller}>
            <button className="userListEdit">{params.row.codeSeller}</button>
          </Link>
        );
      },
    },
    {
      field: "codeReferal",
      headerName: "MGT",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row.codeReferal}>
            <button className="userListEditMGT">
              {params.row.codeReferal}
            </button>
          </Link>
        );
      },
    },
    { field: "fullName", headerName: "Tên", width: 200 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "phone", headerName: "SDT", width: 120 },
    {
      field: "revenueSale",
      headerName: "Tổng doanh thu",
      width: 140,
      align: "right",

      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row.codeSeller}>
              <button className="userListEditMoney">
                {formatVND(params.row.revenueSale)}
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "bonusSale",
      headerName: "HH Cá nhân",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusSale)}</>;
      },
    },
    {
      field: "bonusSellerDown",
      headerName: "Thưởng nhóm",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusSellerDown)}</>;
      },
    },
    {
      field: "bonusRank",
      headerName: "HH Rank",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusRank)}</>;
      },
    },
    {
      field: "other",
      headerName: "Khác",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.other)}</>;
      },
    },
    {
      field: "sumbonus",
      headerName: "TN Tháng",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row.codeSeller}>
              <button className="userListEditMoney">
                {formatVND(params.row.sumbonus)}
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "leftMoney",
      headerName: "Số dư Ví",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.leftMoney)}</>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => sendReportPerson(params.row.idSeller)}
            >
              Gửi báo cáo
            </button>
          </>
        );
      },
    },
  ];

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allData.filter((row) => {
      return (
        row.email?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.fullName?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.phone?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase())
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
      <>
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
                width: 420,
                height: 35,
                marginRight: 50,
                marginBottom: 10,
              }}
              placeholder="Họ tên, số điện thoại, email..."
            />
          </div>
        </div>
        {isLoading ? (
          <ColoredLinearProgress />
        ) : (
          <DataGrid
            rows={rows || allData}
            getRowId={(row) => row.idSeller}
            // disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[50, 75, 100, 200]}
            pagination
            sortModel={sortModel}
            onSortModelChange={(model) => {
              if (!_.isEqual(model, sortModel)) {
                // console.log("đã chạy !");
                setSortModel(model);
              }
            }}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            // checkboxSelection
          />
        )}
      </>
      {/* 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string */}
      {/* 'small' | 'medium' | 'large' | string */}
      {/* 'contained' | 'outlined' | 'text' | string */}
    </div>
  );
}
