import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DynamicCommon from "../../components/upload/dynamicForm/DynamicCommon";
import DynamicForms from "../../components/upload/dynamicForm/DynamicForms";
import InfoProduct from "../../components/upload/dynamicForm/InfoProduct";
import UploadImage from "../../components/upload/images/UploadImage";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./newProduct.css";



export default function NewProduct() {
  const isLoading = useSelector((state) => state.product.isLoading);
  console.log("isloading", isLoading);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

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
  const [infoImageProduct, setInfoImageProduct] = useState();
  const [resImageProduct, setResImageProduct] = useState("");

  const [infoProduct, setInfoProduct] = useState({
    Name: "",
    Brand: "",
    Link: "",
    PackingForm: "",
    Description: "",
    CategoryId: "",
    productAsset: "",
    content1: "",
    content2: "",
    content3: "",
  });
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

  const getImageProduct = (info) => {
    console.log(info);
    setInfoImageProduct(info);
  };
  //Result = multiple link anh san pham
  const getImageProductMultiple = (count) => {
    console.log(count);
  };

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
      // alert(response.data);
      console.log("response ", response.data);
      setResImageProduct(response.data);
    });
  };

  useEffect(() => {
    // setIsVariant(true);
    console.log("father=>", countVariant);
  }, [countVariant]);
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

  useEffect(() => {
    console.log("resImageProduct", resImageProduct);
  }, [resImageProduct.length]);

  return (
    <div className="newProduct">
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          {" "}
          <h1 className="addProductTitle">Thêm sản phẩm mới!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/2)</label>
              <form className="addProductForm">
                <InfoProduct />
                <UploadImage handleClick={getImageProduct} />

                <button
                  type="button"
                  className="addProductButton"
                  onClick={() => uploadImageProduct()}
                >
                  Tạo sản phẩm
                </button>
              </form>
            </div>
            <div className="newProduct-variants">
              <DynamicCommon handleClick={getCommonVariant} />

              {isVariant === true && (
                <DynamicForms
                  common={commonVariant || []}
                  setCountVariant={setCountVariant || null}
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
            <div className="newProduct-variants">
              <label>#2 - Tạo phân loại (2/2)</label>
              <form className="addProductForm">
                <div className="addProductItem">
                  <label>Nhóm phân loại</label>
                  <input type="text" placeholder="Apple Airpods" />
                </div>
                <div className="addProductItem">
                  <label>Giá trị thuộc tính</label>
                  <select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="addProductItem">
                  <label>SKU</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="addProductItem">
                  <label>Số lượng</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="addProductItem">
                  <label>Giá niêm yết</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="addProductItem">
                  <label>Chiết khấu (%)</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="addProductItem">
                  <label>Chiết khấu (VND)</label>
                  <input type="text" placeholder="123" />
                </div>
                <div className="addProductItem">
                  <label>Số tiền Seller nhận</label>
                  <input type="text" placeholder="123" />
                </div>

                <div className="addProductItem">
                  <label>Image</label>
                  <input type="file" id="file" />
                </div>

                <button className="addProductButton">Tạo phân loại</button>
              </form>
            </div>
          </div>
          <div className="newProduct-results">
            <label>#3 - Kết quả</label>
            <RowVariant />
          </div>
        </>
      )}
    </div>
  );
}
