import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Select, Form, Input, Collapse } from "antd";
import TopPage from "../../../Components/toppage/topPage";
import "./editProduct.css";
import { toast } from "react-toastify";
import { productAPI, productsAPI, imageAPI } from "../../../APIs";
import ButtonComponent from "../../../Components/button/ButtonComponent";

const { Panel } = Collapse;
const { Option } = Select;
const EditProduct = () => {
  const { productID } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState("");
  // const [variantProduct, setVariantProduct] = useState([]);
  const [lstCategory, setLstCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getDetailProduct();
      // await getVariantProduct();
      await getCategory();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getDetailProduct = async () => {
    try {
      const res = await productAPI.getDetailProduct(productID);
      // console.log(res);
      setDataProduct(res);
    } catch (error) {
      toast.error("Không thể lấy chi tiết sản phẩm");
    }
  };

  // Lấy danh sách variant của sản phẩm
  // const getVariantProduct = async () => {
  //   try {
  //     const res = await productAPI.getVariantProduct(productID);
  //     setVariantProduct(res);
  //   } catch (error) {
  //     toast.error("Không thể lấy danh sách variant của sản phẩm");
  //   }
  // };

  // Lấy danh sách category
  const getCategory = async () => {
    try {
      const res = await productsAPI.getListCategory();
      // console.log(res);
      setLstCategory(res);
    } catch (error) {
      toast.error("Không thể lấy danh sách category của sản phẩm");
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
      linkTo: "/product/" + productID,
      nameLink: "Chi tiết sản phẩm",
    },
    {
      linkTo: "",
      nameLink: "Chỉnh sửa sản phẩm",
    },
  ];

  const handleChangeDataInput = (event) => {
    // console.log(dataForAddProduct)
    setDataProduct({
      ...dataProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateImgProduct = (event) => {
    const [file] = event.target.files;
    setDataProduct({
      ...dataProduct,
      link: file,
      srcImage: URL.createObjectURL(file),
    });
    // console.log(file);
    // console.log(dataForAddProduct.link);
    // setSrcImageProduct(URL.createObjectURL(file));
  };

  const handleUpdateProduct = async () => {
    setIsLoading(true)
    let isValidate = true;
    if (dataProduct.name.trim() === "" || dataProduct.name.trim() === null) {
      isValidate = false;
    }
    if (dataProduct.brand.trim() === "" || dataProduct.brand.trim() === null) {
      isValidate = false;
    }
    if (
      dataProduct.packingForm.trim() === "" ||
      dataProduct.packingForm.trim() === null
    ) {
      isValidate = false;
    }
    if (
      dataProduct.productAsset.trim() === "" ||
      dataProduct.productAsset.trim() === null
    ) {
      isValidate = false;
    }
    if (isValidate === false) {
      setIsLoading(false)
      toast.error("Vui lòng nhập đầy đủ thông tin khi chỉnh sửa");
    } else {
      // console.log(dataProduct);
      try {
        let tempImg = dataProduct.link;

        // console.log(dataProduct.srcImage);
        if (dataProduct.srcImage !== undefined) {
          // console.log("vô đây");
          let data1 = new FormData();
          data1.append("File", dataProduct.link);
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
          tempImg = await imageAPI.uploadImage(data1);
        }

        // setDataProduct({...dataProduct,link:res1})
        let data = JSON.stringify({
          id: dataProduct.id,
          name: dataProduct.name,
          brand: dataProduct.brand,
          link: tempImg,
          packingForm: dataProduct.packingForm,
          description: dataProduct.description,
          productAsset: dataProduct.productAsset,
          sku: dataProduct.sku,
          categoryId:
            dataProduct.categoryID ||
            lstCategory.filter(
              (value) => value.name === dataProduct.categoryName
            )[0].id,
          content1: dataProduct.content1,
          content2: dataProduct.content2,
          content3: dataProduct.content3,
        });
        // console.log(data);
        await productAPI.updateProduct(data);
        toast.success("Chỉnh sửa sản phẩm thành công!");
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toast.error("Quá trình chỉnh sửa sản phẩm thất bại. Vui lòng thử lại");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="edit-product-container">
        <Spin spinning={isLoading}>
          <div style={{ width: "100%" }}>
            <TopPage dataProps={dataTop} />
          </div>
          <div className="container-step1">
            <Form layout="inline" form={form}>
              <div className="container-item">
                <span className="css-label">Tên sản phẩm *</span>
                <Input
                  placeholder="nhập tên"
                  className="css-input-item"
                  value={dataProduct.name}
                  name="name"
                  onChange={handleChangeDataInput}
                />
              </div>
              <div className="container-item">
                <span className="css-label">Thương hiệu *</span>
                <Input
                  placeholder="nhập thương hiệu"
                  className="css-input-item"
                  value={dataProduct.brand}
                  name="brand"
                  onChange={handleChangeDataInput}
                />
              </div>
              <div className="container-item">
                <span className="css-label">Đơn vị tính *</span>
                <Input
                  placeholder="nhập địa chỉ chi tiết"
                  className="css-input-item"
                  value={dataProduct.packingForm}
                  name="packingForm"
                  onChange={handleChangeDataInput}
                />
              </div>
              <div className="container-item">
                <span className="css-label">Danh mục sản phẩm *</span>
                {/* <Input
            placeholder="nhập danh mục sản phẩm"
            className="css-input-item"
            value={dataForAddProduct.categoryId}
            name="categoryId"
            onChange={handleChangeDataInput}
          /> */}
                <Select
                  showSearch
                  className="css-input-select-edit"
                  // defaultOpen={true}
                  value={dataProduct.categoryName}
                  //defaultValue={dataProduct.categoryName}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={(event, value) => {
                    // console.log(value.key);
                    // console.log({
                    //   ...dataProduct,
                    //   categoryName: value.value,
                    //   categoryID: value.key,
                    // });
                    setDataProduct({
                      ...dataProduct,
                      categoryName: value.value,
                      categoryID: value.key,
                    });
                  }}
                >
                  {lstCategory.map((value, index) => {
                    return (
                      <Option key={value.id} value={value.name}>
                        {value.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="container-item">
                <span className="css-label">Đường dẫn tài liệu *</span>
                <Input
                  placeholder="nhập đường dẫn tài liệu"
                  className="css-input-item"
                  value={dataProduct.productAsset}
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
                  value={dataProduct.description}
                  // onChange={(event) => handleInputChange(index, event)}
                  // style={{ minHeight: 128, width: 800 }}

                  // defaultValue={""}
                />
              </div>
              <div className="container-item" style={{ width: 800 }}>
                <span className="css-label">Chọn hình ảnh *</span>

                <label htmlFor="imgProduct">
                  <img
                    className="css-image"
                    src={
                      dataProduct.srcImage ||
                      dataProduct.link.toString() ||
                      "data:image/png;base64,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"
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    id="imgProduct"
                    style={{ display: "none" }}
                    onChange={handleUpdateImgProduct}
                  />
                </label>
              </div>
            </Form>
          </div>
          <div className="container-step2">
            <h3>Sửa content cho sản phẩm:</h3>
            <Collapse accordion>
              <Panel header="Nội dung đầu tiên" key="1">
                <Input.TextArea
                  type="text"
                  className="css-text-area"
                  id="description"
                  name="content1"
                  placeholder="nhập mô tả"
                  onChange={handleChangeDataInput}
                  value={dataProduct.content1}
                />
              </Panel>
              <Panel header="Nội dung thứ hai" key="2">
                <Input.TextArea
                  type="text"
                  className="css-text-area"
                  id="description"
                  name="content2"
                  placeholder="nhập mô tả"
                  onChange={handleChangeDataInput}
                  value={dataProduct.content2}
                />
              </Panel>
              <Panel header="Nội dung thứ ba" key="3">
                <Input.TextArea
                  type="text"
                  className="css-text-area"
                  id="description"
                  name="content3"
                  placeholder="nhập mô tả"
                  onChange={handleChangeDataInput}
                  value={dataProduct.content3}
                />
              </Panel>
            </Collapse>
          </div>
          <div className="btn-save">
            <ButtonComponent onClick={() => handleUpdateProduct()}>
              Lưu
            </ButtonComponent>
          </div>
        </Spin>
      </div>
    </React.Fragment>
  );
};

export default EditProduct;
