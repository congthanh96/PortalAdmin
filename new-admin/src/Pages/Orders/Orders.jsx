/**
 * Danh sách đơn hàng
 */

import { Spin, Input, Table, Select, Dropdown, Space, Menu } from "antd";
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
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "./orders.css";

const { Option } = Select;

const Orders = () => {
  const navigate = useNavigate()
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

  const dataStatus = LIST_STATUS_ORDER.filter(
    (value) => value.value !== "Cancel"
  );

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

  const handleMenuClick = async(e) => {
   
   const dataToPost = e.key.split(",")
   const idBill = dataToPost[1];
   const status = dataToPost[0];
  //  if(status==="Accecpt")
  //  {
  //   navigate("/GHTK/"+idBill);
  //  }
  //  else{

     console.log('id', idBill);
     console.log('status', status);
     try {
      await ordersAPI.changeStatusProduct(idBill, status);
      let temp = (orders) => {
        return orders.map((row, index) =>
          row.idBill === idBill ? { ...row, status: status } : row
        );
      };
      setOrders(temp)
      setDataToSearch(temp)
     } catch (error) {
      toast("Thay đổi trạng thái của "+{idBill}+" sang "+{status}+" không thành công")
     }
   //}
  };
  
  const menu = (order) => {
    // if(order.status===LIST_STATUS_ORDER[1].value)
    // {
    //   return(
    //     <Menu
    //     onClick={handleMenuClick}
    //     items={[
    //       {
    //         label:LIST_STATUS_ORDER[2].name,
    //         key: [LIST_STATUS_ORDER[2].value,order.idBill],
    //         disabled: false,
    //         //onClick:((event)=>{console.log(event.key)})
    //       },

    //       {
    //         label: LIST_STATUS_ORDER[7].name,
    //         key: [LIST_STATUS_ORDER[7].value,order.idBill],
    //         disabled: false,
    //         //onClick:((event)=>{console.log(event.key)})
    //       },
    //     ]}
    //   />
    //   )
    // }
    if(order.status===LIST_STATUS_ORDER[2].value)
    {
      return(
        <Menu
        onClick={handleMenuClick}
        items={[
          {
            label:LIST_STATUS_ORDER[3].name,
            key: [LIST_STATUS_ORDER[3].value,order.idBill],
            disabled: false,
          },

          {
            label: LIST_STATUS_ORDER[6].name,
            key: [LIST_STATUS_ORDER[6].value,order.idBill],
            disabled: false,
          },
        ]}
      />
      )
    }
    if(order.status===LIST_STATUS_ORDER[3].value)
    {
      return(
        <Menu
        onClick={handleMenuClick}
        items={[
          {
            label:LIST_STATUS_ORDER[4].name,
            key: [LIST_STATUS_ORDER[4].value,order.idBill],
            disabled: false,
          },
        ]}
      />
      )
    }
    if(order.status===LIST_STATUS_ORDER[4].value)
    {
      return(
        <Menu
        onClick={handleMenuClick}
        items={[
          {
            label:LIST_STATUS_ORDER[5].name,
            key: [LIST_STATUS_ORDER[5].value,order.idBill],
            disabled: false,
          },
        ]}
      />
      )
    }
    else
    {
      return (
        <Menu
        onClick={handleMenuClick}
          items={[
            {
              label: "Not change",
              key: "1",
              disabled: true,
            },
          ]}
        />
      );
    }
  };

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
          return <NoData key={index} />;
        } else {
          let temp = record.createTime.split("T");
          return <span key={index}>{temp[0]}</span>;
        }

        //   return (record.createTime !== null ? <span>{record.createTime}</span> : <NoData />);
      },
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      render: (text, record, index) =>
        record.code !== null ? (
          <Link to={"/order/" + record.idBill} className="css-edit">
            {record.code}
          </Link>
        ) : (
          <NoData />
        ),
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
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => (
        <span key={index}>
          {LIST_STATUS_ORDER.map((value, idx) =>
            value.value === record.status ? (
              <span key={idx}>{value.name}</span>
            ) : (
              <span key={idx}></span>
            )
          )}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        if (record.status === "Pending") {
          return (
            <Link
              to={{
                pathname: `/GHTK/${record.idBill}`,
              }}
              state={record}
            >
              GHTK
            </Link>
          );
          // <span key={index}>
        } else {
          return (
            <Dropdown overlay={menu(record)} placement="bottomLeft">
              <Space>
                Chuyển trạng thái
                <DownOutlined />
              </Space>
            </Dropdown>
          );
       }
        //   <Link to={"/order/" + record.idBill} className="css-edit">
        //     Xem
        //   </Link>
        //   {/* {LIST_STATUS_ORDER.map((value, index) =>
        //     value.value === record.status ? value.name : <></>
        //   )} */}
        // </span>
        //);
      },
    },
  ];
  const handleSearch = () => {
    // console.log(searchValue);
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
      if (searchValue.status === "All") {
        searchValue.status = "";
      }
      row.code = row.code.trim();
      row.codeSeller = row.codeSeller.trim();
      row.fullName = row.fullName.trim();
      return (
        row.code.toLowerCase().includes(searchValue.code.toLowerCase()) &&
        row.codeSeller
          .toLowerCase()
          .includes(searchValue.codeSeller.toLowerCase()) &&
        row.fullName.toLowerCase().includes(searchValue.name.toLowerCase()) &&
        row.status.includes(searchValue.status)
      );
    });
    // console.log(filteredRows);
    setOrders(filteredRows);
  };

  const handleDataToExport = () => {
    setDataToExport(
      orders.map((e) => ({
        "Ngày đặt hàng": e.createTime,
        "Mã đơn hàng": e.code,
        "Mã CTV": e.codeSeller,
        "Tên người nhận": e.fullName,
        "Trạng thái": e.status,
        "Giá tiền": formatVND(e.totalPrice),
      }))
    );
    // if(!toast.isActive(toastId.current)) {
    toast.success("Xuất dữ liệu danh sách đơn hàng thành công!");
    //}
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
              className="css-input-select-orders"
              placeholder="Search to Select"
              optionFilterProp="children"
              size="large"
              defaultValue={dataStatus[0]}
              filterOption={(input, option) => option.children.includes(input)}
              //   filterSort={(optionA, optionB) =>
              //     optionA.children
              //       .toLowerCase()
              //       .localeCompare(optionB.children.toLowerCase())
              //   }
              onSelect={(event) => {
                setSearchValue({ ...searchValue, status: event });
              }}
            >
              {dataStatus.map((value, index) => {
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
                <ButtonComponent onClick={handleDataToExport}>
                  <CSVLink data={dataToExport} filename="Quản lý đơn hàng">
                    Xuất dữ liệu
                  </CSVLink>
                </ButtonComponent>
              </div>
            </div>

            <Table
              dataSource={orders}
              columns={columnsAntd}
              rowKey="code"
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
