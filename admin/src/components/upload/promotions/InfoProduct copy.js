import React, { Fragment, useCallback, useEffect, useState } from "react";
import ConfigAPI from "../../../utils/ConfigAPI";
import Selected from "../../selected/Selected";
import DynamicForms from "./DynamicForms";
import "./infoProduct.css";

var today = new Date();
var eToday = new Date();

var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var mm1 = String(today.getMonth() + 2).padStart(2, "0"); //January is 0!

var mm2 = mm1 - 12; //January is 0!
var yyyy = today.getFullYear();
var yyyy1 = today.getFullYear() + 1;

// today = dd + '-' + mm + '-' + yyyy;
today = yyyy + "-" + mm + "-" + dd + "T00:00:00";
eToday =
  mm1 > 12
    ? yyyy1 + "-" + mm2 + "-" + dd + "T00:00:00"
    : yyyy + "-" + mm1 + "-" + dd + "T00:00:00";
console.log(today);
console.log(eToday);

const InfoProduct = ({
  getDataProduct,
  handleClick,
  downProduct,
  showResult,
  downData,
  downListVariant,
  setSaveVariantProduct,
  saveVariantProduct,
  setSaveVariantId,
  saveVariantId,
  setNotify,
}) => {
  const [inputFields, setInputFields] = useState([
    {
      name: "",
      sDate: today ?? "2022-03-23T00:00:00",
      eDate: eToday ?? "2022-04-23T00:00:00",
      listVariants: [],
    },
  ]);
  const [inputDiscount, setInputDiscount] = useState([
    {
      name: "Test",
      sDate: "2021-10-28T18:08:15.069Z",
      eDate: "2021-10-28T18:08:15.069Z",
      listVariants: [
        {
          percent: 0,
          priceDiscount: 0,
          idVariant: "string",
        },
      ],
    },
  ]);

  const [listDiscount, setListDiscout] = useState([
    {
      percent: 0,
      priceDiscount: 0,
      idVariant: "string",
    },
  ]);

  // số lượng variant.
  const [savePath, setSavePath] = useState([]);
  const [saveVariant, setSaveVariant] = useState([]);
  const [countVariant, setCountVariant] = useState(1);

  const getInfoVariant = (infoVariant, pathVariant) => {
    setSaveVariant(infoVariant);
    setSavePath(pathVariant);
  };

  const [selectedCategory, setSelectedCategory] = useState([]);

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
      console.log(name.target.value);

      getProductVariant(name.target.value);
      setSelectedVariant([...selectedVariant, ...name.target.value]);
      if (name.target.value === "1") {
        setselectedTown("");
        // setSelectedCategory("");
      } else {
        setSelectedVariant(name.target.value);
        setSelectedCategory(name.target.value);
        setselectedProvince(name.target.value);

        //  setSelectedCategory();
      }
    },

    [selectedProvince]
  );
  const [listVariant, setListVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState("");

  const getProductVariant = async (productId) => {
    ConfigAPI(`Newee/ManagerVariant/Get/${productId}`, "GET", null)
      .then((res) => {
        // setVariantProduct(res.data.data);
        console.log(res.data.data);

        //  nếu đã có khuyến mãi thì không hiển thị lại để tránh sai

        res.data.data.forEach((element) => {
          console.log(element);
          console.log(element.discount);
          console.log(element.priceDiscount);
        });
        var a = res.data.data.filter(
          (element) => element.discount === 0 && element.priceDiscount === 0
        );
        console.log("a filter", a);
        setListVariant([...listVariant, ...a]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("đã chạy selectedVariantId", saveVariantProduct);
    if (saveVariantProduct.length !== 0) {
      getProductVariant(
        saveVariantProduct[saveVariantProduct.length - 1].value
      );
    } else {
      setListVariant([]);
    }
  }, [saveVariantProduct]);
  useEffect(() => {
    console.log("inputfields =>", inputFields);
  }, [inputFields]);

  const [result, setResult] = useState([]);
  const [fetch, setFetch] = useState({});
  const handleSubmitCreateProduct = async () => {
    console.log("handleSubmitCreateProduct input Fields", inputFields);
    console.log("handleSubmitCreateProduct listVariant", listVariant);
    var array = [];
    setResult(array);

    listVariant.forEach((element) => {
      console.log(element.discount);
      if (element.discount > 0 && element.priceDiscount > 0) {
        var a = {
          percent: parseFloat(element.discount),
          priceDiscount: parseFloat(element.priceDiscount),
          idVariant: element.id,
        };
        array.push(a);
      }
    });
    console.log("array", array);
    setResult(array);
    inputFields[0].listVariants = array;
    handleFetchData();
  };
  var empty = [];
  const handleFetchData = () => {
    console.log("fetch handleFetchData", inputFields);
    console.log("fetch handleFetchData", inputFields[0].listVariants.length);
    // return;
    if (inputFields[0].listVariants.length === 0) {
      alert("Nhập giá trị khuyến mãi % và chiết khấu VND khác 0.");

      return;
    }
    ConfigAPI(`Newee/Manager/DiscountPrice/Create`, "POST", inputFields[0])
      .then((res) => {
        // setVariantProduct(res.data.data);
        console.log("response =>", res);
        inputFields[0].listVariants = empty;
        setListVariant(empty);
        setNotify({
          isOpen: true,
          message: "Tạo khuyến mãi thành công!",
          type: "success",
        });
        setSaveVariantProduct(empty);
      })
      .catch((error) => {
        console.log(error.response);
        inputFields[0].listVariants = empty;
        alert(error.response?.data);
        setNotify({
          isOpen: true,
          message: "Tạo khuyến mãi không thành công!",
          type: "error",
        });
      });
  };
  useEffect(() => {
    // handleSubmitCreateProduct();
  }, [listVariant]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-between form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-3">
                <label htmlFor="Tên sản phẩm- Name">Tên khuyến mãi- Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={inputField.name}
                  placeholder="Tên khuyến mãi"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="sDate">Ngày bắt đầu - sDate</label>
                <input
                  type="text"
                  className="form-control"
                  id="sDate"
                  name="sDate"
                  value={inputField.sDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="eDate">Ngày kết thúc - eDate</label>
                <input
                  type="text"
                  className="form-control"
                  id="eDate"
                  name="eDate"
                  value={inputField.eDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="sDate">Ngày bắt đầu - sDate</label>
                <input
                  type="text"
                  className="form-control"
                  id="sDate"
                  name="sDate"
                  value={inputField.sDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="eDate">Ngày kết thúc - eDate</label>
                <input
                  type="text"
                  className="form-control"
                  id="eDate"
                  name="eDate"
                  value={inputField.eDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-12">
                <Selected
                  downProduct={downProduct}
                  setSaveVariantProduct={setSaveVariantProduct}
                  setSaveVariantId={setSelectedVariantId}
                />
              </div>
              <div>
                <DynamicForms
                  setCountVariant={setCountVariant || null}
                  getDataVariant={getInfoVariant}
                  downListVariant={listVariant}
                  setListVariant={setListVariant}
                />
              </div>

              <div className="newProduct-variants">
                {/* <label>#3 - Hoàn thành (3/3)</label> */}
                <button
                  type="button"
                  className="addProductButton createProductButton"
                  // onClick={() => createProduct()}
                  onClick={() => handleSubmitCreateProduct()}
                >
                  Tạo khuyến mãi
                </button>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </Fragment>
          ))}
        </div>
        {/* {showResult === false && (
          <pre>{JSON.stringify(inputFields, null, 2)}</pre>
        )} */}
      </form>
    </>
  );
};
export default InfoProduct;
