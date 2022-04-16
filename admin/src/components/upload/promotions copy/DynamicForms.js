import React, { useState, Fragment, useEffect } from "react";
import UploadImage from "../images/UploadImage";
import Multiple from "../images/MultipleImage";
import axios from "axios";
import Images from "../images/Images";
import "./dynamicForms.css";
const DynamicForms = ({
  common,
  setCountVariant,
  getDataVariant,
  dataVariantRow,
  downListVariant,
  setListVariant,
}) => {
  const [inputFields, setInputFields] = useState(downListVariant);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      priceDiscount: 0,
      percent: 0,
      idVariant: "",
    });
    setInputFields(values);
    console.log("length", values.length);
    setCountVariant(values.length + 1);
  };
  const handleLoadingFields = (index) => {
    setListVariant(inputFields);
  };

  const handleRemoveFields = (index) => {
    const values = [...downListVariant];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...downListVariant];
    if (values !== undefined) {
      if (
        event.target.name === "price" ||
        event.target.name === "priceSeller" ||
        event.target.name === "moneyReceived" ||
        event.target.name === "percent" ||
        event.target.name === "count" ||
        event.target.name === "priceDiscount" ||
        event.target.name === "discount"
      ) {
        values[index][event.target.name] = parseFloat(event.target.value);
      } else {
        values[index][event.target.name] = event.target.value;
      }
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
  const [isLoading, setIsLoading] = useState(false);
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
    getDataVariant(inputFields, savePath);
  }, [isLoading]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-left left form-row">
          {Object(downListVariant)?.map((inputField, index) => (
            <Fragment
              key={`${inputField}~${index}`}
              // className="container-options"
            >
              <div className="form-index">{index + 1}</div>

              <div className="form-group col-sm-5">
                <label htmlFor="lastName">Giá trị thuộc tính</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyValue"
                  name="PropertyValue"
                  value={inputField.propertyValue}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled
                />
              </div>

              <div className="form-group col-sm-5">
                <label htmlFor="Giá niêm yết">Giá niêm yết</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={inputField.price}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled
                />
              </div>

              <div className="form-group col-sm-5">
                <label htmlFor="Giá khuyến mãi %">Khuyến mãi %</label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  name="discount"
                  value={inputField.discount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-5">
                <label htmlFor="Seller nhận được">Khuyến mãi VND</label>
                <input
                  type="number"
                  className="form-control"
                  id="priceDiscount"
                  name="priceDiscount"
                  value={inputField.priceDiscount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              {/* <Images /> */}

              <div className="form-group col-sm-9 button">
                <button
                  className="btn btn-link plus"
                  type="button"
                  onClick={() => handleLoadingFields()}
                >
                  +
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleLoadingFields(index)}
                >
                  loading
                </button>
              </div>
              <div class="line-break"></div>
              <br />
            </Fragment>
          ))}
        </div>

        {/* <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
      </form>
    </>
  );
};
export default DynamicForms;
