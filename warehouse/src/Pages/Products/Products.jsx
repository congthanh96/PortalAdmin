import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./products.css";
import { DataGrid } from "@material-ui/data-grid";
import { formatVND } from "../../Utils/formatVND";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//  //2022/04/13 Huynh-dt export file ADD
// import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//  //2022/04/13 Huynh-dt export file ADD
import { actGetProducts } from "../../Actions/ProductsAction/productsAction";
import ColoredLinearProgress from "../../Common/LineProgress";

export default function Products() {
  const dispatch = useDispatch();
  const lstProduct = useSelector((state) => state.productsReducer.products);
  const isLoading = useSelector((state) => state.productsReducer.isLoading);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    try {
      dispatch(actGetProducts());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 110,
      flex: 1,
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
            <img className="productListImg" src={params.row.link} alt="" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "price1",
      headerName: "Price",
      minWidth: 110,
      flex: 1,
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
      field: "action",
      headerName: "Action",
      disableExport: true,
      minWidth: 110,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <ModeEditIcon style={{ marginLeft: 15, marginTop:20 }} />
            </Link>
            {/* <DeleteOutline
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
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <DataGrid
          rows={lstProduct}
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
    </div>
  );
}
