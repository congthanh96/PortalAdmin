import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productApiPr } from "../../api/private/productApiPr";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { deleteProducts, fetchProductEnable } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./productList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

export default function ProductListEnable() {
  const dispatch = useDispatch();

  const { isLoading, productEnable, isRender } = useSelector(
    (state) => state.product
  );
  const [rows, setRows] = useState([]);
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
    if (productEnable.length === 0) {
      dispatch(fetchProductEnable(20000, 1));
    }
  }, []);
  useEffect(() => {
    if (productEnable.length > 0) {
      setRows(productEnable);
    }
  }, [productEnable]);

  // useEffect(() => {
  //   dispatch(fetchproductEnable(500, 1))
  // }, [isRender])

  const loadingPage = () => {
    dispatch(fetchProductEnable(500, 1));
  };
  const handleActive = async (id) => {
    try {
      const response = await productApiPr.active(id);
      console.log(response);
      alert("thành công");
    } catch (error) {
      console.log(error);
    }
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
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product",
      width: 600,
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
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value} VND`,
      //2022/04/13 Huynh-dt export file ADD
      align: "center",
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
      field: "action",
      headerName: "Action",
      width: 150,
      //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => {
                handleActive(params.row.id);
              }}
            >
              Bật sản phẩm
            </button>
          </>
        );
      },
    },
  ];

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = productEnable.filter((row) => {
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
          rows={rows || productEnable}
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
            Toolbar: () => CustomToolbar("Product Enable List"),
          }}
          //2022/04/13 Huynh-dt export file ADD
        />
      )}
    </div>
  );
}
