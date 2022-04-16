import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import _ from "lodash";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchPromotion } from "../../../reducers";
import ColoredLinearProgress from "../../../_constants/UI/button/LineProgress";
import "./promotionList.css";
 //2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../../components/ToolbarExportToCSV/CustomToolbar";
 //2022/04/13 Huynh-dt export file ADD

export default function PromotionList() {
  const location = useLocation();

  console.log("location", location?.state?.isLoading);
  console.log("location", location?.state);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.promotion.promotions);
  const isLoading = useSelector((state) => state.promotion.isLoading);
  const [rows, setRows] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchPromotion());
    }
    if (location) {
      dispatch(fetchPromotion());
    }
  }, []);
  useEffect(() => {
    setRows(allProducts);
  }, [allProducts]);
  const loadingPage = () => {
    dispatch(fetchPromotion());
  };

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const [sortModel, setSortModel] = useState([{ field: "id", sort: "desc" }]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên khuyến mãi", width: 250 },
    { field: "sDate", headerName: "Bắt đầu", width: 180 },
    { field: "eDate", headerName: "Kết thúc", width: 180 },
    {
      field: "action",
      headerName: "Action",
       //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
       //2022/04/13 Huynh-dt export file ADD
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/promotion/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allProducts.filter((row) => {
      return row.name?.toLowerCase().includes(searchedVal.toLowerCase());
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
          <div className="header-left">
            <button
              type="button"
              className="productRefeshButton"
              onClick={() => loadingPage()}
            >
              Loading
            </button>
            <Link to="/promotion-add">
              <button className="productAddButton">Thêm khuyến mãi</button>
            </Link>
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
            rows={rows || allProducts}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            sortModel={sortModel}
            onSortModelChange={(model) => {
              if (!_.isEqual(model, sortModel)) {
                console.log("đã chạy !");
                setSortModel(model);
              }
            }}
             //2022/04/13 Huynh-dt export file ADD
            components={{
              Toolbar: () => CustomToolbar("Promotion List"),
            }}
             //2022/04/13 Huynh-dt export file ADD
          />
        )}
      </>
    </div>
  );
}
