import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Menu, Dropdown, Space, Input, Button, Form, Table } from "antd";
import "draft-js/dist/Draft.css";
import "./stepFirst.css";

const StepFirst = ({ dataForAddProduct, setDataForAddProduct }) => {
  const [form] = Form.useForm();
  const handleChangeDataInput = (event) => {
    console.log(dataForAddProduct)
    setDataForAddProduct({
      ...dataForAddProduct,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container-step1">
      <Form layout="inline" form={form}>
        <div className="container-item">
          <span className="css-label">Tên sản phẩm *</span>
          <Input
            placeholder="nhập tên"
            className="css-input-item"
            // value={dataOrder.pick_district}
            name="name"
            onChange={handleChangeDataInput}
          />
        </div>
        <div className="container-item">
          <span className="css-label">Thương hiệu *</span>
          <Input
            placeholder="nhập thương hiệu"
            className="css-input-item"
            // value={dataOrder.pick_ward}
            name="brand"
            onChange={handleChangeDataInput}
          />
        </div>
        <div className="container-item">
          <span className="css-label">Đơn vị tính *</span>
          <Input
            placeholder="nhập địa chỉ chi tiết"
            className="css-input-item"
            // value={dataOrder.pick_address}
            name="packingForm"
            onChange={handleChangeDataInput}
          />
        </div>
        <div className="container-item">
          <span className="css-label">Danh mục sản phẩm *</span>
          <Input
            placeholder="nhập danh mục sản phẩm"
            className="css-input-item"
            // value={dataOrder.pick_tel}
            name="categoryID"
            onChange={handleChangeDataInput}
          />
        </div>
        <div className="container-item">
          <span className="css-label">Đường dẫn tài liệu *</span>
          <Input
            placeholder="nhập đường dẫn tài liệu"
            className="css-input-item"
            // value={dataOrder.pick_tel}
            name="productAsset"
            onChange={handleChangeDataInput}
          />
        </div>
        <div className="container-item">
          <span className="css-label">Mô tả sản phẩm *</span>
          <Input.TextArea
            type="text"
            className="css-text-area"
            id="description"
            name="description"
            placeholder="nhập mô tả"
            onChange={handleChangeDataInput}
            // value={inputField.description}
            // onChange={(event) => handleInputChange(index, event)}
            // style={{ minHeight: 128, width: 800 }}
         
            // defaultValue={""}
          />
        </div>
      </Form>
    </div>
  );
};

export default StepFirst;
