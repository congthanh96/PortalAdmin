import React, { useState, Fragment } from "react";
import "./dynamicCommon.css";
const DynamicCommon = ({ handleClick }) => {
  const [inputFields, setInputFields] = useState([
    {
      PropertyName: "",
      PropertyValue: "",
    },
  ]);

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
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
    handleClick(inputFields);
  };

  return (
    <>
      {/* <h1>Thêm phân loại sản phẩm</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="container-space-between form-row col">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="firstName">Nhóm phân loại</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyName"
                  name="PropertyName"
                  value={inputField.PropertyName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="submit-button">
                <button
                  className="btn btn-primary mr-2 mb-2"
                  type="button"
                  onClick={handleSubmit}
                >
                  Thêm giá trị phân loại
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      </form>
    </>
  );
};
export default DynamicCommon;
