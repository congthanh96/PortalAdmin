import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Multiple from '../images/MultipleImage'
import './dynamicForms.css'
const DynamicForms = ({ common, setCountVariant, getDataVariant, dataVariantRow }) => {
  const [inputFields, setInputFields] = useState([
    {
      PropertyName: common[0]?.PropertyName || '',
      PropertyValue: common[0]?.PropertyValue || '',
      productId: '',
      price: 0,
      priceSeller: 0,
      moneyReceived: 0,
      percent: 0,

      count: 0,
      sku: '',
      imageLink: '',
    },
  ])

  const handleAddFields = () => {
    const values = [...inputFields]
    values.push({
      PropertyName: inputFields[0].PropertyName || '',
      PropertyValue: '',

      productId: '',
      price: 0,
      priceSeller: 0,
      moneyReceived: 0,
      percent: 0,

      count: 0,
      sku: '',
      imageLink: '',
    })
    setInputFields(values)

    setCountVariant(values.length + 1)
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  const handleInputChange = (index, event) => {
    const values = [...inputFields]
    if (
      event.target.name === 'price' ||
      event.target.name === 'priceSeller' ||
      event.target.name === 'moneyReceived' ||
      event.target.name === 'count'
    ) {
      values[index][event.target.name] = event.target.value * 1
    } else if (event.target.name === 'percent') {
      values[index][event.target.name] = event.target.value * 1
      inputFields[index].moneyReceived = (event.target.value * 1 * inputFields[index].price) / 100
    } else {
      values[index][event.target.name] = event.target.value
    }
    setInputFields(values)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await uploadImageProductVariant()
    } catch (err) {
      console.log(err)
    }
  }

  const [infoImageProduct, setInfoImageProduct] = useState()
  const [resImageProductVariant, setResImageProductVariant] = useState([])

  const [savePath, setSavePath] = useState([])
  const [saveResponseImg, setSaveResponseImg] = useState([])
  const [isRender, setIsRender] = useState(false)
  const getImageProduct = (index, info) => {
    console.log('path', index)
    console.log('path', index, info)
    setInfoImageProduct(info)

    if (index === savePath[index]?.index) {
      alert('may da co')
      savePath[index].path = info
      return
    } else {
      setSavePath([...savePath, { index: index, path: info }])
    }
    getDataVariant(savePath)
    console.log('save path', savePath)
  }

  //Result = list link anh variant
  const uploadImageProductVariant = async () => {
    if (savePath.length === 0) {
      alert('Vui lòng chọn ảnh Phân loại!')
      return
    }

    var a = []
    savePath.forEach((element) => {
      var file = new FormData()
      file.append('File', element.path, element.path.name)
      file.append('Type', 'Variant')

      console.log(file)
      axios({
        url: 'https://api.newee.asia:8001/upload-image',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: file,
      }).then(function (response) {
        // alert(response.data);
        console.log('response ', response.data)
        a.push(response.data)

        inputFields[element.index].imageLink = response.data
      })
      setSaveResponseImg(a)
      setIsRender(!isRender)
    })
  }

  useEffect(() => {
    getDataVariant(inputFields, savePath)
  }, [savePath])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-space-left left form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}-dynamic-forms`}>
              <div className="form-index">{index + 1}</div>
              <div className="form-group col-sm-3 mt">
                <label htmlFor="lastName">Nhóm phân loại</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyName"
                  name="PropertyName"
                  value={inputField.PropertyName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="lastName">Giá trị thuộc tính</label>
                <input
                  type="text"
                  className="form-control"
                  id="PropertyValue"
                  name="PropertyValue"
                  value={inputField.PropertyValue}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="">SKU</label>
                <input
                  type="text"
                  className="form-control"
                  id="sku"
                  name="sku"
                  value={inputField.sku}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="Số lượng">Số lượng</label>
                <input
                  type="text"
                  className="form-control"
                  id="count"
                  name="count"
                  value={Number(inputField.count).toString()}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="Giá niêm yết">Giá niêm yết</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={Number(inputField.price).toString()}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3">
                <label htmlFor="Chiết khấu %">Chiết khấu %</label>
                <input
                  type="text"
                  className="form-control"
                  id="percent"
                  name="percent"
                  value={Number(inputField.percent).toString()}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-3 ml">
                <label htmlFor="Seller nhận được">Seller nhận được VNĐ</label>
                <input
                  type="text"
                  className="form-control"
                  id="moneyReceived"
                  name="moneyReceived"
                  value={Number(inputField.moneyReceived).toString()}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              {/* <Images /> */}

              <div className="form-group col-sm-9 button">
                <button
                  className="btn btn-link plus"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
              </div>
              <div className="line-break"></div>
              <br />
            </Fragment>
          ))}
        </div>
        <h4 className="mb">Ảnh phân loại</h4>
        <div className="container-list-img-variant">
          {inputFields &&
            inputFields.map((value, key) => (
              <Multiple handleClick={getImageProduct} key={key} index={key} />
            ))}
        </div>
      </form>
    </>
  )
}
export default DynamicForms
