import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { Fragment, useEffect, useState } from "react";
import "./infoGHTK.css";

const StatusGHTK = ({
  getInput,
  setGetInput,
  orderDetail,
  isCheckPriceShippingGHTK,
  dataGHTK,
  setDataGHTK2,
}) => {
  console.log(dataGHTK);
  useEffect(() => {
    setInputFields(dataGHTK);
    console.log(dataGHTK);
  }, [dataGHTK]);
  const [inputFields, setInputFields] = useState(dataGHTK || []);
  const [infoUser, setInfoUser] = useState("Chưa có thông tin Seller");
  const [searched, setSearched] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "money") {
      values[index][event.target.name] = event.target.value * 1;
    } else if (event.target.name === "tag1") {
      if (values[index].tags.indexOf(0) !== -1) {
        values[index].tags.splice(values[index].tags.indexOf(0));
      }

      if (event.target.checked === true) {
        values[index].tags.push(1);
      } else {
        values[index].tags.splice(values[index].tags.indexOf(1));
      }
    } else if (event.target.name === "tag7") {
      if (values[index].tags.indexOf(0) !== -1) {
        values[index].tags.splice(values[index].tags.indexOf(0));
      }
      if (event.target.checked === true) {
        values[index].tags.push(7);
      } else {
        values[index].tags.splice(values[index].tags.indexOf(7));
      }
    } else {
      values[index][event.target.name] = event.target.value;
    }

    setInputFields(values);
    setTimeout(() => {
      setGetInput(values[0]);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const requestSearch = (searchedVal) => {
    var listUser = [];
    const filteredRows = listUser.filter((row) => {
      return row.code?.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setInfoUser(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-between form-row">
          {inputFields &&
            inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="form-group col-sm-4">
                  <label htmlFor="ID đơn hàng- idBill">ID đơn hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={inputField.id}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"ID đơn hàng"}
                  />
                </div>

                <h5>Thông tin điểm lấy hàng</h5>

                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Tên đơn hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_name"
                    name="pick_name"
                    value={inputField.pick_name}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ lấy hàng- pick_address">
                    Địa chỉ chi tiết
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_address"
                    name="pick_address"
                    value={inputField.pick_address}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ lấy hàng"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ lấy hàng- pick_province">
                    Tỉnh/ Thành phố
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_province"
                    name="pick_province"
                    value={inputField.pick_province}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ lấy hàng tỉnh/ thành phố"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ lấy hàng- pick_address">
                    Quận/ huyện
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_district"
                    name="pick_district"
                    value={inputField.pick_district}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ lấy hàng quận/ huyện"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ lấy hàng- pick_address">
                    Xã/ phường
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_ward"
                    name="pick_ward"
                    value={inputField.pick_ward}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ lấy hàng xã/ phường"}
                  />
                </div>

                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ lấy hàng- pick_address">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_tel"
                    name="pick_tel"
                    value={inputField.pick_tel}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Lấy hàng - SDT"}
                  />
                </div>

                <h6>Thông tin điểm giao hàng</h6>

                <div className="form-group col-sm-4">
                  <label htmlFor="Tên người nhận hàng- Name">
                    Tên người nhận
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={inputField.name}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Tên người nhận hàng"}
                  />
                </div>

                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ nhận hàng- address">
                    Địa chỉ chi tiết
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={inputField.address}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ nhận hàng"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ nhận hàng - province">
                    Tỉnh/ Thành phố
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="province"
                    name="province"
                    value={inputField.province}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ nhận hàng tỉnh/ thành phố"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ nhận hàng- district">
                    Quận/ huyện
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="district"
                    name="district"
                    value={inputField.district}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ nhận hàng quận/ huyện"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ nhận hàng- ward">Xã/ phường</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ward"
                    name="ward"
                    value={inputField.ward}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Địa chỉ lấy hàng xã/ phường"}
                  />
                </div>

                <div className="form-group col-sm-4">
                  <label htmlFor="Địa chỉ nhận hàng- SĐT">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tel"
                    name="tel"
                    value={inputField.tel}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Lấy hàng - SDT"}
                  />
                </div>

                <h6> Các thông tin thêm GHTK</h6>

                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Hamlet</label>
                  <input
                    type="text"
                    className="form-control"
                    id="hamlet"
                    name="hamlet"
                    value={inputField.hamlet}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">is_freeship</label>
                  <input
                    type="text"
                    className="form-control"
                    id="is_freeship"
                    name="is_freeship"
                    value={inputField.is_freeship}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Hình thức vận chuyển</label>
                  <input
                    type="text"
                    className="form-control"
                    id="transport"
                    name="transport"
                    value={inputField.transport}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Hình thức vận chuyển</label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliver_option"
                    name="deliver_option"
                    value={inputField.deliver_option}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Hình thức vận chuyển</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_option"
                    name="pick_option"
                    value={inputField.pick_option}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Tổng tiền</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pick_money"
                    name="pick_money"
                    value={inputField.pick_money}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="Số tiền- Money">Tổng tiền</label>
                  <input
                    type="text"
                    className="form-control"
                    id="value"
                    name="value"
                    value={inputField.value}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={"Số tiền - vnd"}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <label htmlFor="Seller nhận được">Dễ vở</label>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inputField.tag1}
                        name="tag1"
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    }
                    label="Tag1 dễ vỡ"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inputField.tag7}
                        name="tag7"
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    }
                    label="Tag7 Nông sản/ thực phẩm khô"
                  />
                </div>
              </Fragment>
            ))}
        </div>
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
      </form>
    </>
  );
};
export default StatusGHTK;
