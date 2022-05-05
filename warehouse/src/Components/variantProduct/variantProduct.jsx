import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { productAPI } from "../../APIs";
import { toastr } from "react-redux-toastr";
import "./variantProduct.css";
import { formatVND } from "../../Utils/formatVND";

const VariantProduct = ({ variantProductData }) => {
  const [data, setData] = useState(variantProductData);
  console.log(data)
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  // object for import
  const [isModalImportVisible, setIsModalImportVisible] = useState(false);
  const [numImport, setNumImport] = useState(0);

  //object for export
  const [isModalExportVisible, setIsModalExportVisible] = useState(false);
  const [numExport, setNumExport] = useState(0);

  //method for import
  function importGood(data) {
    setDataToUpdate(data);
    setIsModalImportVisible(true);
    console.log(data + "#123");
  }

  async function importMountVariant() {
    try {
      console.log(numImport);
      if (numImport === 0 || numImport === "") {
        toastr.warning("You did not enter a number");
        return;
      }
      const numAfterUpdate = dataToUpdate.count + parseInt(numImport);
      if (numAfterUpdate < 0) {
        toastr.warning(
          "The quantity of goods in stock is not enough for export"
        );
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      const res = await productAPI.updateMountVariantProduct(
        JSON.stringify(dataUpdate)
      );
      setIsModalImportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumImport(0);
      //apiRef.current.updateRows([{ count:numAfterUpdate }]);
      // const row = apiRef.current.getRow(dataToUpdate.id);
      // apiRef.current.updateRows([{ ...row, count: numAfterUpdate }]);
      toastr.success("Import variant products successfully");

      console.log(res);
    } catch (error) {
      setIsModalImportVisible(false);
      toastr.error("Import variant products failed");
      console.log(error);
    }
  }

  //method for export
  function exportGood(data) {
    setDataToUpdate(data);
    setIsModalExportVisible(true);
    console.log("export" + data);
  }

  async function exportMountVariant() {
    try {
      if (numExport === 0 || numExport === "") {
        toastr.warning("You did not enter a number");
        return;
      }
      let numAfterUpdate = dataToUpdate.count - parseInt(numExport);
      // numAfterUpdate = numAfterUpdate < 0 ? 0 : numAfterUpdate;
      // console.log(numAfterUpdate);
      if (numAfterUpdate < 0) {
        toastr.warning(
          "The quantity of goods in stock is not enough for export"
        );
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      const res = await productAPI.updateMountVariantProduct(
        JSON.stringify(dataUpdate)
      );
      setIsModalExportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumExport(0);
      //apiRef.current.updateRows([{ count:numAfterUpdate }]);
      // const row = apiRef.current.getRow(dataToUpdate.id);
      // apiRef.current.updateRows([{ ...row, count: numAfterUpdate }]);
      toastr.success("Export variant products successfully");

      console.log(res);
    } catch (error) {
      setIsModalExportVisible(false);
      toastr.error("Export variant products failed");
      console.log(error);
    }
  }

  const columns = [
    {
      field: "product",
      headerName: "Phân loại",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageLink} alt="" />
            {params.row.propertyName}
          </div>
        );
      },
    },
    { field: "propertyValue", headerName: "Thuộc tính", width: 150 },
    { field: "sku", headerName: "Thuộc tính", width: 150 },
    {
      field: "nhập hàng",
      headerName: "Nhập hàng",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        return (
          <>
            <button className="btnAdd" onClick={() => importGood(params.row)}>
              Nhập hàng
            </button>
          </>
        );
      },
    },
    {
      field: "xuất hàng",
      headerName: "Xuất hàng hàng",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        return (
          <button className="btnExcept" onClick={() => exportGood(params.row)}>
            Xuất hàng
          </button>
        );
      },
    },

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
    { field: "tag1", headerName: "Dễ vỡ", width: 140, align: "center" },
    {
      field: "tag7",
      headerName: "Nông sản/ thực phẩm khô",
      width: 140,
      align: "center",
    },
    { field: "id", headerName: "ID", width: 90 },
  ];

  function updateAmountVariantProduct(id, count) {
    console.log(id + "id");
    console.log(count + "count");
    setData((data) => {
      return data.map((row, index) =>
        row.id === id ? { ...row, count: count } : row
      );
    });
  }
  return (
    <div className="cardVariant">
      <h3>Thông tin chi tiết - Phân loại</h3>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        style={{ height: 400 }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        pagination
      />
      <Modal
        title="Nhập hàng"
        visible={isModalImportVisible}
        onOk={() => {
          importMountVariant();
        }}
        onCancel={() => {
          setIsModalImportVisible(false);
        }}
      >
        <p>Số lượng hàng hiện tại: {dataToUpdate.count}</p>
        <p>
          Số lượng hàng thêm vào:
          <input
            type="number"
            className="inputNum"
            value={numImport}
            min="0"
            onChange={(e) => setNumImport(e.target.value)}
          ></input>
        </p>
      </Modal>

      <Modal
        title="Xuất hàng/ Hủy hàng/ Hàng hết hạn"
        visible={isModalExportVisible}
        onOk={() => {
          exportMountVariant();
        }}
        onCancel={() => {
          setIsModalExportVisible(false);
        }}
      >
        <p>Số lượng hàng hiện tại: {dataToUpdate.count}</p>
        <p>
          Số lượng hàng xuất ra:
          <input
            type="number"
            className="inputNum"
            value={numExport}
            min="0"
            onChange={(e) => setNumExport(e.target.value)}
          ></input>
        </p>
      </Modal>
    </div>
  );
};

export default VariantProduct;
