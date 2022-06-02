/**
 * Trang danh sách sản phẩm
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { formatVND } from "../../Common/formatVND";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { actGetProducts } from "../../Actions/ProductsAction/productsAction";
import ColoredLinearProgress from "../../Common/LineProgress";
import "./products.css";
import { toastr } from "react-redux-toastr";
import { Input } from "antd";
const { Search } = Input;

export default function Products() {
  const dispatch = useDispatch();
  const lstProduct = useSelector((state) => state.productsReducer.products);
  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.productsReducer.isLoading);
  const [pageSize, setPageSize] = useState(10);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    try {
      // Lấy danh sách sản phẩm
      dispatch(actGetProducts());
    } catch (error) {
      toastr.warning("Không thể lấy danh sách sản phẩm");
    }
  }, []);
  useEffect(() => {
    setData(lstProduct);
  }, [lstProduct]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 110,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Product",
      minWidth: 110,
      flex: 1.5,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.link}
              alt=""
              onError={(e) => (e.target.style.display = "none")}
            />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "price1",
      headerName: "Price",
      minWidth: 110,
      flex: 0.5,
      align: "center",
      valueFormatter: ({ value }) => `${value} VND`,
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
      field: "import",
      headerName: "Import",
      disableExport: true,
      minWidth: 110,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/import-product-mount/" + params.row.id}>
              <PlusSquareOutlined style={{ marginLeft: 15, marginTop: 20 }} />
            </Link>
          </>
        );
      },
    },
    {
      field: "export",
      headerName: "Export",
      disableExport: true,
      minWidth: 110,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/export-product-mount/" + params.row.id}>
              <MinusSquareOutlined style={{ marginLeft: 15, marginTop: 20 }} />
            </Link>
          </>
        );
      },
    },
    //   {
    //     field: "action",
    //     headerName: "Action",
    //     disableExport: true,
    //     minWidth: 110,
    //     flex: 0.3,
    //     renderCell: (params) => {
    //       return (
    //         <>
    //           <Link to={"/product/" + params.row.id}>
    //             <ModeEditIcon style={{ marginLeft: 15, marginTop: 20 }} />
    //           </Link>
    //         </>
    //       );
    //     },
    //   },
  ];

  function requestSearch(searchedVal) {
    setIsLoadingSearch(true);
    const filteredRows = lstProduct.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.id.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setData(filteredRows);
    setIsLoadingSearch(false);
  }

  return (
    <div className="productList">
      <h2> Danh sách sản phẩm</h2>
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <>
          {/* <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{
              width: 320,
              height: 35,
              marginRight: 50,
              marginBottom: 10,
            }}
          /> */}
          <div className="header-right">
            <Search
              placeholder="input search text (id, name)"
              allowClear
              enterButton="Search"
              onSearch={(searchVal) => requestSearch(searchVal)}
              style={{ width: 400 }}
              loading={isLoadingSearch}
            />
          </div>

          {data && (
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              //2022/04/13 Huynh-dt export file ADD
              // components={{
              //   Toolbar: () => CustomToolbar("Product List"),
              // }}
              //2022/04/13 Huynh-dt export file ADD
            />
          )}
        </>
      )}
    </div>
  );
}
