import { DataGrid} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRows } from "../../dummyData";
import { fetchUser } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./userList.css";
 //2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
 //2022/04/13 Huynh-dt export file END

export default function UserList() {
  const [data, setData] = useState(userRows);

  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.user.listUser);

  const [rows, setRows] = useState(fetchData);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [pageSize, setPageSize] = useState(10);
  console.log("isLoading", isLoading);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  useEffect(() => {
    if (fetchData.length === 0) {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    console.log("da chay 123123");
    console.log(fetchData);
    setRows(fetchData);
  }, [fetchData]);

  const loadingPage = () => {
    dispatch(fetchUser());
  };

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

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "createTime", headerName: "Thời gian tạo", width: 110 },
    {
      field: "code",
      headerName: "Mã CTV",
      width: 150,
    },

    { field: "email", headerName: "Email", width: 250 },
    {
      field: "firstName",
      headerName: "Họ tên",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <span>
              {params.row.firstName !== null && params.row.lastName
                ? params.row.firstName + " " + params.row.lastName
                : `-`}
            </span>
          </>
        );
      },
    },
    { field: "iDrecommend", headerName: "Người giới thiệu", width: 130 },
    { field: "phone", headerName: "Phone", width: 120 },

    {
      field: "action",
       //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
       //2022/04/13 Huynh-dt export file END
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Xem</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = fetchData.filter((row) => {
      // console.log(row.firstName);
      return (
        (
          row.firstName?.toLowerCase() +
          " " +
          row.lastName?.toLowerCase()
        ).includes(searchedVal.toLowerCase()) ||
        row.phone?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.email?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.code?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.id?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  
  return (
    <div className="userList">
      <div className="product-list-header">
        <div className="header-left">
          <button
            type="button"
            className="productRefeshButton"
            onClick={() => loadingPage()}
          >
            Loading
          </button>
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
          />
        </div>
      </div>
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <DataGrid
          rows={rows || fetchData}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
           //2022/04/13 Huynh-dt export file ADD
          components={{
            Toolbar: () => CustomToolbar("User List"),
          }}
           //2022/04/13 Huynh-dt export file END
        />
      )}
    </div>
  );
}
