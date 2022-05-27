/**
 * Component danh sách variant của sản phẩm
 */
import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { productAPI } from "../../APIs";
import { toastr } from "react-redux-toastr";
import { formatVND } from "../../Common/formatVND";
import "./variantProduct.css";

const VariantProduct = ({ variantProductData }) => {
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      field: "image",
      headerName: "Sản phẩm",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <img className="productListImg" src={params.row.imageLink} alt="" />
        );
      },
    },
    { field: "propertyName", headerName: "Loại thuộc tính", width: 150 },
    { field: "propertyValue", headerName: "Giá trị thuộc tính", width: 150 },
    { field: "sku", headerName: "SKU", width: 150 },
    { field: "count", headerName: "Số lượng", width: 140, align: "center" },
    {
      field: "percent",
      headerName: "Chiết khấu",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{params.row.percent}%</>;
      },
    },

    {
      field: "price",
      headerName: "Giá niêm yết",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>;
      },
    },
    {
      field: "moneyReceived",
      headerName: "Giá Seller",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.moneyReceived)}</>;
      },
    },

    {
      field: "weight",
      headerName: "Cân nặng(gram)",
      width: 140,
      align: "center",
    },
    {
      field: "Loại hàng",
      headerName: "Thuộc tính",
      width: 140,
      align: "center",
      renderCell: (params) => {
        if (params.row.tag1 === true && params.row.tag7 === true) {
          return <>Dễ vỡ + Nông sản/ Thực phẩm khổ</>;
        } else if (params.row.tag1 === true) {
          return <>Dễ vỡ</>;
        } else if (params.row.tag7) {
          return <>Nông sản/ Thực phẩm khô</>;
        } else return <>Không</>;
      },
    },
    // { field: "id", headerName: "ID", width: 90 },
  ];

  return (
    <div className="cardVariant">
      <h3>Thông tin chi tiết - Phân loại</h3>
      <DataGrid
        rows={variantProductData}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        style={{ height: 400 }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        pagination
      />
    </div>
  );
};

export default VariantProduct;
