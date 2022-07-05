import React, { useEffect, useState } from "react";
import { Spin, Steps } from "antd";
import { toast } from "react-toastify";
import TopPage from "../../../Components/toppage/topPage";
import StepFirst from "../../../Components/stepsAddProduct/StepFirst/StepFirst";
import StepSecond from "../../../Components/stepsAddProduct/StepSecond/StepSecond";
import StepThird from "../../../Components/stepsAddProduct/StepThird/StepThird";
import { imageAPI, productsAPI, variantProductAPI } from "../../../APIs";
import ButtonComponent from "../../../Components/button/ButtonComponent";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [lstCategory, setLstCategory] = useState([]);
  const [dataForAddProduct, setDataForAddProduct] = useState({
    id: "",
    name: "",
    brand: "",
    link: "",
    fileImage: "",
    packingForm: "",
    description: "",
    productAsset: "",
    sku: "",
    categoryId: "",
    content1: "",
    content2: "",
    content3: "",
    variants: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productsAPI.getListCategory();
        // console.log(res);
        setLstCategory(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  const next = async () => {
    let isValidateStep1 = true;
    setIsLoading(true);
    if (current === 0) {
      if (
        dataForAddProduct.name.trim() === "" ||
        dataForAddProduct.name.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (
        dataForAddProduct.brand.trim() === "" ||
        dataForAddProduct.brand.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (
        dataForAddProduct.packingForm.trim() === "" ||
        dataForAddProduct.packingForm.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (
        dataForAddProduct.categoryId.trim() === "" ||
        dataForAddProduct.categoryId.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (
        dataForAddProduct.productAsset.trim() === "" ||
        dataForAddProduct.productAsset.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (
        dataForAddProduct.description.trim() === "" ||
        dataForAddProduct.description.trim() === null
      ) {
        isValidateStep1 = false;
      }
      if (dataForAddProduct.fileImage === "") {
        // console.log(dataForAddProduct.fileImage);
        isValidateStep1 = false;
      } else {
        try {
          let data1 = new FormData();
          data1.append("File", dataForAddProduct.fileImage);
          data1.append("Type", "Product");
          data1.append("Width", 244);
          data1.append("Height", 244);
          // for (const value of data1.values()) {
          //   console.log(value);
          // }
          // let data2 = new FormData();
          // data2.append('File', dataForAddProduct.fileImage);
          // data2.append('Type',"Product")
          // data2.append('Width',600)
          // data2.append('Height',600)
          // for (const value of data2.values()) {
          //   console.log(value);
          // }
          const res1 = await imageAPI.uploadImage(data1);
          // // const res2 = await imageAPI.uploadImage(data2)
          // console.log(res1);
          // console.log(res2)
          setDataForAddProduct({ ...dataForAddProduct, link: res1 });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          isValidateStep1(false);
          toast.error(error);
        }
      }
      // console.log(isValidateStep1);
      // console.log(dataForAddProduct);
      if (isValidateStep1 === true) {
        toast.success("Lưu hình ảnh thành công");
        setCurrent(current + 1);
      } else {
        toast.error("Vui lòng điền đầy đủ thông tin trước khi qua bước 2!");
      }
    }

    if (current === 1) {
      try {
        let data = JSON.stringify({
          name: dataForAddProduct.name,
          brand: dataForAddProduct.brand,
          link: dataForAddProduct.link,
          packingForm: dataForAddProduct.packingForm,
          description: dataForAddProduct.description,
          productAsset: dataForAddProduct.productAsset,
          sku: dataForAddProduct.sku,
          categoryId: dataForAddProduct.categoryId,
          content1: dataForAddProduct.content1,
          content2: dataForAddProduct.content2,
          content3: dataForAddProduct.content3,
        });
        // console.log(data);
        const res = await productsAPI.createProduct(data);
        // console.log(res);
        setDataForAddProduct({ ...dataForAddProduct, id: res.id });
        setCurrent(current + 1);
        toast.success("Tạo sản phẩm thành công");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
      setCurrent(current + 1);
    }

    // if(current===2)
    // {
    //   console.log(dataForAddProduct)
    // }
    setIsLoading(false);
    // setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 1) {
      setCurrent(current - 1);
    }
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

  const handleAddVariant = async () => {
    let isValidateStep3 = true;
    setIsLoading(true);
    // console.log(dataForAddProduct);
    dataForAddProduct.variants.forEach(async (value, index) => {
      if (value.propertyName.trim() === "") {
        isValidateStep3 = false;
      }
      if (value.propertyValue.trim() === "") {
        isValidateStep3 = false;
      }
      if (value.sku.trim() === "") {
        isValidateStep3 = false;
      }
      if (value.srcImage === null) {
        isValidateStep3 = false;
      }
      if (isValidateStep3 === true) {
        try {
          let dataForUploadImage = new FormData();
          dataForUploadImage.append(
            "File",
            dataForAddProduct.variants[index].imageFile
          );
          dataForUploadImage.append("Type", "Variant");
          dataForUploadImage.append("Width", 244);
          dataForUploadImage.append("Height", 244);
          const resUploadImage = await imageAPI.uploadImage(dataForUploadImage);
          let data = JSON.stringify({
            productId: dataForAddProduct.id,
            price: parseFloat(dataForAddProduct.variants[index].price),
            priceSeller: parseFloat(
              dataForAddProduct.variants[index].priceSeller
            ),
            moneyReceived: parseFloat(
              dataForAddProduct.variants[index].moneyReceived
            ),
            percent: parseFloat(dataForAddProduct.variants[index].percent),
            propertyName: dataForAddProduct.variants[index].propertyName,
            propertyValue: dataForAddProduct.variants[index].propertyValue,
            count: parseFloat(dataForAddProduct.variants[index].count),
            sku: dataForAddProduct.variants[index].sku,
            imageLink: resUploadImage,
            weight: parseFloat(dataForAddProduct.variants[index].weight),
            tag1:
              dataForAddProduct.variants[index].tag1 === "true" ? true : false,
            tag7:
              dataForAddProduct.variants[index].tag7 === "true" ? true : false,
          });
          // console.log(data);
          const res = await variantProductAPI.addVariantToProduct(data);
          // console.log(res);
          setIsLoading(false);
          toast.success("Lưu variant cho sản phẩm thành công");
          navigate("/products");
        } catch (error) {
          setIsLoading(false);
          toast.error("Lưu variant cho sản phẩm không thành công");
        }
      } else {
        setIsLoading(false);
        toast.error("Vui lòng điền đầy đủ thông tin trước khi lưu variant!");
      }
    });
    setIsLoading(false);
  };

  const renderCurrentSelection = () => {
    switch (current) {
      case 0:
        return (
          <StepFirst
            dataForAddProduct={dataForAddProduct}
            setDataForAddProduct={setDataForAddProduct}
            lstCategory={lstCategory}
          />
        );
      case 1:
        return (
          <StepSecond
            dataForAddProduct={dataForAddProduct}
            setDataForAddProduct={setDataForAddProduct}
          />
        );
      case 2:
        return (
          <StepThird
            dataForAddProduct={dataForAddProduct}
            setDataForAddProduct={setDataForAddProduct}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-product-container">
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
            {current === 1 && (
              <span style={{ marginRight: 10 }}>
                <ButtonComponent onClick={() => prev()}>
                  Previous
                </ButtonComponent>
              </span>
            )}
            {current < steps.length - 1 && (
              <ButtonComponent onClick={() => next()}>Next</ButtonComponent>
            )}
            {current === steps.length - 1 && (
              <ButtonComponent onClick={() => handleAddVariant()}>
                Done
              </ButtonComponent>
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default AddProduct;
