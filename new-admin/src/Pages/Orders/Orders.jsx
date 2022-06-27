/**
 * Danh sách đơn hàng
 */

import { Spin, Input, Table, Select } from "antd";
import ButtonComponent from "../../Components/button/ButtonComponent";
import TopPage from "../../Components/toppage/topPage";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { ordersAPI } from "../../APIs";
import { toast } from "react-toastify";
import NoData from "../../Components/NoData/NoData";
import { formatVND } from "../../Common/formatVND";
import { LIST_STATUS_ORDER } from "../../Common/constants";
import "./orders.css";
const { Option } = Select;

const Orders = () => {
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/orders",
      nameLink: "Danh sách đơn hàng",
    },
  ];
  const [orders, setOrders] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [searchValue, setSearchValue] = useState({
    code: "",
    codeSeller: "",
    name: "",
    status: "",
  });
  const [dataToSearch, setDataToSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ordersAPI.getOrders();
        console.log(res.bills);
        setOrders(res.bills);
        setDataToSearch(res.bills);
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
      title: "Ngày đặt hàng",
      key: "createTime",
      dataIndex: "createTime",
      render: (text, record, index) => {
        if (record.createTime === null) {
          return <NoData />;
        } else {
          let temp = record.createTime.split("T");
          return <span>{temp[0]}</span>;
        }

        //   return (record.createTime !== null ? <span>{record.createTime}</span> : <NoData />);
      },
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      render: (text, record, index) =>
        record.code !== null ? <span>{record.code}</span> : <NoData />,
    },
    {
      title: "Mã CTV",
      key: "codeSeller",
      dataIndex: "codeSeller",
      render: (text, record, index) =>
        record.codeSeller !== 0 ? (
          <span> {record.codeSeller} </span>
        ) : (
          <NoData />
        ),
    },
    {
      title: "Tên người nhận",
      key: "fullName",
      dataIndex: "fullName",
      render: (text, record, index) => <span>{record.fullName}</span>,
    },
    {
      title: "Giá tiền",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (text, record, index) => (
        <span>{formatVND(record.totalPrice)}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        return (
          <span>
            <Link to={"/order/" + record.idBill} className="css-edit">
              Xem
            </Link>
            {/* <span className="css-remove" onClick={() => console.log(record)}>
              Ẩn
            </span> */}
          </span>
        );
      },
    },
  ];
  const handleSearch = () => {
    console.log(searchValue);
    const filteredRows = dataToSearch.filter((row) => {
      if (row.code === null) {
        row.code = "";
      }
      if (row.codeSeller === null) {
        row.codeSeller = "";
      }
      if (row.fullName === null) {
        row.fullName = "";
      }
      if(searchValue.status==="All")
      {
        searchValue.status =""
      }
      row.code = row.code.trim();
      row.codeSeller = row.codeSeller.trim();
      row.fullName = row.fullName.trim();
      return (
        row.code.toLowerCase().includes(searchValue.code.toLowerCase()) &&
        row.codeSeller
          .toLowerCase()
          .includes(searchValue.codeSeller.toLowerCase()) &&
        row.fullName.toLowerCase().includes(searchValue.name.toLowerCase())
        &&
        row.status.includes(searchValue.status)
      );
    });
    console.log(filteredRows);
    setOrders(filteredRows);
  };

  const handleDataToExport = () => {
    setDataToExport(
    orders.map((e) => ({
        "Ngày đặt hàng": e.createTime,
        "Mã đơn hàng": e.code,
        "Mã CTV": e.codeSeller,
        "Tên người nhận": e.fullName,
        "Giá tiền": formatVND(e.totalPrice)
      }))
    );
    toast.success("Xuất dữ liệu danh sách đơn hàng thành công!");
  };
  return (
    <React.Fragment>
      <div className="orders-container">
        <Spin spinning={isLoading}>
          <TopPage dataProps={dataTop} />
          {/* <div className="css-add-btn">
          <Link to="/add-product">
            <ButtonComponent 
            //onClick={handleAddProduct}
            >
              Thêm sản phẩm
            </ButtonComponent>
          </Link>
        </div> */}
          <div>
            <Input
              className="css-input-orders"
              placeholder="nhập mã đơn hàng"
              onChange={(e) => {
                setSearchValue({ ...searchValue, code: e.target.value.trim() });
              }}
            ></Input>
            <Input
              className="css-input-orders"
              placeholder="nhập mã ctv"
              onChange={(e) => {
                setSearchValue({
                  ...searchValue,
                  codeSeller: e.target.value.trim(),
                });
              }}
            ></Input>
            <Input
              className="css-input-orders"
              placeholder="nhập tên người nhận"
              onChange={(e) => {
                setSearchValue({ ...searchValue, name: e.target.value.trim() });
              }}
            ></Input>

            <Select
              showSearch
              className="css-input-select"
              placeholder="Search to Select"
              optionFilterProp="children"
              defaultValue={LIST_STATUS_ORDER[0]}
              filterOption={(input, option) => option.children.includes(input)}
            //   filterSort={(optionA, optionB) =>
            //     optionA.children
            //       .toLowerCase()
            //       .localeCompare(optionB.children.toLowerCase())
            //   }
              onSelect={(event) => {
                setSearchValue({ ...searchValue, status: event});
              }}
            >
              {LIST_STATUS_ORDER.map((value, index) => {
                return (
                  <Option key={index} value={value.value}>
                    {value.name}
                  </Option>
                );
              })}
            </Select>
            <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
          </div>
          <div className="container-data-orders">
            <div className="css-header">
              <div className="css-total">Total: {orders.length} results</div>
              <div className="css-export">
                <ButtonComponent
                onClick={handleDataToExport}
                >
                  <CSVLink data={dataToExport} filename="Quản lý đơn hàng">
                    Xuất dữ liệu
                  </CSVLink>
                </ButtonComponent>
              </div>
            </div>

            <Table
              dataSource={orders}
              columns={columnsAntd}
              rowKey={(row) => row.idBill}
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
        {/* <Modal
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
      </Modal> */}
      </div>
    </React.Fragment>
  );
};
export default Orders;
