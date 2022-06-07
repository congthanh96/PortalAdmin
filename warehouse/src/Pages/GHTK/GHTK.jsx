/**
 * Trang xử lý đăng đơn lên GHTK và duyệt đơn
 */
import React, { useEffect, useState } from "react";
import { GHTKAPI, ordersAPI } from "../../APIs";
import { DownOutlined } from "@ant-design/icons";
import ColoredLinearProgress from "../../Common/LineProgress";
import { Menu, Dropdown, Space, Input, Button, Form, Table } from "antd";
import { LIST_ADDRESS_WAREHOUSE, ACCEPT } from "../../Common/constants";
import { formatVND } from "../../Common/formatVND";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router-dom";
import "./ghtk.css";

export default function GHTK({ location }) {
  const { state } = location;
  const history = useHistory();
  const [form] = Form.useForm();
  const billData = JSON.parse(state);
  const [isLoading, setIsLoading] = useState(false);
  //const [isVisibleModalWeight, setIsVisibleModalWeight] = useState(false);
  const [productsInOrder, setProductsInOrder] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [dataOrder, setDataOrder] = useState({
    id: "string",
    pick_name: "string",
    pick_address: "string",
    pick_province: "string",
    pick_district: "string",
    pick_ward: "string",
    pick_tel: "string",
    tel: "string",
    name: "string",
    address: "string",
    province: "string",
    district: "string",
    ward: "string",
    hamlet: "Khác",
    is_freeship: "0",
    pick_date: "2016-09-30",
    pick_money: 0,
    note: "string",
    value: 0,
    transport: "road",
    pick_option: "cod",
    deliver_option: "none",
    //total_weight:
    //pick_session: "string",
    tag: [],
  });

  const columns = [
    {
      title: "key",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Loại hàng",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Phân loại",
      dataIndex: "variantName",
      key: "variantName",
    },
    {
      title: "Khối lượng",
      dataIndex: "weight",
      key: "weight",
      // render: (text) => {
      //   return <label onClick={() => updateWeight(text)}>{text.weight}</label>;
      // },
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => formatVND(text),
    },
  ].filter((item) => !item.hidden);

  // Hiển thị thông tin chung của danh sách sản phẩm trong đơn hàng
  const Footer = () => {
    return (
      <>
        Tiền đơn hàng: {formatVND(dataOrder.pick_money)}
        <br />
        Phí ship: {formatVND(billData.priceShip)}
        <hr />
        Tổng tiền đơn hàng:{" "}
        {formatVND(dataOrder.pick_money + billData.priceShip)}
      </>
    );
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      var listProducts = [];

      // Thêm danh sách sản phẩm của đơn hàng vào dữ liệu gửi lên GHTK
      await billData.billDetail.forEach((element) => {
        listProducts.push({
          name: `${element.productName}` || "Sản phẩm chưa đặt tên",
          weight: element.weight * 1 || 1,
          quantity: element.count * 1 || 1,
          product_code: "",
        });
      });
      setProductsInOrder(listProducts);

      // Xử lý data thông tin đơn hàng
      let tagTemp = getTagOfOrder();
      setDataOrder({
        ...dataOrder,
        id: billData.idBill,
        pick_name: billData.code,
        pick_province: LIST_ADDRESS_WAREHOUSE[0].province,
        pick_district: LIST_ADDRESS_WAREHOUSE[0].district,
        pick_ward: LIST_ADDRESS_WAREHOUSE[0].ward,
        pick_address: LIST_ADDRESS_WAREHOUSE[0].address,
        pick_tel: LIST_ADDRESS_WAREHOUSE[0].tel,
        tel: billData.phone,
        name: billData.fullName,
        address: billData.address,
        province: billData.tp,
        district: billData.qh,
        ward: billData.pXa,
        pick_money: billData.totalPrice,
        note: billData.note,
        value: billData.totalPrice,
        tag: tagTemp,
      });
      setIsLoading(false);
    } catch (error) {
      toastr.warning("Lấy thông tin đơn hàng bị lỗi! Vui lòng thử lại");
    }
  }, []);

  // Xử lý các thuộc tính đặc biệt của đơn hàng
  const getTagOfOrder = () => {
    let isFragile = false; // hàng dễ vỡ
    let isAgricultural = false; // hàng nông sản
    billData.billDetail.forEach((product) => {
      if (product.variantf.tag1) {
        isFragile = true;
      }
      if (product.variantf.tag7) {
        isAgricultural = true;
      }
    });
    let tagTemp = [];
    switch ([isFragile, isAgricultural]) {
      case [true, false]: {
        tagTemp = [1];
        break;
      }
      case [false, true]: {
        tagTemp = [7];
        break;
      }
      case [true, true]: {
        tagTemp = [1, 7];
        break;
      }
      case [false, false]: {
        tagTemp = [0];
        break;
      }
      default:
        tagTemp = [0];
    }
    return tagTemp;
  };

  // Danh sách địa chỉ kho
  const menu = () => {
    const lstItemAddress = [];
    LIST_ADDRESS_WAREHOUSE.map((element, index) => {
      let objectInItems = {
        label: element.name,
        key: element.id,
      };
      return lstItemAddress.push(objectInItems);
    });
    return (
      <Menu onClick={handleChoooseAddressWarehouse} items={lstItemAddress} />
    );
  };

  // Xử lý khi thay đổi địa chỉ kho
  const handleChoooseAddressWarehouse = (e) => {
    LIST_ADDRESS_WAREHOUSE.forEach((element) => {
      if (element.id === e.key) {
        setDataOrder({
          ...dataOrder,
          pick_province: element.province,
          pick_district: element.district,
          pick_ward: element.ward,
          pick_address: element.address,
          pick_tel: element.tel,
        });
      }
    });
  };

  // Xử lý duyệt đơn hàng
  const handlePostGHTK = async () => {
    setIsPosting(true);
    try {
      const dataToPost = {
        products: productsInOrder,
        order: dataOrder,
      };

      const resDataPost = await GHTKAPI.postOrder(JSON.stringify(dataToPost));

      // Đăng đơn hàng thành công
      if (resDataPost.success) {
        try {
          // Chuyển trạng thái đơn hàng sang ACCEPT
          await ordersAPI.changeStatusProduct(dataOrder.id, ACCEPT);
          setIsPosting(false);
          toastr.success(
            "Duyệt đơn thành công, đơn hàng sẽ được chuyển sang trạng thái đang chờ đóng."
          );
          history.push({
            pathname: "/orders",
          });
        } catch (error) {
          setIsPosting(false);
          toastr.warning(
            "Đăng đơn thành công nhưng chuyển trạng thái đơn hàng không thành công."
          );
        }
      } else {
        setIsPosting(false);
        toastr.warning(
          "Quá trình đăng đơn lên GHTK chưa hoàn tất!",
          resDataPost.message
        );
      }
    } catch (e) {
      toastr.warning("Quá trình đăng đơn lên GHTK chưa hoàn tất!");
    }
  };

  // Xử lý khi update weight (để sau)
  // const updateWeight = (text) => {
  //   //setDataToUpdateWeight(text);
  //   setIsVisibleModalWeight(true);
  // };

  // Xử lý khi thay đổi các thông tin của đơn hàng
  const handleChangeDataInput = (event) => {
    setDataOrder({
      ...dataOrder,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="linear">
            <ColoredLinearProgress />
          </div>
        </>
      ) : (
        <div className="bill-container">
          <h2>Giao hàng tiết kiệm #{dataOrder.pick_name}</h2>
          <div className="bill-detail">
            <div className="child-info">
              <h3>Thông tin địa điểm lấy hàng</h3>
              <div className="dropdown-address">
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Space>
                    Chọn địa chỉ lấy hàng
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </div>
              <Form layout="inline" form={form}>
                <div className="item-container">
                  <Form.Item>
                    <Form.Item label="Tỉnh/Thành Phố"></Form.Item>
                    <Input
                      placeholder="nhập tỉnh/thành phố"
                      value={dataOrder.pick_province}
                      name="pick_province"
                      onChange={handleChangeDataInput}
                    />
                  </Form.Item>
                </div>
                <div className="item-container">
                  <Form.Item label="Quận/Huyện"></Form.Item>
                  <Input
                    placeholder="nhập quận/huyện"
                    value={dataOrder.pick_district}
                    name="pick_district"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Phường/xã"></Form.Item>
                  <Input
                    placeholder="nhập phường/xã"
                    value={dataOrder.pick_ward}
                    name="pick_ward"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Địa chỉ chi tiết"></Form.Item>
                  <Input
                    placeholder="nhập địa chỉ chi tiết"
                    value={dataOrder.pick_address}
                    name="pick_address"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Số điện thoại"></Form.Item>
                  <Input
                    placeholder="nhập số điện thoại"
                    value={dataOrder.pick_tel}
                    name="pick_tel"
                    onChange={handleChangeDataInput}
                  />
                </div>
                {/* </div> */}
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Thông tin địa điểm giao hàng</h3>
              <div className="dropdown-address"></div>
              <Form layout="inline" form={form}>
                {/* <div className="inline"> */}
                <div className="item-container">
                  <Form.Item label="Họ tên người nhận"></Form.Item>
                  <Input
                    placeholder="nhập họ tên người nhận"
                    value={dataOrder.name}
                    name="name"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Tỉnh/Thành Phố"></Form.Item>
                  <Input
                    placeholder="nhập tỉnh/thành phố"
                    value={dataOrder.province}
                    name="province"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Quận/Huyện"></Form.Item>
                  <Input
                    placeholder="nhập quận/huyện"
                    value={dataOrder.district}
                    name="district"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Phường/xã"></Form.Item>
                  <Input
                    placeholder="nhập phường/xã"
                    value={dataOrder.ward}
                    name="ward"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Địa chỉ chi tiết"></Form.Item>
                  <Input
                    placeholder="nhập địa chỉ chi tiết"
                    value={dataOrder.address}
                    name="address"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Số điện thoại"></Form.Item>
                  <Input
                    placeholder="nhập số điện thoại"
                    value={dataOrder.tel}
                    name="tel"
                    onChange={handleChangeDataInput}
                  />
                </div>
                {/* </div> */}
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Thông tin bổ sung cho đơn hàng GHTK</h3>
              <div className="dropdown-address"></div>
              <Form layout="inline" form={form}>
                {/* <div className="inline"> */}
                <div className="item-container-info-ship">
                  <Form.Item label=" Tên thôn/ấp/xóm/tổ/… của người nhận hàng hóa (nếu không có, vui lòng điền “Khác”)"></Form.Item>
                  <Input
                    placeholder="nhập tên thôn/ấp/xóm/tổ/"
                    value={dataOrder.hamlet}
                    name="hamlet"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Miễn phí ship (1: yes, 0: no)"></Form.Item>
                  <Input
                    placeholder="0 or 1"
                    value={dataOrder.is_freeship}
                    name="is_freeship"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Phương thức vận chuyển (road: bộ, fly: bay)"></Form.Item>
                  <Input
                    placeholder="road or fly"
                    value={dataOrder.transport}
                    name="transport"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Hình thức gửi hàng (cod: gửi hàng tại kho, post: gửi hàng tại bưu cục"></Form.Item>
                  <Input
                    placeholder="cod or post"
                    value={dataOrder.pick_option}
                    name="pick_option"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Sử dụng phương thức vận chuyển xfast (xteam: xfast,none: không sử dụng xfast)"></Form.Item>
                  <Input
                    placeholder="xteam or none"
                    value={dataOrder.deliver_option}
                    name="deliver_option"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Giá trị đơn hàng"></Form.Item>
                  <Input
                    placeholder="nhập giá trị đơn hàng"
                    value={dataOrder.pick_money}
                    name="pick_money"
                    onChange={handleChangeDataInput}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Phí ship và phí bảo hiểm (nếu có)"></Form.Item>
                  <Input
                    placeholder="nhập phí"
                    value={billData.priceShip}
                    disabled
                  />
                </div>
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Danh sách sản phẩm của đơn hàng</h3>
              <Table
                dataSource={billData.billDetail}
                columns={columns}
                rowKey="id"
                footer={Footer}
                bordered
              ></Table>
            </div>
          </div>

          <Button
            type="primary"
            onClick={handlePostGHTK}
            className="btn-submit"
            loading={isPosting}
          >
            Đăng đơn hàng lên GHTK
          </Button>

          {/* <Modal
            title="Cập nhật lại khối lượng "
            visible={isVisibleModalWeight}
            onOk={() => {
              console.log("update weight");
            }}
            onCancel={() => {
              setIsVisibleModalWeight(false);
            }}
          >
            <p>Cân nặng hiện tại: 1kg</p>
            <p>
              Cân nặng muốn chỉnh sửa:
              <input
                type="number"
                className="inputNum"
                // value={numExport}
                min="0"
                onChange={(e) => console.log(e.target.value)}
              ></input>
            </p>
          </Modal> */}
        </div>
      )}
    </>
  );
}
