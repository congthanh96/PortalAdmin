import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RatingStar } from "../../components/common/starRatings/RatingStar";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { deleteProducts, fetchProducts } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./productList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

export default function ProductList() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.products);
  const [rows, setRows] = useState(allProducts);
  const isLoading = useSelector((state) => state.product.isLoading);
  const isRender = useSelector((state) => state.product.isRender);
  const [pageSize, setPageSize] = useState(10);
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
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts(500, 1));
    }
  }, []);
  useEffect(() => {
    if (allProducts.length !== 0) {
      setRows(allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    dispatch(fetchProducts(500, 1));
    console.log("đã chạy isRender", isRender);
  }, [isRender]);

  const loadingPage = () => {
    dispatch(fetchProducts(500, 1));
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteProducts(id));

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

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "name",
      headerName: "Product",
      width: 500,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.link} alt="" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "price1",
      headerName: "Price",
      width: 140,
      align: "center",
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value} VND`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            <span style={{ textAlign: "right" }}>
              {formatVND(params.row.price1)}
            </span>
          </>
        );
      },
    },
    {
      field: "ratingScores",
      headerName: "Ratings",
      width: 140,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <span>
              <RatingStar rating={params.row.ratingScores || 0} />{" "}
              {params.row.amountRating}
            </span>
          </>
        );
      },
    },
    {
      field: "countLike",
      headerName: "Likes",
      width: 140,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <span>
              {params.row.countLike || 0} <HiHeart />
            </span>
          </>
        );
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
              <button className="productListEdit">Xem/ Sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Thực hiện sẽ không thể thay đổi!",
                  subTitle: "Chắc chắn?",
                  onConfirm: () => {
                    handleDelete(params.row.id);
                  },
                });
              }}
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
  const [checkAll, setCheckAll] = useState([]);
  const getCheckAll = () => {
    console.log(checkAll);
  };

  return (
    <div className="productList">
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
          <Link to="/newproduct">
            <button className="productAddButton">Thêm sản phẩm</button>
          </Link>
          <div className="mr-2"></div>
          <button className="productAddButton" onClick={getCheckAll}>
            Chọn sản phẩm
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
          rows={rows || allProducts}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id.toString())
            );
            setCheckAll(selectedRowData.map((value) => value.id));
          }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          //2022/04/13 Huynh-dt export file ADD
          components={{
            Toolbar: () => CustomToolbar("Product List"),
          }}
          //2022/04/13 Huynh-dt export file ADD
        />
      )}
    </div>
  );
}
