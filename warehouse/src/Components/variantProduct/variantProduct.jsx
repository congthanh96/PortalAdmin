/**
 * Component danh sách variant của sản phẩm
 */
import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { productAPI } from "../../APIs";
import { toastr } from "react-redux-toastr";
import { formatVND } from "../../Utils/formatVND";
import "./variantProduct.css";

const VariantProduct = ({ variantProductData }) => {
  const [data, setData] = useState(variantProductData);
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [isModalImportVisible, setIsModalImportVisible] = useState(false);
  const [numImport, setNumImport] = useState(0);
  const [isModalExportVisible, setIsModalExportVisible] = useState(false);
  const [numExport, setNumExport] = useState(0);

  // Xử lý hiển thị thêm số lượng sản phẩm
  function importGood(data) {
    setDataToUpdate(data);
    setIsModalImportVisible(true);
  }

  // Thêm số lượng sản phẩm
  async function importMountVariant() {
    try {
      if (numImport === 0 || numImport === "") {
        toastr.warning("Bạn chưa nhập số lượng sản phẩm muốn thêm!");
        return;
      }
      const numAfterUpdate = dataToUpdate.count + parseInt(numImport);
      if (numAfterUpdate < 0) {
        toastr.warning("Số lượng hàng trong kho của sản phẩm không đủ!");
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      await productAPI.updateMountVariantProduct(
        JSON.stringify(dataUpdate)
      );
      setIsModalImportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumImport(0);
      toastr.success("Nhập hàng thành công");
    } catch (error) {
      setIsModalImportVisible(false);
      toastr.error("Nhập hàng thất bại");
    }
  }

  // Xử lý hiển thị bớt số lượng sản phẩm
  function exportGood(data) {
    setDataToUpdate(data);
    setIsModalExportVisible(true);
  }

  // Bớt số lượng sản phẩm
  async function exportMountVariant() {
    try {
      if (numExport === 0 || numExport === "") {
        toastr.warning("Bạn chưa nhập số lượng sản phẩm muốn giảm!");
        return;
      }
      let numAfterUpdate = dataToUpdate.count - parseInt(numExport);
      if (numAfterUpdate < 0) {
        toastr.warning("Số lượng hàng trong kho của sản phẩm không đủ!");
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      await productAPI.updateMountVariantProduct(
        JSON.stringify(dataUpdate)
      );
      setIsModalExportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumExport(0);
      toastr.success("Xuất/hủy/trả hàng thành công");
    } catch (error) {
      setIsModalExportVisible(false);
      toastr.error("Xuất/hủy/trả hàng thất bại");
    }
  }

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
    {
      field: "nhập hàng",
      headerName: "Nhập hàng",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        return (
          <label className="btnAdd" onClick={() => importGood(params.row)}>
            Nhập hàng
          </label>
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
          <label className="btnExcept" onClick={() => exportGood(params.row)}>
            Xuất hàng
          </label>
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

  function updateAmountVariantProduct(id, count) {
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

      {/* Form thêm hàng */}
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

      {/* Form bớt hàng */}
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
