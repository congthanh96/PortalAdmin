import React, { useState, useCallback, useEffect, Fragment } from "react";
import "./dynamicForm.css";


const InfoTransactions = ({
  listUser,
  setGetInput
}) => {
  const [inputFields, setInputFields] = useState([
    {
      codeSeller: "",
      money: "",
      content: ""
    },
  ]);
  const [infoUser, setInfoUser] = useState('Chưa có thông tin Seller');
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
    if (event.target.name === 'money') {
      values[index][event.target.name] = event.target.value * 1;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    
    setInputFields(values);
    setTimeout(() => {
      setGetInput(values[0]);
      if (event.target.name === 'codeSeller') {
        requestSearch(event.target.value);
      }
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };




  const requestSearch = (searchedVal) => {
    
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
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="Code Seller- Name">Code Seller</label>
                <input
                  type="text"
                  className="form-control"
                  id="codeSeller"
                  name="codeSeller"
                  value={inputField.codeSeller}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder={"Mã cộng tác viên - code"}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Số tiền- Money">Số tiền</label>
                <input
                  type="text"
                  className="form-control"
                  id="money"
                  name="money"
                  value={inputField.money}
                  onChange={(event) => handleInputChange(index, event)}
                   placeholder={"Số tiền - vnd"}
                />
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="Ghi chú- Content">Ghi chú</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  value={inputField.content}
                  onChange={(event) => handleInputChange(index, event)}
                   placeholder={"Ghi chú"}
                />
              </div>
              

            </Fragment>
          ))}
        </div>
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
        <pre>{JSON.stringify(infoUser, null, 2)}</pre>
      </form>
    </>
  );
};
export default InfoTransactions;
