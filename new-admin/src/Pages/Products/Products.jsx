/**
 * Danh sách sản phẩm
 */

import React, { useState, useEffect } from "react";
import { productsAPI } from "../../APIs";
import { toast } from "react-toastify";
import NoData from "../../Components/NoData/NoData";
import { Input, Spin, Table, Modal, Rate } from "antd";
import { Link } from "react-router-dom";
import TopPage from "../../Components/toppage/topPage";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { CSVLink } from "react-csv";
import { formatVND } from "../../Common/formatVND";
import "./products.css";
const Products = () => {
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/products",
      nameLink: "Danh sách sản phẩm",
    },
  ];
  const [products, setProducts] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dataToSearch, setDataToSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productsAPI.getProducts();
        console.log(res);
        setProducts(res);
        setDataToSearch(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    };

    fetchData();
  }, []);
  const columnsAntd = [
    {
      title: "STT",
      key: "STT",
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Sản phẩm",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) =>
        record.name !== null ? <span>{record.name}</span> : <NoData />,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text, record, index) =>
        record.price1 !== null ? (
          <span>{formatVND(record.price1)}</span>
        ) : (
          <NoData />
        ),
    },
    {
      title: "Đánh giá",
      key: "ratingScores",
      dataIndex: "ratingScores",
      render: (text, record, index) =>
        record.ratingScores !== 0 ? (
          <Rate value={record.ratingScores} />
        ) : (
          <NoData />
        ),
    },
    {
      title: "Yêu thích",
      key: "countLike",
      dataIndex: "countLike",
      render: (text, record, index) => <span>{record.countLike}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        return (
          <span>
            <Link to={"/product/" + record.id} className="css-edit">
              Xem
            </Link>
            <span className="css-remove" onClick={() => onClickRemove(record)}>
              Ẩn
            </span>
          </span>
        );
      },
    },
  ];
  const onClickRemove = (product) => {
    setIsVisibleModal(true);
    console.log(product);
    setProductToRemove(product);
  };
  const handleRemoveProduct = async () => {
    setIsLoading(true);
    try {
      const res = await productsAPI.disableProduct(productToRemove.id);
      console.log(res);
      let temp = products.filter((data) => data.id !== productToRemove.id);
      setProducts(temp);
      setIsVisibleModal(false);
      setIsLoading(false);
      toast.success("Ẩn sản phẩm " + productToRemove.name + " thành công");
    } catch (error) {
      setIsLoading(false);
      toast.error("Ẩn sản phẩm " + productToRemove.name + " thất bại");
    }
  };

  const handleAddProduct = () => {
    //  setIsVisibleModal(true)
  };
  const handleDataToExport = () => {
    toast.success("Xuất dữ liệu danh sách sản phẩm thành công!");
    setDataToExport(
      products.map((e) => ({
        "Tên sản phẩm": e.name,
        "Giá tiền": formatVND(e.price1),
        "Đánh giá": e.ratingScores,
        "Yêu thích": e.countLike,
      }))
    );
  };
  const handleSearch = () => {
    console.log(searchValue);
    const filteredRows = dataToSearch.filter((row) => {
      if (row.name === null) {
        row.name = "";
      }
      row.name = row.name.trim();
      return row.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(filteredRows);
    setProducts(filteredRows);
  };
  return (
    <React.Fragment>
      <div className="products-container">
        <Spin spinning={isLoading}>
          <TopPage dataProps={dataTop} />
          <div className="css-add-btn">
            <Link to="/add-product">
              <ButtonComponent onClick={handleAddProduct}>
                Thêm sản phẩm
              </ButtonComponent>
            </Link>
          </div>
          <div>
            <Input
              className="css-input"
              placeholder="nhập tên sản phẩm"
              onChange={(e) => {
                setSearchValue(e.target.value.trim());
              }}
              // allowClear
            ></Input>
            <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
          </div>
          <div className="container-data-products">
            <div className="css-header">
              <div className="css-total">Total: {products.length} results</div>
              <div className="css-export">
                <ButtonComponent onClick={handleDataToExport}>
                  <CSVLink data={dataToExport} filename="Quản lý sản phẩm">
                    Xuất dữ liệu
                  </CSVLink>
                </ButtonComponent>
              </div>
            </div>

            <Table
              dataSource={products}
              columns={columnsAntd}
              rowKey={(row) => row.id}
              // footer={Footer}
              // bordered
              pagination={{
                onChange(current) {
                  setPage(current);
                },
                position: ["bottomCenter"],
              }}
              // exportable
              // exportableProps={{ users, fileName: "my-table" }}
              // searchableProps={{
              //   // dataSource,
              //   // setDataSource: setSearchDataSource,
              //   inputProps: {
              //     placeholder: "Search this table...",
              //     prefix: <SearchOutlined />,
              //   },
              // }}
            ></Table>
          </div>
        </Spin>
        <Modal
          title="Vô hiệu hóa sản phẩm"
          visible={isVisibleModal}
          onOk={() => {
            handleRemoveProduct();
          }}
          onCancel={() => {
            setIsVisibleModal(false);
          }}
        >
          <p>Bạn thực sự muốn vô hiệu hóa sản phẩm "{productToRemove.name}"</p>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default Products;
