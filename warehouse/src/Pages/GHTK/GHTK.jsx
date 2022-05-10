import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GHTKAPI } from "../../APIs";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Label, OpenInNewOffTwoTone } from "@mui/icons-material";
import ColoredLinearProgress from "../../Common/LineProgress";
import { Form, Input, Button, Radio } from "antd";
import { LIST_ADDRESS_WAREHOUSE } from "../../Common/constants";
import "./ghtk.css";

export default function GHTK({ location }) {
  const { state } = location;
  let { orderID } = useParams();
  const [form] = Form.useForm();
  const [billData, setBillData] = useState(JSON.parse(state));
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder,setDataOrder] = useState({
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
    is_freeship: "1",
    pick_date: "2016-09-30",
    pick_money: 0,
    note: "string",
    value: 0,
    transport: "road",
    pick_option: "cod",
    deliver_option: "none",
    //pick_session: "string",
    tag: [
      0
    ]
  });
  //const [listPickAdd, setListPickAdd] = useState([]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      setDataOrder({...dataOrder,id:state.id,pick_name:state.code,tel:state.phone,name:state.fullName,address:state.address,province:state.tp,district:state.qh,ward:state.pXa,pick_money:state.totalPrice,note:state.note})
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const menu = () => {
    const lstItemAddress = [];
    LIST_ADDRESS_WAREHOUSE.map((element, index) => {
      let objectInItems = {
        label: element.name,
        key: element.id,
      };
      lstItemAddress.push(objectInItems);
    });

    return <Menu  onClick={handleMenuClick} items={lstItemAddress} />;
  };

  const handleMenuClick = (e) =>{
    console.log(e.key+e.label)
    LIST_ADDRESS_WAREHOUSE.forEach((element)=>{
      console.log(element.id)
      if(element.id===e.key)
      {
        setDataOrder({...dataOrder,pick_province:element.province,pick_district:element.district,pick_ward:element.ward,pick_address:element.address,pick_tel:element.tel})
      }
    })
  }

  const onFormLayoutChange = () => {
    console.log("changeForm");
  };

  const handlePostGHTK = () => {
    console.log("data"+JSON.stringify(dataOrder))
  } 
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
            <div>
              <h3>Thông tin địa điểm lấy hàng</h3>
              <div className="dropdown-address">

              <Dropdown overlay={menu} placement="bottomLeft" >
                <a>
                  <Space>
                    Chọn địa chỉ lấy hàng
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              </div>
              <Form
                // {...formItemLayout}
                // layout={formLayout}
                layout="inline"
                form={form}
                // style={{ marginTop: 20, width: "100%" }}
                //initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
              >
                {/* <div className="inline"> */}
                <div className="item-container">
                  <Form.Item label="Tỉnh/Thành Phố"></Form.Item>
                  <Input placeholder="nhập tỉnh/thành phố" />
                </div>
                <div className="item-container">
                  <Form.Item label="Quận/Huyện"></Form.Item>
                  <Input placeholder="nhập quận/huyện" />
                </div>
                <div className="item-container">
                  <Form.Item label="Phường/xã"></Form.Item>
                  <Input placeholder="nhập phường/xã" />
                </div>
                <div className="item-container">
                  <Form.Item label="Địa chỉ chi tiết"></Form.Item>
                  <Input placeholder="nhập địa chỉ chi tiết" />
                </div>
                <div className="item-container">
                  <Form.Item label="Số điện thoại"></Form.Item>
                  <Input placeholder="nhập số điện thoại" />
                </div>
                {/* </div> */}
              </Form>
            </div>
          </div>
          <Button onClick={handlePostGHTK}>submit</Button>
        </div>
      )}
    </>
    //</React.Fragment>
  );
}
