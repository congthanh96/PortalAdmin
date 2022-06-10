/**
 * Danh sách sản phẩm
 */

import React, { useEffect, useState } from "react";
import "./users.css";
import TopPage from "../../Components/toppage/topPage";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { Input, Spin } from "antd";
import { toast } from "react-toastify";
import { usersAPI } from "../../APIs";
import NoData from "../../Components/NoData/NoData";
import { CSVLink, CSVDownload } from "react-csv";
import { Table } from "ant-table-extensions";
const Users = () => {
  const dataTop = ["Trang chủ", "Tài khoản"];
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dataToSearch, setDataToSearch] = useState([]);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await usersAPI.getUsers();
        console.log(res);
        setUsers(res);
        setDataToSearch(res);
        setIsLoading(false);
      } catch (error) {
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
      (record.code !== null) ? (
        <span>
          {record.code}
        </span>
      ) : (
        <NoData/>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      render: (text, record, index) =>
        (record.firstName !== null || record.lastName !== null) ? (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ) : (
          <NoData/>
        ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (text, record, index) =>
      (record.email !== null) ? (
        <span>
          {record.email}
        </span>
      ) : (
        <NoData/>
      ),
    },
    {
      title: "Điện thoại",
      key: "phone",
      dataIndex: "phone",
      render: (text, record, index) =>
      (record.phone !== null) ? (
        <span>
          {record.phone}
        </span>
      ) : (
        <NoData/>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => (
        <a href={"/user/" + record.id} className="css-a">
          Xem
        </a>
      ),
    },
  ];

  const handleSearch = () => {
    console.log(searchValue);
    const filteredRows = dataToSearch.filter((row) => {
      if (row.code === null) {
        row.code = "";
      }
      row.code = row.code.trim();
      return row.code.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(filteredRows);

    setUsers(filteredRows);
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
        <div className="container-data">
          <>Total: {users.length} results</>
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
            exportable
            exportableProps={{ users, fileName: "my-table" }}
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
        <CSVLink data={users}>Download me</CSVLink>;
      </Spin>
    </div>
  );
};
export default Users;
