/**
 * Component danh sách variant của sản phẩm
 */
import React, { useState } from "react";
import { Table, Modal } from "antd";
import NoData from "../NoData/NoData";
import { Link } from "react-router-dom";
import { variantProductAPI } from "../../APIs";
import { toast } from "react-toastify";
import "./variantProduct.css";

const VariantProduct = ({ variantProductData,setVariantProduct }) => {
  const [isVisibleModal,setIsVisibleModal] = useState(false)
  const [variantToRemove,setVariantToRemove] = useState("")
  const onClickRemove = (variant) =>{
    setIsVisibleModal(true)
    console.log(variant)
    setVariantToRemove(variant)
  }
  const handleRemoveVariant =async ()=>{
    try {
      const res = await variantProductAPI.disableVariant(variantToRemove.id);
      console.log(res)
      let temp = variantProductData.filter(data => data.id !== variantToRemove.id);
      setVariantProduct(temp)
      setIsVisibleModal(false)
      toast.success("Ẩn sản phẩm "+ variantToRemove.propertyName +" thành công" )
    } catch (error) {
      toast.error("Ẩn sản phẩm "+ variantToRemove.propertyName +" thất bại" )
    }
  }
  const columnsAntd = [
    {
      title: "Tên phân loại ",
      key: "propertyName",
      dataIndex: "name",
      render: (text, record, index) => record.propertyName || <NoData />,
    },
    {
      title: "Giá trị phân loại",
      dataIndex: "propertyValue",
      render: (text, record, index) => record.propertyValue || <NoData />,
    },
    {
      title: "SKU",
      key: "sku",
      dataIndex: "sku",
      render: (text, record, index) => record.sku || <NoData />,
    },
    {
      title: "Số lượng",
      key: "count",
      dataIndex: "count",
      render: (text, record, index) => <span>{record.count}</span>,
    },
    {
      title: "Chiết khấu",
      key: "count",
      dataIndex: "count",
      render: (text, record, index) => <span>{record.count}%</span>,
    },
    {
      title: "Giá niêm yết",
      key: "price",
      dataIndex: "price",
      render: (text, record, index) => <span>{record.price} VND</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        return (
          <span>
             <Link to={{
                pathname: '/variant/' + record.id,
              }} state={record} className="css-edit">
              Xem
            </Link>
            <span className="css-remove" onClick={() =>onClickRemove(record)}>
              Xóa
            </span>
          </span>
        );
      },
    },
  ];
  return (
    <div className="cardVariant">
      <h3>Thông tin chi tiết - Phân loại</h3>
      <Table
        dataSource={variantProductData}
        columns={columnsAntd}
        rowKey={(row) => row.id}
      ></Table>
      <Modal
        title="Vô hiệu hóa loại sản phẩm"
        visible={isVisibleModal}
        onOk={()=>{
          handleRemoveVariant()
        }}
        onCancel={()=>{setIsVisibleModal(false)}}
      >
         <p>Bạn thực sự muốn vô hiệu hóa loại sản phẩm "{variantToRemove.propertyName} {variantToRemove.propertyValue} "</p>
        
      </Modal>
    </div>
  );
};

export default VariantProduct;
