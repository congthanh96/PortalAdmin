import React, { useState } from "react";
import { Card, Col, Row, Modal } from "antd";
import { toastr } from "react-redux-toastr";
import { productAPI } from "../../APIs";
import {
  EditOutlined,
  //   EllipsisOutlined,
  //   SettingOutlined,
} from "@ant-design/icons";
import "./variantCart.css";
const { Meta } = Card;
const variantCartImport = ({ variantProductData, name, updateVariant }) => {
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [isModalImportVisible, setIsModalImportVisible] = useState(false);
  const [numImport, setNumImport] = useState(0);

  async function importMountVariant() {
    try {
      if (numImport === 0 || numImport === "") {
        toastr.warning("Bạn chưa nhập số lượng sản phẩm muốn thêm!");
        return;
      }
      const numAfterUpdate = dataToUpdate.count + parseInt(numImport);
      if (numAfterUpdate < 0) {
        toastr.warning("Số lượng hàng trong kho của sản phẩm không đủ!");
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      await productAPI.updateMountVariantProduct(JSON.stringify(dataUpdate));
      setIsModalImportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumImport(0);
      toastr.success("Nhập hàng thành công");
    } catch (error) {
      setIsModalImportVisible(false);
      toastr.error("Nhập hàng thất bại");
    }
  }

  function updateAmountVariantProduct(id, count) {
    let temp = (variantProductData) => {
      return variantProductData.map((row, index) =>
        row.id === id ? { ...row, count: count } : row
      );
    };
    console.log(temp);
    // let temp2= {...variantProductData,dat}
    updateVariant(temp);
  }
  return (
    <div className="card">
      <div className="site-card-wrapper">
        <h2>Thêm hàng cho sản phẩm: {name}</h2>
        <hr />
        <h3>Phân loại theo: {variantProductData[0].propertyName}</h3>
        <Row gutter={16}>
          {variantProductData.map((element, index) => {
            return (
              <Col span={8} style={{ marginBottom: 10 }} key={index}>
                <Card
                  style={{backgroundColor:"Azure"}}
                  className="cardContainer"
                  cover={<img alt="example" src={element.imageLink} />}
                  actions={[
                    // <SettingOutlined
                    //   key="setting"
                    // />,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        console.log("edit");
                        setIsModalImportVisible(true);
                        setDataToUpdate(element);
                      }}
                    />,
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    title={element.propertyName + ": " + element.propertyValue}
                    description={"Số lượng hàng hiện tại: " + element.count}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      {/* Form thêm hàng */}
      <Modal
        title="Nhập hàng"
        visible={isModalImportVisible}
        onOk={() => {
          importMountVariant();
        }}
        onCancel={() => {
          setIsModalImportVisible(false);
        }}
      >
        <p>Số lượng hàng hiện tại: {dataToUpdate.count} </p>
        <p>
          Số lượng hàng thêm vào:
          <input
            type="number"
            className="inputNum"
            value={numImport}
            min="0"
            onChange={(e) => setNumImport(e.target.value)}
          ></input>
        </p>
      </Modal>
    </div>
  );
};

export default variantCartImport;
