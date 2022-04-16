import React, { useState, Fragment, useEffect } from "react";
import UploadImage from "../images/UploadImage";
import Multiple from "../images/MultipleImageEditVariant";
import axios from "axios";
import Images from "../images/Images";
import "./dynamicForms.css";
import Selected from "../../selected/Selected";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const DynamicFormEditVariant = ({
  common,
  setCountVariant,
  getDataVariant,
  dataVariantRow,
}) => {
  console.log(" dataVariantRow =>", dataVariantRow);
  const [inputFields, setInputFields] = useState([
    {
      PropertyName: dataVariantRow?.propertyName || "",
      PropertyValue: dataVariantRow?.propertyValue || "",
      id: dataVariantRow?.id || "",
      price: dataVariantRow?.price || 0,
      priceSeller: dataVariantRow?.priceSeller || 0,
      moneyReceived: dataVariantRow?.moneyReceived || 0,
      percent: dataVariantRow?.percent || 0,

      count: dataVariantRow?.count || 0,
      sku: dataVariantRow?.sku || "",
      imageLink: dataVariantRow?.imageLink || "",
      tag1: dataVariantRow?.tag1 || false,
      tag7: dataVariantRow?.tag7 || false,
      weight: dataVariantRow?.weight || 0,
    },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      PropertyName: inputFields[0].PropertyName || "",
      PropertyValue: "",

      productId: "",
      price: 0,
      priceSeller: 0,
      moneyReceived: 0,
      percent: 0,

      count: 0,
      sku: "",
      imageLink: "",
    });
    setInputFields(values);
    console.log("length", values.length);
    setCountVariant(values.length + 1);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    console.log(event.target.name);
    if (
      event.target.name === "price" ||
      event.target.name === "priceSeller" ||
      event.target.name === "moneyReceived" ||
      event.target.name === "count" ||
      event.target.name === "weight"
    ) {
      values[index][event.target.name] = event.target.value * 1;
    } else if (event.target.name === "percent") {
      values[index][event.target.name] = event.target.value * 1;
      inputFields[index].moneyReceived =
        (event.target.value * 1 * inputFields[index].price) / 100;
    } else if (event.target.name === "tag1" || event.target.name === "tag7") {
      values[index][event.target.name] = event.target.checked;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle Submit inputFields", inputFields);
    console.log("handle Submit get Image Product", savePath);
    try {
      await uploadImageProductVariant();
    } catch (err) {
      console.log(err);
    }
  };

  const [infoImageProduct, setInfoImageProduct] = useState();
  const [resImageProductVariant, setResImageProductVariant] = useState([]);

  const [savePath, setSavePath] = useState([]);
  const [saveResponseImg, setSaveResponseImg] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const getImageProduct = (index, info) => {
    console.log("path", index);
    console.log("path", index, info);
    setInfoImageProduct(info);

    if (index === savePath[index]?.index) {
      alert("may da co");
      savePath[index].path = info;
      return;
    } else {
      setSavePath([...savePath, { index: index, path: info }]);
    }
    getDataVariant(savePath);
    console.log("save path", savePath);
  };

  //Result = list link anh variant
  const uploadImageProductVariant = async () => {
    if (savePath.length === 0) {
      alert("Vui lòng chọn ảnh Phân loại!");
      return;
    }

    var a = [];
    savePath.forEach((element) => {
      var file = new FormData();
      file.append("File", element.path, element.path.name);
      file.append("Type", "Variant");

      console.log(file);
      axios({
        url: "https://api.newee.asia:8001/upload-image",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: file,
      }).then(function (response) {
        // alert(response.data);
        console.log("response ", response.data);
        a.push(response.data);

        inputFields[element.index].imageLink = response.data;
      });
      setSaveResponseImg(a);
      setIsRender(!isRender);
    });
  };
  useEffect(() => {
    console.log("save Path array", savePath);
  }, [savePath.length]);

  useEffect(() => {
    console.log("resImageProductVariant.length", saveResponseImg);
    console.log("data res", inputFields);
  }, [Object.entries(inputFields), isRender]);

  useEffect(() => {
    getDataVariant(inputFields, savePath);
  }, [savePath, Object.entries(inputFields)]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-left left form-row">
          {inputFields.map((inputField, index) => (
            <Fragment
              key={`${inputField}~${index}`}
              className="container-options"
            >
              <div className="form-index">{index + 1}</div>
              <div className="form-group col-sm-3 mt">
                <label htmlFor="lastName">Nhóm phân loại</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyName"
                  name="PropertyName"
                  value={inputField.PropertyName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="lastName">Giá trị thuộc tính</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyValue"
                  name="PropertyValue"
                  value={inputField.PropertyValue}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="">SKU</label>
                <input
                  type="text"
                  className="form-control"
                  id="sku"
                  name="sku"
                  value={inputField.sku}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="Số lượng">Số lượng</label>
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  name="count"
                  value={inputField.count}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="Giá niêm yết">Giá niêm yết</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={inputField.price}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="Giá chiết khấu %">Chiết khấu %</label>
                <input
                  type="number"
                  className="form-control"
                  id="percent"
                  name="percent"
                  value={inputField.percent}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3  ml">
                <label htmlFor="Seller nhận được">Seller nhận được</label>
                <input
                  type="number"
                  className="form-control"
                  id="moneyReceived"
                  name="moneyReceived"
                  value={inputField.moneyReceived}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="Seller nhận được">Cân nặng</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={inputField.weight}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="Seller nhận được">Dễ vở</label>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputField.tag1}
                      name="tag1"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  }
                  label="Tag1 dễ vỡ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputField.tag7}
                      name="tag7"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  }
                  label="Tag7 Nông sản/ thực phẩm khô"
                />
              </div>

              {/* <Images /> */}

              <div class="line-break"></div>
              <br />
            </Fragment>
          ))}
        </div>
        <h4 className="mb">Ảnh phân loại</h4>
        <div className="container-list-img-variant">
          {inputFields &&
            inputFields.map((value, key) => (
              <Multiple
                handleClick={getImageProduct}
                key={key}
                index={key}
                dataVariantRowLink={dataVariantRow?.imageLink}
              />
            ))}
        </div>

        {/* <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
      </form>
    </>
  );
};
export default DynamicFormEditVariant;
