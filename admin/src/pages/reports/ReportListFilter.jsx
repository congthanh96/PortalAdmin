import { useEffect } from "react";
import "./reportList.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchReports, sendReportPersonAction } from "../../reducers";
import SearchBar from "material-ui-search-bar";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";

export default function ReportList() {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.report.reports);
     const [pageSize, setPageSize] = useState(10);
  const isLoading = useSelector((state) => state.report.isLoading);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [month, setMonth] = useState(8);
  const [rows, setRows] = useState(allData);

  const onClick = (month, index) => {
    setMonth(month);
    setActiveBtn(index);
    setLoading(true);
    dispatch(fetchReports(month, "2021"));
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  const [data, setData] = useState(productRows);
  console.log("data", productRows);
  useEffect(() => {
    if (allData.length === 0) {
      dispatch(fetchReports("08", "2021"));
    }
  }, []);
    useEffect(() => {
    console.log(allData);
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
  }

  const columns = [
    {
      field: "codeSeller", headerName: "CodeSeller", width: 120,
      renderCell: (params) => {
        return <Link to={"/user/" + params.row.codeSeller}>
          <button className="userListEdit">{ params.row.codeSeller}</button>
            </Link>
      },  },
    {
      field: "codeReferal", headerName: "MGT", width: 120,
      renderCell: (params) => {
        return <Link to={"/user/" + params.row.codeReferal}>
          <button className="userListEditMGT">{ params.row.codeReferal}</button>
            </Link>
      }, },
    { field: "fullName", headerName: "Tên", width: 200 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "phone", headerName: "SDT", width: 120 },
    {
      field: "revenueSale",
      headerName: "Tổng doanh thu",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.revenueSale)}</>;
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
        return <>{formatVND(params.row.sumbonus)}</>;
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
             <button className="productListEdit" onClick={() => sendReportPerson(params.row.idSeller)}>Gửi báo cáo</button>
          </>
        );
      },
    },
  ];
    const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allData.filter((row) => {

      return row.email?.toLowerCase().includes(searchedVal.toLowerCase()) || row.fullName?.toLowerCase().includes(searchedVal.toLowerCase()) || row.phone?.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  return (
    <div className="productList">
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <>
         
            
          <div className="product-list-header">
            <div className="header-left">
              <ButtonComponent
            color={activeBtn === 0 ? "primary" : "#FEDBD0"}
            variant={"contained"}
            onClick={() => onClick('08', 0)}
            loading={loading}
            name={"Tháng 8"}
          />
          <ButtonComponent
            color={activeBtn === 1 ? "primary" : "#FEDBD0"}
            variant={"contained"}
            onClick={() => onClick('09', 1)}
            loading={loading}
            name={"Tháng 9"}
          />
          <ButtonComponent
            color={activeBtn === 2 ? "primary" : "#FEDBD0"}
            variant={"contained"}
            onClick={() => onClick('10', 2)}
            loading={loading}
            name={"Tháng 10"}
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
                  placeholder="Họ tên, số điện thoại, email..."
              />
            </div>
            </div>

          <DataGrid
            rows={rows || allData}
            getRowId={(row) => row.codeSeller}
            disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
          />
        </>
      )}
      {/* 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string */}
      {/* 'small' | 'medium' | 'large' | string */}
      {/* 'contained' | 'outlined' | 'text' | string */}
    </div>
  );
}
