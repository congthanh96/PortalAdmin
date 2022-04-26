import React, { useState } from "react";
import { DataGrid, useGridApiRef } from "@material-ui/data-grid";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { productAPI } from "../../APIs";
import { toastr } from "react-redux-toastr";
import "./variantProduct.css";
const VariantProduct = ({ variantProductData }) => {
  const apiRef = useGridApiRef();
  const [data ,setData] =useState(variantProductData) 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [numImport, setNumImport] = useState(0);
  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  function importGood(data) {
    setDataToUpdate(data);
    setIsModalVisible(true);
    console.log(data + "#123");
  }

  function exportGood(data) {
    console.log("export" + data);
  }

  async function updateMountVariant() {
    try {
      const numAfterUpdate = dataToUpdate.count + parseInt(numImport)
      const dataUpdate = {...dataToUpdate,count:numAfterUpdate}
      setDataToUpdate(dataUpdate)
      const res = await productAPI.updateMountVariantProduct(
        JSON.stringify(dataUpdate)
      );
      setIsModalVisible(false);
      updateAmountVariantProduct(dataUpdate.id,dataUpdate.count)
      setNumImport(0)
      //apiRef.current.updateRows([{ count:numAfterUpdate }]);
      // const row = apiRef.current.getRow(dataToUpdate.id);
      // apiRef.current.updateRows([{ ...row, count: numAfterUpdate }]);
      toastr.success("Update the number of variant products successfully");

      console.log(res);
    } catch (error) {
      setIsModalVisible(false);
      toastr.error("Update the number of variant products failed");
      console.log(error);
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Phân loại",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imageLink}
              alt=""
            />
            {params.row.propertyName}
          </div>
        );
      },
    },
    { field: "propertyValue", headerName: "Thuộc tính", width: 150 },
    { field: "sku", headerName: "Thuộc tính", width: 150 },

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
      field: "percent",
      headerName: "Chiết khấu",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{params.row.percent}%</>;
      },
    },
    { field: "count", headerName: "Số lượng", width: 140, align: "center" },
    {
      field: "weight",
      headerName: "Cân nặng(gram)",
      width: 140,
      align: "center",
    },
    { field: "tag1", headerName: "Dễ vở", width: 140, align: "center" },
    {
      field: "tag7",
      headerName: "Nông sản/ thực phẩm khô",
      width: 140,
      align: "center",
    },
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
  ];
function updateAmountVariantProduct(id, count) {
    console.log(id+"id")
    console.log(count+"count")
    setData((data) => {
      return data.map((row, index) =>
        row.id === id
          ? { ...row, count: count }
          : row
      );
    });
  }
  return (
    <div className="cardVariant">
      <label>Thông tin chi tiết - Phân loại</label>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={100}
        // checkboxSelection
        style={{ height: 400 }}
      />
      <Modal
        title="Nhập hàng"
        visible={isModalVisible}
        onOk={() => {
          updateMountVariant();
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <p>Số lượng hàng hiện tại: {dataToUpdate.count}</p>
        <p>
          Số lượng hàng thêm vào:
          <input
            type="number"
            style={{ marginLeft: 5 }}
            value={numImport}
            min = "0"
            onChange={(e) => setNumImport(e.target.value)}
          ></input>
        </p>
      </Modal>
    </div>
  );
};

export default VariantProduct;
