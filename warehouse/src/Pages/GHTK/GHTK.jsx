import React, { useEffect, useState } from "react";
import { GHTKAPI } from "../../APIs";
import { DownOutlined } from "@ant-design/icons";
import ColoredLinearProgress from "../../Common/LineProgress";
import { Menu,Dropdown,Space, Input, Button,Form,Table } from "antd";
import { LIST_ADDRESS_WAREHOUSE } from "../../Common/constants";
import { formatVND } from "../../Utils/formatVND";
import "./ghtk.css";

export default function GHTK({ location }) {
  const { state } = location;
  // let { orderID } = useParams();
  const [form] = Form.useForm();
  const billData = JSON.parse(state);
  const [isLoading, setIsLoading] = useState(false);
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
    //pick_session: "string",
    tag: [],
  });
  //const [listPickAdd, setListPickAdd] = useState([]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      console.log(billData);
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
      console.log(error);
    }
  }, []);

  const getTagOfOrder = () => {
    let isFragile = false; // hàng dễ vỡ
    let isAgricultural = false; // hàng nông sản
    billData.billDetail.forEach((product) => {
      console.log(product.variantf.tag1);
      console.log(product.variantf.tag7);
      if (product.variantf.tag1) {
        isFragile = true;
      }
      if (product.variantf.tag7) {
        isAgricultural = true;
      }
    });
    console.log(isFragile, isAgricultural);
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
    console.log(tagTemp);
    // setDataOrder({
    //   ...dataOrder,
    //   tag: tagTemp,
    // });
    return tagTemp;
  };
  const menu = () => {
    const lstItemAddress = [];
    LIST_ADDRESS_WAREHOUSE.map((element, index) => {
      let objectInItems = {
        label: element.name,
        key: element.id,
      };
      lstItemAddress.push(objectInItems);
    });

    return <Menu onClick={handleMenuClick} items={lstItemAddress} />;
  };

  const handleMenuClick = (e) => {
    console.log(e.key + e.label);
    LIST_ADDRESS_WAREHOUSE.forEach((element) => {
      console.log(element.id);
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

  const onFormLayoutChange = () => {
    console.log("changeForm");
  };

  const handlePostGHTK = () => {
    console.log("data" + JSON.stringify(dataOrder));
  };

  const columns = [
    // {
    //   title: 'key',
    //   dataIndex: 'id',
    //   key: 'id'
    // },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Loại hàng',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Phân loại',
      dataIndex: 'variantName',
      key: 'variantName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: text =>formatVND(text)
    },
  ];
  return (
    //<React.Fragment>
    <>
      {isLoading ? (
        <>
          <div className="linear">
            <ColoredLinearProgress />
          </div>
        </>
      ) : (
        <div className="bill-container">
          <h2>Giao hàng tiết kiệm #{billData.code}</h2>
          <div className="bill-detail">
            <div className="child-info">
              <h3>Thông tin địa điểm lấy hàng</h3>
              <div className="dropdown-address">
                <Dropdown overlay={menu} placement="bottomLeft">
                  <a>
                    <Space>
                      Chọn địa chỉ lấy hàng
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <Form layout="inline" form={form}>
                <div className="item-container">
                  <Form.Item label="Tỉnh/Thành Phố"></Form.Item>
                  <Input
                    placeholder="nhập tỉnh/thành phố"
                    value={dataOrder.pick_province}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Quận/Huyện"></Form.Item>
                  <Input
                    placeholder="nhập quận/huyện"
                    value={dataOrder.pick_district}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Phường/xã"></Form.Item>
                  <Input
                    placeholder="nhập phường/xã"
                    value={dataOrder.pick_ward}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Địa chỉ chi tiết"></Form.Item>
                  <Input
                    placeholder="nhập địa chỉ chi tiết"
                    value={dataOrder.pick_address}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Số điện thoại"></Form.Item>
                  <Input
                    placeholder="nhập số điện thoại"
                    value={dataOrder.pick_tel}
                  />
                </div>
                {/* </div> */}
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Thông tin địa điểm giao hàng</h3>
              <div className="dropdown-address"></div>
              <Form
                layout="inline"
                form={form}
                onValuesChange={onFormLayoutChange}
              >
                {/* <div className="inline"> */}
                <div className="item-container">
                  <Form.Item label="Họ tên người nhận"></Form.Item>
                  <Input
                    placeholder="nhập họ tên người nhận"
                    value={dataOrder.name}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Tỉnh/Thành Phố"></Form.Item>
                  <Input
                    placeholder="nhập tỉnh/thành phố"
                    value={dataOrder.province}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Quận/Huyện"></Form.Item>
                  <Input
                    placeholder="nhập quận/huyện"
                    value={dataOrder.district}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Phường/xã"></Form.Item>
                  <Input placeholder="nhập phường/xã" value={dataOrder.ward} />
                </div>
                <div className="item-container">
                  <Form.Item label="Địa chỉ chi tiết"></Form.Item>
                  <Input
                    placeholder="nhập địa chỉ chi tiết"
                    value={dataOrder.address}
                  />
                </div>
                <div className="item-container">
                  <Form.Item label="Số điện thoại"></Form.Item>
                  <Input
                    placeholder="nhập số điện thoại"
                    value={dataOrder.tel}
                  />
                </div>
                {/* </div> */}
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Thông tin bổ sung cho đơn hàng GHTK</h3>
              <div className="dropdown-address"></div>
              <Form
                layout="inline"
                form={form}
                onValuesChange={onFormLayoutChange}
              >
                {/* <div className="inline"> */}
                <div className="item-container-info-ship">
                  <Form.Item label=" Tên thôn/ấp/xóm/tổ/… của người nhận hàng hóa (nếu không có, vui lòng điền “Khác”)"></Form.Item>
                  <Input
                    placeholder="nhập tên thôn/ấp/xóm/tổ/"
                    value={dataOrder.hamlet}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Miễn phí ship (1: yes, 0: no)"></Form.Item>
                  <Input placeholder="0 or 1" value={dataOrder.is_freeship} />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Phương thức vận chuyển (road: bộ, fly: bay)"></Form.Item>
                  <Input
                    placeholder="road or fly"
                    value={dataOrder.transport}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Hình thức gửi hàng (cod: gửi hàng tại kho, post: gửi hàng tại bưu cục"></Form.Item>
                  <Input
                    placeholder="cod or post"
                    value={dataOrder.pick_option}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Sử dụng phương thức vận chuyển xfast (xteam: xfast,none: không sử dụng xfast)"></Form.Item>
                  <Input
                    placeholder="xteam or none"
                    value={dataOrder.deliver_option}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Giá trị đơn hàng"></Form.Item>
                  <Input
                    placeholder="nhập giá trị đơn hàng"
                    value={dataOrder.pick_money}
                  />
                </div>
                <div className="item-container-info-ship">
                  <Form.Item label="Phí ship và phí bảo hiểm (nếu có)"></Form.Item>
                  <Input placeholder="nhập phí" value={billData.priceShip} />
                </div>
                {/* </div> */}
              </Form>
            </div>
            <hr />
            <div className="child-info">
              <h3>Danh sách sản phẩm của đơn hàng</h3>
              <Table dataSource={billData.billDetail} columns={columns} rowKey={billData.billDetail.id} footer={() => billData.totalPrice}></Table>
            </div>
            
          </div>
          <Button
          type="primary"
          onClick={handlePostGHTK}
          className = "btn-submit"
        >
          Đăng đơn hàng lên GHTK
        </Button>
        </div>
      )}
    </>
    //</React.Fragment>
  );
}
