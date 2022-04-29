import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import XLSX from "xlsx";
import Notification from "../../components/notifications/Notifications";
import DynamicCommon from "../../components/upload/dynamicForm/DynamicCommon";
import DynamicForms from "../../components/upload/dynamicForm/DynamicForms";
import InfoProduct from "../../components/upload/dynamicForm/InfoProduct";
import {
    createProducts,
    createVariant, getCategory, uploadImage
} from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./newProductSheet.css";




export default function NewProductSheet() {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.product.isLoading);
  const listCategory = useSelector((state) => state.product.category);

  const isCreate = useSelector((state) => state.product.createProduct);

  console.log("isloading", isLoading);
  console.log("isCreate", isCreate);
  console.log("isCreate", isCreate.id);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };
  useEffect(() => {
    console.log(listCategory.length);
    if (listCategory?.length === 0) {
      dispatch(getCategory());
    }
    console.log("list Category =>", listCategory);
  }, [listCategory]);
  const RowVariant = () => {
    return (
      <div className="productList">
        <DataGrid
          // rows={variantProduct !== undefined ? variantProduct : []}
          rows={[
            {
              id: "0a4fd2fc-42d6-4c6f-89b0-da44ede5ef70",
              productId: "02355b4c-0346-466d-8f25-64655524bbd7",
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: "1458f623-e81a-4c68-a2a2-6affecd8a788",
              productId: "02355b4c-0346-466d-8f25-64655524bbd7",
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: "8f07d90e-cf85-4f70-9db0-4eb11c54e233",
              productId: "02355b4c-0346-466d-8f25-64655524bbd7",
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: "ba3e2e7b-a6a6-4f23-9e3d-5e5c63821e52",
              productId: "02355b4c-0346-466d-8f25-64655524bbd7",
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
          ]}
          disableSelectionOnClick
          columns={columns}
          pageSize={100}
          checkboxSelection
        />
      </div>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Phân loại",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imageLink}
              alt="Newee"
            />
            {params.row.propertyName}
          </div>
        );
      },
    },
    { field: "propertyValue", headerName: "Thuộc tính", width: 150 },
    { field: "sku", headerName: "Thuộc tính", width: 150 },

    {
      field: "price",
      headerName: "Giá niêm yết",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>;
      },
    },
    {
      field: "moneyReceived",
      headerName: "Giá Seller",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.moneyReceived)}</>;
      },
    },
    {
      field: "percent",
      headerName: "Chiết khấu",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{params.row.percent}%</>;
      },
    },
    { field: "count", headerName: "Số lượng", width: 140, align: "center" },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleDelete = (id) => {
    alert("da chay");
    // setData(data.filter((item) => item.id !== id));
  };

  // 1. upload image Product => link image ?
  // 2. upload info Product => id Product ?
  // 3. upload variant => id variant ?

  // 1- upload ảnh sản phẩm. (chạy hàm get)
  // 1.1 get thông tin sản phẩm
  const [showResult, setShowResult] = useState(false);

  const [infoImageProduct, setInfoImageProduct] = useState();
  const [resImageProduct, setResImageProduct] = useState("");
  const [listResponseImageVariant, setListResponseImageVariant] = useState();

  // THÔNG TIN ĐIỀN Ở FORM 1/2
  const [infoProduct, setInfoProduct] = useState();
  // https://api.newee.asia:6001/Newee/ManagerProduct/Create
  const [variantProduct, setVariantProduct] = useState({
    ProductId: "",
    Price: "",
    PriceSeller: "",
    PropertyName: "",
    PropertyValue: "",
    sku: "",
    Count: "",
    imageLink: "",
    percent: "",
    moneyReceived: "",
  });
  // "https://api.newee.asia:6001/Newee/ManagerVariant/Create",

  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [variantProducts, setVariantProducts] = useState({});
  const [isVariant, setIsVariant] = useState(false);
  const [commonVariant, setCommonVariant] = useState({});

  // số lượng variant.
  const [countVariant, setCountVariant] = useState(1);

  const getImageProduct = (infoProduct, infoImage) => {
    console.log("info Product", infoProduct);
    console.log("info Image", infoImage);

    setInfoImageProduct(infoImage);
  };
  //Result = multiple link anh san pham

  // 0. LẤY THÔNG TIN NHẬP Ở FORM 1/2
  const getInfoProduct = (infoProduct, srcProduct) => {
    console.log("getInfoProduct NewProduct", infoProduct);
    console.log("getInfoProduct NewProduct", srcProduct);
    setInfoProduct(infoProduct[0]);

    setInfoImageProduct(srcProduct);
  };
  // 1. UPLOAD ẢNH => RES LINK
  //Result = link anh san pham
  const uploadImageProduct = () => {
    // alert("uploadImageProduct");
    var file = new FormData();

    file.append("File", infoImageProduct, infoImageProduct.name);
    file.append("Type", "Product");

    console.log(file);

    axios({
      url: "https://api.newee.asia:8001/upload-image",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: file,
    }).then(function (response) {
      setResImageProduct(response.data);
      infoProduct[0].Link = response.data;
    });
  };
  // 2. UPLOAD INFO PRODUCT => RES ID

  // =>> Result = ID sản phẩm

  const createInfoProduct = () => {
    console.log("info Product đã upload ảnh =>", infoProduct);
    console.log(
      "info Product đã upload ảnh =>",
      JSON.stringify(infoProduct[0])
    );
  };

  // 3. LẤY THÔNG TIN Ở FORM 2/2
  const [savePath, setSavePath] = useState([]);
  const [saveVariant, setSaveVariant] = useState([]);
  const getInfoVariant = (infoVariant, pathVariant) => {
    console.log("infoVariant, pathVariant", infoVariant);
    console.log("infoVariant, pathVariant", pathVariant);
    // setInfoProduct(infoProduct);
    setSaveVariant(infoVariant);
    setSavePath(pathVariant);
  };
  const [saveLinkImageVariant, setSaveLinkImageVariant] = useState([]);
  // 4. UPLOAD ẢNH VARIANT => RES saveVariant
  const uploadImageProductVariant = async () => {
    if (saveVariant.length === 0) {
      alert("Vui lòng chọn ảnh Phân loại!");
      return;
    }

    var a = [];
    savePath.forEach((element, index) => {
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
        console.log("response ", response.data);
        a.push(response.data);
        saveVariant[index].imageLink = response.data;
      });

      setSaveLinkImageVariant(a);
    });
  };
  // 5. FINAL
  const final = async () => {
    console.log("final 1=>", saveVariant);
    console.log("final 2=>", saveLinkImageVariant);

    // saveVariant.forEach((element, index) => {
    //   console.log("final", element);
    //   dispatch(createVariant(element));
    // });

    dispatch(createVariant(saveVariant));
  };

  // SUBMIT TẠO SẢN PHẨM
  const createProduct = async () => {
    try {
      await dispatch(uploadImage(infoImageProduct, infoProduct));
      await dispatch(createProducts(saveVariant));
      // await uploadImageProductVariant();
      // await final();
    } catch (err) {
      alert("that bai");
      // setLoading(false);
    }
  };

  const getCommonVariant = (data) => {
    console.log("da ta =>", data);
    setIsVariant(true);
    setCommonVariant(data);
  };
  const getListDataVariant = (data) => {
    console.log("getListData Variant =>?", data);
    setVariantProducts(data);
  };
  const createListDataVariant = (data) => {
    alert("da chay ");
    console.log("resuilt", variantProducts);
  };

  const [step1, setStep1] = useState({});
  const [step2, setStep2] = useState({});
  const [idProduct, setIdProduct] = useState("");
  const handleSubmitCreateProduct = async () => {
    console.log("1/4 ảnh sản phẩm =>", infoImageProduct);
    console.log("2/4 thông tin form 1/2 => tạo product", infoProduct);
    console.log("3/4 ảnh Variant =>", savePath);
    console.log(
      "4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4",
      saveVariant
    );
    try {
      setLoading(true);
      await uploadImageStep1();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const API = `https://api.newee.asia:6001`;

  const [data, setData] = useState([
    {
      Name: "Sản phẩm 1",
      Brand: "Test",
      PackingForm: "Chai",
      Description: "Mô tả sản phẩm",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      productAsset: "",
      content1: "",
      content2: "",
      content3: "",
      Link: "https://api.newee.asia:8001/Photos/Product/637709663191262501.jpg", // ẢNH SẢN PHẨM - SỬA SAU
      Variant: [
        {
          PropertyName: "phân loại sp 1",
          PropertyValue: "Giá trị 1",
          productId: "", // TẠO SẢN PHẨM
          price: 200000,
          priceSeller: 190000,
          moneyReceived: 10000,
          percent: 2,
          count: 10,
          sku: "SKU1",
          imageLink:
            "https://api.newee.asia:8001/Photos/Product/637709663191262501.jpg", //ẢNH VARIANT - SỬA SAU
        },
        {
          PropertyName: "phân loại sp 1",
          PropertyValue: "Giá trị 2",
          productId: "",
          price: 300000,
          priceSeller: 190000,
          moneyReceived: 10000,
          percent: 2,
          count: 10,
          sku: "SKU2",
          imageLink:
            "https://api.newee.asia:8001/Photos/Product/637709486027400005.jpg",
        },
      ],
    },
    {
      Name: "Sản phẩm 2",
      Brand: "Test",
      PackingForm: "Chai",
      Description: "Mô tả sản phẩm",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      productAsset: "",
      content1: "",
      content2: "",
      content3: "",
      Link: "https://api.newee.asia:8001/Photos/Product/637709477532871883.jpg",
      Variant: [
        {
          PropertyName: "phân loại sp 2",
          PropertyValue: "Giá trị 10",
          productId: "",
          price: 200000,
          priceSeller: 190000,
          moneyReceived: 10000,
          percent: 2,
          count: 10,
          sku: "SKU1",
          imageLink:
            "https://api.newee.asia:8001/Photos/Product/637709428206392722.jpg",
        },
        {
          PropertyName: "phân loại sp 2",
          PropertyValue: "Giá trị 20",
          productId: "",
          price: 300000,
          priceSeller: 190000,
          moneyReceived: 10000,
          percent: 2,
          count: 10,
          sku: "SKU2",
          imageLink:
            "https://api.newee.asia:8001/Photos/Product/637709425413416893.jpg",
        },
      ],
    },
  ]);

  // 1/4 UPLOAD ẢNH
  const uploadImageStep1 = () => {
    if (saveVariant.length === 0 || infoImageProduct.length === 0) {
      alert("Vui lòng chọn ảnh Sản phẩm / phân loại!");
      setLoading(false);
      return;
    }

    var file = new FormData();
    file.append("File", infoImageProduct, infoImageProduct.name);
    file.append("Type", "Product");
    console.log("upload Image Step1 =>", file);

    axios({
      url: "https://api.newee.asia:8001/upload-image",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: file,
    })
      .then(function (response) {
        infoProduct.Link = response.data;
        createProductStep2(infoProduct);
        setStep1(infoProduct);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // 2/4 CREATE PRODUCT
  const createProductStep2 = async (dataStep1) => {
    console.log("step1 with data-step2", dataStep1);
    console.log("step1 with data-step2", JSON.stringify(dataStep1));
    console.log("step1 with step2", step1);

    try {
      await axios(`${API}/Newee/ManagerProduct/Create`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${user}`,
        },
        method: "POST",
        data: JSON.stringify(dataStep1),
      })
        .then((res) => {
          console.log(res);

          uploadListImageVariantStep3(res.data.data);
          setIdProduct(res.data.data.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // 3/4 UPLOAD LIST ẢNH
  const uploadListImageVariantStep3 = async (dataStep2) => {
    console.log("data Step 2", dataStep2);
    console.log("data Step 2 => id", dataStep2.id);

    var a = [];
    savePath.forEach((element, index) => {
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
      })
        .then(function (response) {
          console.log("response ", response.data);
          a.push(response.data);
          saveVariant[index].imageLink = response.data;
          saveVariant[index].productId = dataStep2.id;
        })
        .catch((err) => {
          setLoading(false);
          console.log("error step3", err);
        });
      setSaveLinkImageVariant(a);
    });
    console.log("list Link Variant =>", a);
    setTimeout(() => {
      createListVariantStep4(saveVariant, dataStep2.id);
    }, 5000);
  };
  // 4/4 CREATE VARIANT
  const createListVariantStep4 = async (dataStep3, idProducts) => {
    console.log("createListVariantStep4 ", dataStep3);
    console.log("createListVariantStep4 ", JSON.stringify(dataStep3[0]));
    console.log("idProduct", idProducts);
    dataStep3.forEach((element) => {
      if (element.productId === "" || element.productId === undefined) {
        element.productId = idProducts;
      }
      try {
        axios(`${API}/Newee/ManagerVariant/Create`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user}`,
          },
          method: "POST",
          data: JSON.stringify(element),
        })
          .then((res) => {
            console.log(res);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm thành công!",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm không thành công!",
              type: "success",
            });
            setLoading(false);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    });
  };

  const handleSubmitCreateProductSheet = async () => {
    alert("đã chạy");

    data.forEach((element, index) => {
      try {
        axios(`${API}/Newee/ManagerProduct/Create`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user}`,
          },
          method: "POST",
          data: JSON.stringify(element),
        })
          .then((res) => {
            console.log(res);
            handleCreateVariantSheet(res.data.data.id, index);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    });
  };
  const handleCreateVariantSheet = async (idProduct, index) => {
    data[index].Variant.forEach((element) => {
      if (element.productId === "" || element.productId === undefined) {
        element.productId = idProduct;
      }
      try {
        axios(`${API}/Newee/ManagerVariant/Create`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user}`,
          },
          method: "POST",
          data: JSON.stringify(element),
        })
          .then((res) => {
            console.log("ket qua tao Variant", res);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm thành công!",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm không thành công!",
              type: "success",
            });
            setLoading(false);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setNotify({
      isOpen: true,
      message: "Tạo phân loại sản phẩm không thành công!",
      type: "warning",
    });
  }, []);

  const [dataSheet, setDataSheet] = useState();
  // SHEET
  const { getRootProps, getInputProps } = useDropzone({
    // Disable click and keydown behavior

    noClick: true,
    accept: [".xls", ".xlsx"],
    noKeyboard: true,
    onDropRejected: () => {
      alert("File is not supported");
    },
    onDrop: (files) => {
      files.forEach(async (file) => {
        console.log(file.type);
        console.log(file.name);

        const reader = new FileReader();
        reader.onload = (evt) => {
          // evt = on_file_select event
          /* Parse data */
          // @ts-ignore
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const results = sheet2arr(ws);
          console.log({ results });
          /* Convert array of arrays */
          // const data = XLSX.utils.sheet_to_csv(ws, {header:1});

          // const data = XLSX.utils.sheet_to_json(ws) as [];
          const data = XLSX.utils.sheet_to_json(ws);
          console.log("dataa day");
          console.log({ data });

          setDataSheet(data);
          // convertJsonDataToRowData(data);
        };
        reader.readAsBinaryString(file);
      });
    },
  });

  const headers = [
    "Attribute Name",
    "Attribute Type",
    "Data Type",
    "Primary Key",
    "Input Array",
  ];
  var sheet2arr = function (sheet) {
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(sheet["!ref"]);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        var nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
        if (typeof nextCell === "undefined") {
          row.push(void 0);
        } else row.push(nextCell.w);
      }
      result.push(row);
    }
    return result;
  };
  const convertJsonDataToRowData = () => {
    const rowData = new Array();
    const messages = new Array();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const matchedKey = Object.keys(item).find((key) => headers.includes(key));
      if (matchedKey == null) {
        console.log("required headers does not exist");
        break;
      } else {
        Object.keys(item).forEach((key) => {
          if (key === "age") {
            if (typeof item["age"] === "string") {
              const message = {
                rowNum: i,
                message: "In correct format for age",
              };
              messages.push(message);
            }
          }
        });
      }
    }
  };
  function unique(arr) {
    var formArr = arr.sort();
    console.log("formArr", formArr);
    // danh sách
    var newArr = [formArr[0]];
    // = 1
    console.log("newArr", newArr);
    // nếu i = 1, i < 14, i++
    // nếu giá trị thứ i !== formArr[i-1] => +
    var obj = [];
    for (let i = 1; i < formArr.length; i++) {
      console.log("formArr", formArr[i]);
      console.log(formArr[i - 1]);

      formArr[i].Variant = [];

      if (formArr[i] !== formArr[i - 1]) {
        formArr[i].Variant.push(formArr[i].price);
        obj.push(formArr[i].price, formArr[i].priceSeller);
        Object.assign(formArr[i].Variant, obj);
      }
    }
    console.log(obj);
    return newArr;
  }
  var dataTest = [
    {
      Brand: "test sheet",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      Description: "sản phẩm 1",
      Link: "https://api.newee.asia:8001/Photos/Product/637709477532871883.jpg",
      Name: "sản phẩm 1",
      PackingForm: "packingForm",
      PropertyName: "Phân loại 1",
      PropertyValue: "giá trị 1",
      count: 10,
      imageLink:
        "https://api.newee.asia:8001/Photos/Product/637709486027400005.jpg",
      moneyReceived: 20000,
      percent: 5,
      price: 200000,
      priceSeller: 20000,
      sku: "sku1",
    },
    {
      Brand: "test sheet",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      Description: "sản phẩm 1",
      Link: "https://api.newee.asia:8001/Photos/Product/637709477532871883.jpg",
      Name: "sản phẩm 1",
      PackingForm: "packingForm",
      PropertyName: "Phân loại 1",
      PropertyValue: "giá trị 1",
      count: 10,
      imageLink:
        "https://api.newee.asia:8001/Photos/Product/637709486027400005.jpg",
      moneyReceived: 20000,
      percent: 5,
      price: 200000,
      priceSeller: 20000,
      sku: "sku1",
    },
    {
      Brand: "test sheet",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      Description: "sản phẩm ",
      Link: "https://api.newee.asia:8001/Photos/Product/637709477532871883.jpg",
      Name: "sản phẩm 2",
      PackingForm: "packingForm",
      PropertyName: "Phân loại 1",
      PropertyValue: "giá trị 1",
      count: 50,
      imageLink:
        "https://api.newee.asia:8001/Photos/Product/637709425413416893.jpg",
      moneyReceived: 20000,
      percent: 5,
      price: 200000,
      priceSeller: 20000,
      sku: "sku1",
    },
    {
      Brand: "test sheet",
      CategoryId: "deed476c-e8ab-4786-8e7e-68f2fb7d70bc",
      Description: "sản phẩm 1",
      Link: "https://api.newee.asia:8001/Photos/Product/637709477532871883.jpg",
      Name: "sản phẩm 2",
      PackingForm: "packingForm",
      PropertyName: "Phân loại 1",
      PropertyValue: "giá trị 3",
      count: 150,
      imageLink:
        "https://api.newee.asia:8001/Photos/Product/637709425413416893.jpg",
      moneyReceived: 20000,
      percent: 5,
      price: 200000,
      priceSeller: 20000,
      sku: "sku1",
    },
  ];
  useEffect(() => {
    console.log(unique(dataTest));
  }, []);

  // SHEET
  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          {" "}
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Thêm sản phẩm mới Sheet!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} style={{ display: "block" }} />
              </div>
            </div>

            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/2)</label>
              <form className="addProductForm">
                <InfoProduct
                  getDataProduct={getInfoProduct}
                  downCategory={listCategory}
                  showResult={showResult}
                />
                <button
                  type="button"
                  className="addProductButton"
                  // onClick={() => createProduct()}
                  onClick={() => handleSubmitCreateProductSheet()}
                >
                  Tạo sản phẩm Sheet
                </button>
                <button
                  type="button"
                  className="addProductButton"
                  // onClick={() => createProduct()}
                  onClick={() => handleSubmitCreateProduct()}
                >
                  Tạo sản phẩm
                </button>
                <button
                  type="button"
                  className="successProductButton"
                  // onClick={() => createProduct()}
                  onClick={() => setShowResult(!showResult)}
                >
                  Kết quả
                </button>
                <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
              </form>
            </div>
            <div className="newProduct-variants">
              <DynamicCommon handleClick={getCommonVariant} />

              {isVariant === true && (
                <DynamicForms
                  common={commonVariant || []}
                  setCountVariant={setCountVariant || null}
                  getDataVariant={getInfoVariant}
                />
              )}
              {/*  */}

              <button
                type="button"
                onClick={() => createListDataVariant()}
                className="addProductButton"
              >
                Tạo phân loại
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
