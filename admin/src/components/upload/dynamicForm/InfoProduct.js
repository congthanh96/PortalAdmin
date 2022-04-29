import React, { Fragment, useCallback, useEffect, useState } from "react";
import UploadImage from "../images/UploadImage";
import "./dynamicForm.css";

const InfoProduct = ({
  getDataProduct,
  handleClick,
  downCategory,
  showResult,
  downData,
}) => {
  const [inputFields, setInputFields] = useState([
    {
      name: downData?.name || "",
      brand: downData?.brand || "",
      packingForm: downData?.packingForm || "",
      description: downData?.description || "",
      categoryId:
        downData?.categoryId || "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      productAsset: downData?.productAsset || "",
      content1: downData?.content1 || "",
      content2: downData?.content2 || "",
      content3: downData?.content3 || "",
      link: "",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClick(inputFields);
  };

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
                <label> Danh mục sản phẩm - Category Id</label>
                <select
                  className="form-select"
                  onClick={(value, key) => townsFilter(value, key)}
                  onTouchStart={(value, key) => townsFilter(value, key)}
                  onChange={(value, key) => townsFilter(value, key)}
                >
                  <option value="1">Chọn danh mục sản phẩm.</option>
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

              <UploadImage handleClick={getImageProduct} />
            </Fragment>
          ))}
        </div>
        {showResult && <pre>{JSON.stringify(inputFields, null, 2)}</pre>}
      </form>
    </>
  );
};
export default InfoProduct;
