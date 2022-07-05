/**
 * Chi tiết variant
 */
import React, { useState } from "react";
import { Input, Spin, Form, Select } from "antd";
import TopPage from "../../Components/toppage/topPage";
import { useLocation } from "react-router";
import ButtonComponent from "../../Components/button/ButtonComponent";
import { imageAPI, variantProductAPI } from "../../APIs";
import { toast } from "react-toastify";
import "./variant.css";

const { Option } = Select;

const Variant = () => {
  let data = useLocation();
  const [form] = Form.useForm();
  const [dataVariant, setDataVariant] = useState(data.state);
  const [isLoading, setIsLoading] = useState(false);
  const [srcImage, setSrcImage] = useState(data.state.imageLink);
  const [isChange, setIsChange] = useState(false);
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/products",
      nameLink: "Danh sách sản phẩm",
    },
    {
      linkTo: "/product/" + data.state.productId,
      nameLink: "Chi tiết sản phẩm",
    },
    {
      linkTo: "",
      nameLink: "Chi tiết loại sản phẩm",
    },
  ];

  const handleChangeDataInput = (event) => {
    // console.log(event);
    setDataVariant({ ...dataVariant, [event.target.name]: event.target.value });
  };

  const handleDataSelectTag1 = (event) => {
    setDataVariant({ ...dataVariant, tag1: event });
    // console.log(event);
  };

  const handleDataSelectTag7 = (event) => {
    setDataVariant({ ...dataVariant, tag7: event });
  };

  const handleUpdateImgVariant = (event) => {
    setIsChange(true);
    const [file] = event.target.files;
    setSrcImage(URL.createObjectURL(file));
    setDataVariant({ ...dataVariant, imageLink: file });
  };

  const handleUpdateVariant = async () => {
    setIsLoading(true);
    let resUploadImage = dataVariant.imageLink;
    // console.log(dataVariant);
    try {
      if (isChange === true) {
        let dataForUploadImage = new FormData();
        dataForUploadImage.append("File", dataVariant.imageLink);
        dataForUploadImage.append("Type", "Variant");
        dataForUploadImage.append("Width", 244);
        dataForUploadImage.append("Height", 244);
        resUploadImage = await imageAPI.uploadImage(dataForUploadImage);
      }

      // console.log(resUploadImage);
      let data = JSON.stringify({
        id: dataVariant.id,
        price: parseFloat(dataVariant.price),
        priceSeller: parseFloat(dataVariant.priceSeller),
        moneyReceived: parseFloat(dataVariant.moneyReceived),
        percent: parseFloat(dataVariant.percent),
        propertyName: dataVariant.propertyName,
        propertyValue: dataVariant.propertyValue,
        count: parseFloat(dataVariant.count),
        sku: dataVariant.sku,
        imageLink: resUploadImage,
        weight: parseFloat(dataVariant.weight),
        tag1: dataVariant.tag1 === "true" ? true : false,
        tag7: dataVariant.tag7 === "true" ? true : false,
      });
      await variantProductAPI.updateVariant(data);
      setIsLoading(false);
      toast.success("Chỉnh sửa variant thành công");
    } catch (error) {
      setIsLoading(false);
      toast.error("Chỉnh sửa variant không thành công");
    }
  };

  return (
    <React.Fragment>
      <div className="variant-container">
        <Spin spinning={isLoading}>
          <TopPage dataProps={dataTop} />

          <div className="css-save">
            <ButtonComponent onClick={handleUpdateVariant}>Lưu</ButtonComponent>
          </div>
          <div className="css-container-variant">
            <Form layout="inline" form={form}>
              <div className="container-item-variant">
                <span className="css-label-variant">Tên phân loại *</span>
                <Input
                  placeholder="nhập tên"
                  className="css-input-item-variant"
                  value={dataVariant.propertyName}
                  name="propertyName"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Giá trị phân loại *</span>
                <Input
                  placeholder="nhập giá trị"
                  className="css-input-item-variant"
                  value={dataVariant.propertyValue}
                  name="propertyValue"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">SKU *</span>
                <Input
                  placeholder="nhập sku"
                  className="css-input-item-variant"
                  value={dataVariant.sku}
                  name="sku"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Số lượng *</span>
                <Input
                  placeholder="nhập số lượng"
                  className="css-input-item-variant"
                  min={0}
                  value={dataVariant.count}
                  name="count"
                  onChange={(event) => handleChangeDataInput(event)}
                  type="number"
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Giá niêm yết *</span>
                <Input
                  placeholder="nhập giá niêm yết"
                  className="css-input-item-variant"
                  value={dataVariant.price}
                  min={0}
                  name="price"
                  suffix="VND"
                  type="number"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Chiết khấu *</span>
                <Input
                  placeholder="nhập chiết khấu"
                  className="css-input-item-variant"
                  min={0}
                  value={dataVariant.percent}
                  name="percent"
                  onChange={(event) => handleChangeDataInput(event)}
                  type="number"
                  suffix="%"
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Khối lượng *</span>
                <Input
                  placeholder="nhập khối lượng"
                  className="css-input-item-variant"
                  value={dataVariant.weight}
                  min={0}
                  name="weight"
                  suffix="gam"
                  type="number"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant" style={{ width: 500 }}>
                  Seller nhận được *
                </span>
                <Input
                  placeholder="nhập số tiền"
                  className="css-input-item-variant"
                  min={0}
                  value={dataVariant.moneyReceived}
                  name="moneyReceived"
                  suffix="VND"
                  type="number"
                  onChange={(event) => handleChangeDataInput(event)}
                />
              </div>
              <div className="container-item-variant">
                <span className="css-label-variant">Hàng dễ vỡ *</span>
                <Select
                  defaultValue={dataVariant.tag1 ? "True" : "False"}
                  className="css-select-variant"
                  name="tag1"
                  onSelect={(event, name) => handleDataSelectTag1(event)}
                >
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
              </div>

              <div className="container-item-variant">
                <span className="css-label-variant">Hàng nông sản *</span>
                <Select
                  defaultValue={dataVariant.tag7 ? "True" : "False"}
                  className="css-select-variant"
                  name="tag7"
                  onSelect={(event, name) => handleDataSelectTag7(event)}
                >
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
              </div>
              <div className="container-item-variant" style={{ width: 800 }}>
                <span className="css-label-variant">Chọn hình ảnh *</span>
                {/* <image
                  class="custom-avt"
                  width={200}
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  fallback="data:image/png;base64,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"
                >
                  <div class="overlay">
                    <button>CAMERA</button>
                  </div>
                </image> */}
                <label htmlFor={"imgProduct"}>
                  <img
                    className="css-image-variant"
                    src={
                      srcImage ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    id={"imgProduct"}
                    style={{ display: "none" }}
                    onChange={(event) => handleUpdateImgVariant(event)}
                  />
                </label>
              </div>
            </Form>
          </div>
        </Spin>
      </div>
    </React.Fragment>
  );
};

export default Variant;
