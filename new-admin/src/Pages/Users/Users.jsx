/**
 * Danh sách tài khoản
 */
import React, { useEffect, useState } from "react";
import TopPage from "../../Components/toppage/topPage";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { Input, Spin } from "antd";
import { toast } from "react-toastify";
import { usersAPI } from "../../APIs";
import NoData from "../../Components/NoData/NoData";
import { CSVLink } from "react-csv";
import { Table } from "antd";
import { Link } from "react-router-dom";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dataToSearch, setDataToSearch] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [page, setPage] = React.useState(1);
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/users",
      nameLink: "Danh sách tài khoản",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await usersAPI.getUsers();
        // console.log(res);
        setUsers(res);
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
      title: "Mã CTV",
      key: "code",
      dataIndex: "code",
      render: (text, record, index) =>
        record.code !== null ? <span>{record.code}</span> : <NoData />,
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      render: (text, record, index) =>
        record.firstName !== null || record.lastName !== null ? (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ) : (
          <NoData />
        ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (text, record, index) =>
        record.email !== null ? <span>{record.email}</span> : <NoData />,
    },
    {
      title: "Điện thoại",
      key: "phone",
      dataIndex: "phone",
      render: (text, record, index) =>
        record.phone !== null ? <span>{record.phone}</span> : <NoData />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => (
        <Link to={"/user/" + record.id} className="css-a">
          Xem
        </Link>
      ),
    },
  ];

  const handleSearch = () => {
    // console.log(searchValue);
    const filteredRows = dataToSearch.filter((row) => {
      if (row.code === null) {
        row.code = "";
      }
      row.code = row.code.trim();
      return row.code.toLowerCase().includes(searchValue.toLowerCase());
    });
    // console.log(filteredRows);
    setUsers(filteredRows);
  };

  const handleDataToExport = () => {
    toast.success("Xuất dữ liệu danh sách tài khoản thành công!");
    setDataToExport(
      users.map((e) => ({
        "Mã CTV": e.code,
        "Họ tên":
          e.firstName === null && e.lastName === null
            ? null
            : e.firstName + " " + e.lastName,
        Email: e.email,
        SĐT: e.phone,
      }))
    );
  };

  return (
    <div className="users-container">
      <Spin spinning={isLoading}>
        <TopPage dataProps={dataTop} />
        <div>
          <Input
            className="css-input"
            placeholder="nhập mã ctv"
            onChange={(e) => {
              setSearchValue(e.target.value.trim());
            }}
            // allowClear
          ></Input>
          <ButtonComponent onClick={handleSearch}>Search</ButtonComponent>
        </div>
        <div className="container-data-users">
          <div className="css-header">
            <div className="css-total">Total: {users.length} results</div>
            <div className="css-export">
              <ButtonComponent onClick={handleDataToExport}>
                <CSVLink data={dataToExport} filename="Quản lý tài khoản">
                  Xuất dữ liệu
                </CSVLink>
              </ButtonComponent>
            </div>
          </div>

          <Table
            dataSource={users}
            columns={columnsAntd}
            rowKey={(row) => row.code}
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
    </div>
  );
};

export default Users;
