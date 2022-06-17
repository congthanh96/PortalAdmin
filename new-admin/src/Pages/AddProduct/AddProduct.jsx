import React, { useState } from "react";
import { Input, Spin, Table, Modal, Steps, Button, message } from "antd";
import TopPage from "../../Components/toppage/topPage";
import StepFirst from "../../Components/stepsAddProduct/StepFirst/StepFirst";
import StepSecond from "../../Components/stepsAddProduct/StepSecond/StepSecond";
import StepThird from "../../Components/stepsAddProduct/StepThird/StepThird";

import "./addProduct.css";
const { Step } = Steps;
const steps = [
  {
    title: "First",
  },
  {
    title: "Second",
  },
  {
    title: "Last",
  },
];
const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
const [dataForAddProduct,setDataForAddProduct] = useState(
    {
        name: "string",
        brand: "string",
        link: "string",
        packingForm: "string",
        description: "string",
        productAsset: "string",
        sku: "string",
        categoryId: "string",
        content1: "string",
        content2: "string",
        content3: "string",
        variant:[]
      }
)

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/products",
      nameLink: "Danh sách sản phẩm",
    },
    {
      linkTo: "/new-product",
      nameLink: "Thêm sản phẩm",
    },
  ];
  const renderCurrentSelection = () => {
    switch (current) {
      case 0:
        return <StepFirst dataForAddProduct={dataForAddProduct} setDataForAddProduct={setDataForAddProduct}/>;
      case 1:
        return <StepSecond />;
      case 2:
        return <StepThird />;
      default:
        return null;
    }
  };
  return (
    <div className="products-container">
      <Spin spinning={isLoading}>
        <TopPage dataProps={dataTop} />
        <div className="container-steps">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{renderCurrentSelection()}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default AddProduct;
