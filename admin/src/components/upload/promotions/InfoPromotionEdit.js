import { Box } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConfigAPI from "../../../utils/ConfigAPI";
import DynamicForms from "./DynamicFormPromotionEdit";
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

const InfoPromotionEdit = ({
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
  promotionId,
}) => {
  console.log("dowProduct", downProduct);
  console.log("dowProduct", downData);

  const history = useHistory();

  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const [inputFields, setInputFields] = useState([
    {
      name: "Khuyến mãi 1",
      sDate: "2021-09-29T04:40:41.978Z",
      eDate: "2021-11-29T04:40:41.978Z",
      listVariants: [],
    },
  ]);

  const [state, setState] = useState([]);
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
    ConfigAPI(
      `Newee/Manager/DiscountPrice/GetDetails/${productId}`,
      "GET",
      null
    )
      .then((res) => {
        // setVariantProduct(res.data.data);
        console.log("res =>", res);
        console.log("res =>", res.data[0].sToday);

        //  nếu đã có khuyến mãi thì không hiển thị lại để tránh sai

        // var a = res.data.data.filter(
        //   (element) => element.discount === 0 && element.priceDiscount === 0
        // );
        // console.log("a filter", a);
        setListVariant([...res.data]);

        setValue1(res.data[0].sDate);
        setValue2(res.data[0].eDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductVariant(promotionId);
  }, [promotionId]);
  useEffect(() => {
    console.log("inputfields =>", inputFields);
  }, [inputFields]);

  const [result, setResult] = useState([]);
  const [fetch, setFetch] = useState({});
  const handleSubmitEditPromotions = async () => {
    console.log("handleSubmitCreateProduct input Fields", inputFields);
    console.log("handleSubmitCreateProduct listVariant", listVariant);
    var array = [];
    setResult(array);

    listVariant.forEach((element) => {
      var a = {
        id: element.id,
        percent: parseFloat(element.percent),
        priceDiscount: parseFloat(element.priceDiscount),
        idDis: element.idDis,
        idVariant: element.idVariant,
        moneyReceived: parseFloat(element.moneyRecived),
      };
      array.push(a);
    });
    console.log("array", array);
    // setResult(array);

    handleFetchData(array);
  };
  var empty = [];

  const handleFetchData = (array) => {
    // console.log("fetch handleFetchData", inputFields);
    // console.log("fetch handleFetchData result", result);
    console.log("fetch handleFetchData result === ", array);

    array.forEach((element) => {
      // return;
      ConfigAPI(`Newee/Manager/DiscountPrice/EditDiscount`, "POST", element)
        .then((res) => {
          // setVariantProduct(res.data.data);
          console.log("response =>", res);
        })
        .catch((error) => {
          console.log(error.response);

          alert(error.response?.data);
          setNotify({
            isOpen: true,
            message: "Tạo khuyến mãi không thành công!",
            type: "error",
          });
        });

      setListVariant(empty);
      setNotify({
        isOpen: true,
        message: "Sửa khuyến mãi thành công!",
        type: "success",
      });

      setSaveVariantProduct(empty);
    });
  };

  const handleGoback = () => {
    history.push({
      pathname: "/promotions",
      state: {
        id: promotionId,
      },
    });
  };
  useEffect(() => {
    // handleSubmitCreateProduct();
  }, [listVariant]);

  const handleChange = () => {
    setNotify({
      isOpen: true,
      message: "Newee - Thời gian khuyến mãi không thay đổi được!",
      type: "error",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-between form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-3">
                <label htmlFor="Tên sản phẩm- Name">
                  Tên khuyến mãi - Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={inputField.name}
                  disabled
                  // onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="sToday"></label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      name="sToday"
                      label="Format - tháng/ngày/năm"
                      inputFormat="MM/dd/yyyy"
                      value={value1 ?? today}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="eToday"></label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      name="eToday"
                      label="Ngày kết thúc - tháng/ngày/năm"
                      inputFormat="MM/dd/yyyy"
                      value={value2 ?? today}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
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
                <label>#3 - Hoàn thành (3/3)</label>
                <Box>
                  <button
                    type="button"
                    className="addProductButton go-back"
                    onClick={handleGoback}
                  >
                    Quay lại Khuyến mãi
                  </button>
                  <button
                    type="button"
                    className="addProductButton createProductButton"
                    onClick={() => handleSubmitEditPromotions()}
                  >
                    Sửa khuyến mãi
                  </button>
                </Box>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            </Fragment>
          ))}
        </div>
      </form>
    </>
  );
};
export default InfoPromotionEdit;
