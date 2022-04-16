import React, { useState, useCallback, useEffect, Fragment } from "react";
import "./dynamicForm.css";
import UploadImage from "../images/UploadImageEdit";

const InfoProductEdit = ({
  getDataProduct,
  handleClick,
  downCategory,
  showResult,
  downData,
  setInfoProduct,
   productId
}) => {
  const [inputFields, setInputFields] = useState([
    {
      name: downData?.name || "",
      brand: downData?.brand || "",
      packingForm: downData?.packingForm || "",
      description: downData?.description || "",
      categoryId: downData?.categoryName || "Chọn danh mục sản phẩm",
      productAsset: downData?.productAsset || "",
      content1: downData?.content1 || "",
      content2: downData?.content2 || "",
      content3: downData?.content3 || "",
      link: downData?.link || "",
      id: productId,
       sku: "sku"
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);

    setTimeout(setInfoProduct(values), 300);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    handleClick(inputFields);
  };

  const [saveInfoProduct, setSaveInfoProduct] = useState({});
  const getImageProduct = (info) => {
    getDataProduct(inputFields, info);
  };



  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedTown, setselectedTown] = useState("");
  const initialTown = [{ label: "Chọn Quận/Huyện", value: "1" }];
  const [getTowns, setGetTowns] = useState(initialTown);

  const townsFilter = useCallback(
    (name, key) => {
      if (name.target.value === "1") {
        setselectedTown("");
        // setSelectedCategory("");
      } else {
        setSelectedCategory(name.target.value);

        setselectedProvince(name.target.value);
        //  setSelectedCategory();
      }
    },

    [selectedProvince]
  );
  useEffect(() => {
    inputFields[0].categoryId = selectedCategory;
    setTimeout(setInfoProduct(inputFields), 300);
  }, [selectedCategory]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-between form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="Tên sản phẩm- Name">Tên sản phẩm- Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={inputField.name}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Thương hiệu - Brand">Thương hiệu - Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  value={inputField.brand}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Packing Form">Đơn vị tính - Packing Form</label>
                <input
                  type="text"
                  className="form-control"
                  id="packingForm"
                  name="packingForm"
                  value={inputField.packingForm}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-6">
                <label> Danh mục sản phẩm - { inputField.categoryId || downData?.categoryName}</label>
                <select
                  className="form-select"
                  onClick={(value, key) => townsFilter(value, key)}
                  onTouchStart={(value, key) => townsFilter(value, key)}
                  onChange={(value, key) => townsFilter(value, key)}
                >
                  <option value="1">{inputField.categoryId}</option>
                  {downCategory.map((value, key) => {
                    return (
                      <option value={value.id} key={key}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="productAsset">
                  Link tài liệu - ProductAsset
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productAsset"
                  name="productAsset"
                  value={inputField.productAsset}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-12 desc">
                <label htmlFor="Description">
                  Mô tả sản phẩm - Description
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="Description"
                  name="Description"
                  value={inputField.Description}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={inputField.description}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ height: "30vh", maxWidth: 920 }}
                  defaultValue={""}
                />
              </div>

              <div className="form-group col-sm-3 content">
                <label htmlFor="content1">Content 1</label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="content1"
                  name="content1"
                  value={inputField.content1}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}

                <textarea
                  type="text"
                  className="form-control"
                  id="content1"
                  name="content1"
                  value={inputField.content1}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ height: "30vh", maxWidth: 920 }}
                  defaultValue={""}
                ></textarea>
              </div>
              <div className="form-group col-sm-3 content">
                <label htmlFor="content2">Content 2</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="content2"
                  name="content2"
                  value={inputField.content2}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ height: "30vh", maxWidth: 920 }}
                  defaultValue={""}
                ></textarea>
              </div>
              <div className="form-group col-sm-3 content">
                <label htmlFor="content3">Content 3</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="content3"
                  name="content3"
                  value={inputField.content3}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ height: "30vh", maxWidth: 920 }}
                  defaultValue={""}
                ></textarea>
              </div>

              <UploadImage handleClick={getImageProduct} srcLink={inputField.link || downData.link} />
            </Fragment>
          ))}
        </div>
        {showResult && <pre>{JSON.stringify(inputFields, null, 2)}</pre>}
      </form>
    </>
  );
};
export default InfoProductEdit;
