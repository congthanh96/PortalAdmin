/**
 * Bước 2 của thêm sản phẩm
 */
import React from "react";
import { Collapse, Input } from "antd";
import "./stepSecond.css";

const { Panel } = Collapse;
const StepSecond = ({ dataForAddProduct, setDataForAddProduct }) => {
  const handleChangeDataInput = (event) => {
    // console.log(dataForAddProduct)
    setDataForAddProduct({
      ...dataForAddProduct,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container-step2">
      <Collapse accordion>
        <Panel header="Nhập nội dung đầu tiên" key="1">
          <Input.TextArea
            type="text"
            className="css-text-area"
            id="description"
            name="content1"
            placeholder="nhập mô tả"
            onChange={handleChangeDataInput}
            value={dataForAddProduct.content1}
          />
        </Panel>
        <Panel header="Nhập nội dung thứ hai" key="2">
          <Input.TextArea
            type="text"
            className="css-text-area"
            id="description"
            name="content2"
            placeholder="nhập mô tả"
            onChange={handleChangeDataInput}
            value={dataForAddProduct.content2}
          />
        </Panel>
        <Panel header="Nhập nội dung thứ ba" key="3">
          <Input.TextArea
            type="text"
            className="css-text-area"
            id="description"
            name="content3"
            placeholder="nhập mô tả"
            onChange={handleChangeDataInput}
            value={dataForAddProduct.content3}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default StepSecond;
