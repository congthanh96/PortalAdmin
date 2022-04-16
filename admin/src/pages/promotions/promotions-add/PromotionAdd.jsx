import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./promotionAdd.css";
export default function PromotionAdd() {
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

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm khuyến mãi mới!</h1>

      <div className="newProduct-container">
        <div className="newProduct-variant">
          <label>#1 - Tạo phân loại (2/2)</label>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Tên khuyến mãi</label>
              <input type="text" placeholder="Apple Airpods" />
            </div>
            <div className="addProductItem">
              <label>Ngày bắt đầu</label>
              <input type="text" placeholder="123" />
            </div>
            <div className="addProductItem">
              <label>Ngày kết thúc</label>
              <input type="text" placeholder="123" />
            </div>

            <div className="addProductItem w-100">
              <label>Tên sản phẩm</label>
              <input type="text" placeholder="123" />
            </div>

            <button className="addProductButton">Tạo phân loại</button>
          </form>
        </div>
      </div>
      <div className="newProduct-results">
        <label>#3 - Kết quả</label>
        <RowVariant />
      </div>
    </div>
  );
}
