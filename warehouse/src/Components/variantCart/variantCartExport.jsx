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
const variantCartExport = ({
  variantProductData,
  name,
  updateVariant,
  isImport,
  isExport,
}) => {
  const [dataToUpdate, setDataToUpdate] = useState("");
  const [isModalExportVisible, setIsModalExportVisible] = useState(false);
  const [numExport, setNumExport] = useState(0);

  // Bớt số lượng sản phẩm
  async function exportMountVariant() {
    try {
      if (numExport === 0 || numExport === "") {
        toastr.warning("Bạn chưa nhập số lượng sản phẩm muốn giảm!");
        return;
      }
      let numAfterUpdate = dataToUpdate.count - parseInt(numExport);
      if (numAfterUpdate < 0) {
        toastr.warning("Số lượng hàng trong kho của sản phẩm không đủ!");
        return;
      }
      const dataUpdate = { ...dataToUpdate, count: numAfterUpdate };
      setDataToUpdate(dataUpdate);
      await productAPI.updateMountVariantProduct(JSON.stringify(dataUpdate));
      setIsModalExportVisible(false);
      updateAmountVariantProduct(dataUpdate.id, dataUpdate.count);
      setNumExport(0);
      toastr.success("Xuất/hủy/trả hàng thành công");
    } catch (error) {
      setIsModalExportVisible(false);
      toastr.error("Xuất/hủy/trả hàng thất bại");
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
        <h2>Xuất/ trả/ hủy hàng cho sản phẩm: {name}</h2>
        <hr />
        <h3>Phân loại theo: {variantProductData[0].propertyName}</h3>
        <Row gutter={16}>
          {variantProductData.map((element, index) => {
            return (
              <Col span={8} style={{ marginBottom: 10 }} key={index}>
                <Card
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
                        setIsModalExportVisible(true);
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

      {/* Form bớt hàng */}
      <Modal
        title="Xuất hàng/ Hủy hàng/ Hàng hết hạn"
        visible={isModalExportVisible}
        onOk={() => {
          exportMountVariant();
        }}
        onCancel={() => {
          setIsModalExportVisible(false);
        }}
      >
        <p>Số lượng hàng hiện tại: {dataToUpdate.count}</p>
        <p>
          Số lượng hàng xuất ra:
          <input
            type="number"
            className="inputNum"
            value={numExport}
            min="0"
            onChange={(e) => setNumExport(e.target.value)}
          ></input>
        </p>
      </Modal>
    </div>
  );
};

export default variantCartExport;
