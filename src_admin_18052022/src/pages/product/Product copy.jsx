import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import ConfigAPI from "../../utils/ConfigAPI";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";

export default function Product() {
  let { productId } = useParams();
  console.log(productId);
  const [infoProduct, setInfoProduct] = useState();
  const [variantProduct, setVariantProduct] = useState();
  const [isCheck, setIsCheck] = useState(false);

  const isLoading = useSelector((state) => state.product.isLoading);

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  useEffect(() => {
    getProduct();
    getProductVariant();
  }, []);

  const getProduct = async () => {
    ConfigAPI(`Newee/ManagerProduct/GetById/${productId}`, "GET", null)
      .then((res) => {
        console.log("get Product 1 =>", res);
        setInfoProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductVariant = async () => {
    ConfigAPI(`Newee/ManagerVariant/Get/${productId}`, "GET", null)
      .then((res) => {
        console.log("get Product 22 =>", res);
        setVariantProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const RowVariant = () => {
    return (
      <div className="productList">
        <DataGrid
          rows={variantProduct !== undefined ? variantProduct : []}
          disableSelectionOnClick
          columns={columns}
          pageSize={100}
          checkboxSelection
        />
      </div>
    );
  };
  return (
    <div className="product">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <div className="productTitleContainer">
            <h1 className="productTitle">Chi tiết sản phẩm</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Thêm sản phẩm</button>
            </Link>
          </div>

          <div className="productTop">
            <div className="productTopLeft">
              <Chart
                data={productData}
                dataKey="Sales"
                title="Sales Performance"
              />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src={infoProduct?.link}
                  alt=""
                  className="productInfoImg"
                />
                <span className="productName">
                  {infoProduct?.name || "dang cap nhap"}
                </span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Category:</span>
                  <span className="productInfoValue">
                    {infoProduct?.categoryName}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Packing Form:</span>
                  <span className="productInfoValue">
                    {infoProduct?.packingForm}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Content 1:</span>
                  <span className="productInfoValue">
                    {infoProduct?.content1.length !== 0 ? "Yes" : "No"}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Content 2:</span>
                  <span className="productInfoValue">
                    {infoProduct?.content2.length !== 0 ? "Yes" : "No"}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Content 3:</span>
                  <span className="productInfoValue">
                    {infoProduct?.content3.length !== 0 ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="productBottom info">
            <form className="productForm pr-2">
              <label>Thông tin chi tiết - Phân loại</label>
              <Link to="/newproduct">
                <button className="productAddButton">Thêm phân loại</button>
              </Link>
            </form>

            <RowVariant />
          </div>
          <div className="productBottom container">
            <div className="header">
              <label>Thông tin chi tiết - Content</label>
            </div>
            <div className="body d-flex">
              <div className="product-content">
                <div className="product-content-header">
                  <label>#1</label>
                  <Link to="/newproduct">
                    <button className="productAddButton">Sửa</button>
                  </Link>
                </div>
                <div className="product-content-body">
                  {infoProduct?.content1 || "Chưa có Content #1"}
                </div>
              </div>
              <div className="product-content">
                <div className="product-content-header">
                  <label>#2</label>
                  <Link to="/newproduct">
                    <button className="productAddButton">Sửa</button>
                  </Link>
                </div>
                <div className="product-content-body">
                  {infoProduct?.content2 || "Chưa có Content #2"}
                </div>
              </div>
              <div className="product-content">
                <div className="product-content-header">
                  <label>#3</label>
                  <Link to="/newproduct">
                    <button className="productAddButton">Sửa</button>
                  </Link>
                </div>
                <div className="product-content-body">
                  {infoProduct?.content3 || "Chưa có Content #3"}
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom container">
            <div className="header">
              <label>Thông tin chi tiết - Mô tả sản phẩm</label>
              <Link to="/newproduct">
                <button className="productAddButton">Sửa mô tả</button>
              </Link>
            </div>
            <div className="body ">
              <div className="product-content">
                <div className="product-content-body">
                  {infoProduct?.description || "Chưa có Mô tả sản phẩm"}
                </div>
              </div>
            </div>
          </div>

          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder="Apple AirPod" />
                <label>In Stock</label>
                <select name="inStock" id="idStock">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label>Active</label>
                <select name="active" id="active">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
