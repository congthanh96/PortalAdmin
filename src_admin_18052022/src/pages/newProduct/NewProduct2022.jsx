import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/notifications/Notifications'
import DynamicForms from '../../components/upload/dynamicForm/DynamicForms'
import UploadImage from '../../components/upload/images/UploadImage'
import { getCategory } from '../../reducers'
import ConfigAPI2022 from '../../utils/ConfigAPI2022'
import ConfigAPI8001 from '../../utils/ConfigAPI8001'
import ColoredLinearProgress from '../../_constants/UI/button/LineProgress'
import './newProduct.css'

export default function NewProduct() {
  const dispatch = useDispatch()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const user = useSelector((state) => state.auth.user)
  const isLoading = useSelector((state) => state.product.isLoading)
  const listCategory = useSelector((state) => state.product.category)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (listCategory?.length === 0) {
      dispatch(getCategory())
    }
  }, [listCategory])

  const [showResult, setShowResult] = useState(false)

  const [infoImageProduct, setInfoImageProduct] = useState()
  const checkFirst = useRef(true)
  const test = () => {
    setInfoImageProduct('213')

    test2(infoImageProduct)
  }

  const test2 = (value) => {
    console.log('123', value)
  }

  useEffect(() => {
    if (checkFirst.current) {
      checkFirst.current = false
      return
    }
    console.log(1)
  }, [infoImageProduct])

  // THÔNG TIN ĐIỀN Ở FORM 1/2
  const [infoProduct, setInfoProduct] = useState()

  const [commonVariant, setCommonVariant] = useState({})

  // số lượng variant.
  const [countVariant, setCountVariant] = useState(1)

  //Result = multiple link anh san pham

  // 0. LẤY THÔNG TIN NHẬP Ở FORM 1/2
  const getInfoProduct = (infoProduct, srcProduct) => {
    setInfoProduct(infoProduct[0])

    setInfoImageProduct(srcProduct)

    setInputs({
      ...inputs,
      dataVariant: infoProduct,
    })
  }

  // 3. LẤY THÔNG TIN Ở FORM 2/2
  const [savePath, setSavePath] = useState([])
  const [saveVariant, setSaveVariant] = useState([])
  const [saveStep, setSaveStep] = useState([])
  const getInfoVariant = (infoVariant, pathVariant) => {
    setSaveVariant(infoVariant)
    setSaveStep(infoVariant)
    setSavePath(pathVariant)
  }
  const [saveLinkImageVariant, setSaveLinkImageVariant] = useState([])

  const [step1, setStep1] = useState({})
  const [idProduct, setIdProduct] = useState('')

  // TẠO ẢNH SẢN PHẨM
  // TẠO SẢN PHẨM
  // TẠO ẢNH VARIANT.
  // TẠO VARIANT.
  const handleSubmitCreateProduct = async () => {
    console.log('1/4 ảnh sản phẩm =>', infoImageProduct)
    console.log('2/4 thông tin form 1/2 => tạo product', inputs)
    console.log('3/4 ảnh Variant =>', savePath)
    console.log('4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4', saveVariant)
    try {
      setLoading(true)

      return

      await uploadImageStep1()
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const API = `https://api.newee.asia:6001`

  // 1/4 UPLOAD ẢNH
  const uploadImageStep1 = () => {
    if (
      saveVariant.length === 0 ||
      infoImageProduct === undefined ||
      infoImageProduct?.length === 0
    ) {
      alert('Vui lòng chọn ảnh Sản phẩm / phân loại!')
      setLoading(false)
      return
    }

    var file = new FormData()
    file.append('File', infoImageProduct, infoImageProduct.name)
    file.append('Type', 'Product')
    console.log('upload Image Step1 =>', file)

    axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    })
      .then(function (response) {
        infoProduct.link = response.data
        createProductStep2(infoProduct)
        setStep1(infoProduct)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  // 2/4 CREATE PRODUCT
  const createProductStep2 = async (dataStep1) => {
    console.log('step1 with data-step2', dataStep1)
    console.log('step1 with data-step2', JSON.stringify(dataStep1))
    console.log('step1 with step2', step1)

    try {
      await axios(`${API}/Newee/ManagerProduct/Create`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${user}`,
        },
        method: 'POST',
        data: JSON.stringify(dataStep1),
      })
        .then((res) => {
          console.log(res)

          uploadListImageVariantStep3(res.data.data)
          setIdProduct(res.data.data.id)
        })
        .catch((err) => {
          console.log(err.response)
          setLoading(false)
          alert(err.response.data.errors)
        })
    } catch (err) {
      console.log(err)
      setLoading(false)
      alert(err.response.data.errors)
    }
  }
  // 3/4 UPLOAD LIST ẢNH
  const uploadListImageVariantStep3 = async (dataStep2) => {
    console.log('data Step 2', dataStep2)
    console.log('data Step 2 => id', dataStep2.id)

    var a = []
    savePath.forEach((element, index) => {
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
      })
        .then(function (response) {
          console.log('response ', response.data)
          a.push(response.data)
          saveVariant[index].imageLink = response.data
          saveVariant[index].productId = dataStep2.id
        })
        .catch((err) => {
          setLoading(false)
          console.log('error step3', err)
          alert('Tạo hình ảnh Variant không thành công!')
        })
      setSaveLinkImageVariant(a)
    })
    console.log('list Link Variant =>', a)
    setTimeout(() => {
      createListVariantStep4(saveVariant, dataStep2.id)
    }, 5000)
  }
  // 4/4 CREATE VARIANT
  const createListVariantStep4 = async (dataStep3, idProducts) => {
    console.log('createListVariantStep4 ', dataStep3)
    console.log('createListVariantStep4 ', JSON.stringify(dataStep3[0]))
    console.log('idProduct', idProducts)
    dataStep3.forEach((element) => {
      if (element.productId === '' || element.productId === undefined) {
        element.productId = idProducts
      }
      try {
        axios(`${API}/Newee/ManagerVariant/Create`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${user}`,
          },
          method: 'POST',
          data: JSON.stringify(element),
        })
          .then((res) => {
            console.log(res)

            setNotify({
              isOpen: true,
              message: 'Tạo phân loại sản phẩm thành công!',
              type: 'success',
            })
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response)

            setNotify({
              isOpen: true,
              message: 'Tạo phân loại sản phẩm không thành công!',
              type: 'success',
            })
            setLoading(false)
          })
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
        alert('Tạo phân loại không thành công!')
      }
    })
  }
  useEffect(() => {
    setNotify({
      isOpen: true,
      message: 'Khi thay đổi thông tin nhập ở #1 (1/3) luôn chọn lại Ảnh sản phẩm!',
      type: 'warning',
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // handleClick(inputss);
  }

  const [selectedCategory, setSelectedCategory] = useState('')

  // SELECT
  const [selectedProvince, setselectedProvince] = useState('')
  const [selectedTown, setselectedTown] = useState('')
  const initialTown = [{ label: 'Chọn Quận/Huyện', value: '1' }]
  const [getTowns, setGetTowns] = useState(initialTown)

  const townsFilter = useCallback(
    (name, key) => {
      if (name.target.value === '1') {
        setselectedTown('')
        // setSelectedCategory("");
      } else {
        setSelectedCategory(name.target.value)

        setselectedProvince(name.target.value)
        //  setSelectedCategory();
      }
    },

    [selectedProvince]
  )

  // DATA - STEP 1
  const [stepCreateProduct, setStepCreateProduct] = useState([{}])

  // STEP 1 - LOAD IMAGE
  const getImageProduct = (info) => {
    getInfoProduct(stepCreateProduct, info)
  }

  // STEP 1 - CHANGE INPUT

  const [inputs, setInputs] = useState({
    name: 'name',
    brand: 'brand',
    packingForm: 'packingform',
    description: 'description',
    categoryId: 'deed476c-e8ab-4786-8e7e-68f2fb7d70bc',
    productAsset: 'product asset',
    content1: 'content 1',
    content2: '',
    content3: '',
    link: '',
  })

  const [saveStep1, setSaveStep1] = useState({})

  const [dataImage, setDataImage] = useState({})

  const [saveListImage, setSaveListImage] = useState([])
  const [saveListVariant, setSaveListVariant] = useState([])

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  // STEP 1 - UPLOAD IMAGE
  const uploadImageProduct = async () => {
    if (
      saveVariant.length === 0 ||
      infoImageProduct === undefined ||
      infoImageProduct?.length === 0
    ) {
      alert('Vui lòng chọn ảnh Sản phẩm / phân loại!')
      setLoading(false)
      return
    }

    try {
      var file = new FormData()
      file.append('File', infoImageProduct, infoImageProduct.name)
      file.append('Type', 'Product')
      console.log('upload Image Step1 =>', file)

      ConfigAPI8001('upload-image', 'POST', file).then((response) => {
        inputs.link = response.data
        return response.data
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // STEP 2 - CREATE PRODUCT
  let idProducts = ''
  const createProduct = async () => {
    console.log('inputs', inputs)
    try {
      ConfigAPI2022('Newee/ManagerProduct/Create', 'POST', inputs).then((response) => {
        inputs.result = response.data.data

        return response.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  const CreateImageVariant = async (value, index, data) => {
    console.log('inputs', inputs)
    console.log('inputs', data)
    var file = new FormData()
    file.append('File', value.path, value.path.name)
    file.append('Type', 'Variant')

    const response = await axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    })

    saveStep[index].imageLink = response.data
    saveStep[index].productId = inputs.result.id ? inputs.result.id : data.result.id

    return response.data
  }

  // STEP 3 - CREATE LIST IMAGE VARIANT
  const createImageVariants = async () => {
    console.log('step 3 - ', inputs)
    console.log('step 3 - ', inputs.result.id)
    savePath.map((value, index) => {
      const response = CreateImageVariant(value, index, inputs)
      console.log('response Img', response)
      saveStep[index].productId = inputs.result.id

      const responseEnd = CreateVariant(index)
      console.log('respnose End ', responseEnd)
    })
  }

  const CreateVariant = async (index) => {
    console.log('create Variant', saveStep[index])
    ConfigAPI2022('Newee/ManagerVariant/Create', 'POST', saveStep[index])
      .then((response) => {
        console.log(response)
        setNotify({
          isOpen: true,
          message: `Tạo phân ${index} loại sản phẩm thành công!`,
          type: 'success',
        })
      })
      .catch((err) => {
        console.log('value -- ', index, saveStep[index])
        console.log('err', err)
      })
  }

  const handleSubmit2022 = async () => {
    setLoading(true)
    console.log('1/4 ảnh sản phẩm =>', infoImageProduct)
    console.log('2/4 thông tin form 1/2 => tạo product', inputs)
    console.log('3/4 ảnh Variant =>', savePath)
    console.log('4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4', saveStep)
    try {
      await uploadImageProduct()
      await createProduct()
      await createImageVariants()
      // await createListVariants()
      setNotify({
        isOpen: true,
        message: `Tạo sản phẩm thành công, quay lại sản phẩm để kiểm tra!`,
        type: 'success',
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const [data, setData] = useState({
    name: 'name',
    brand: 'brand',
    packingForm: 'packingform',
    description: 'description',
    categoryId: 'deed476c-e8ab-4786-8e7e-68f2fb7d70bc',
    productAsset: 'product asset',
    content1: 'content 1',
    content2: '',
    content3: '',
    link: 'https://api.newee.asia:8001/Photos/Product/637839829390380030.jpg',
    result: {
      id: '40512993-d571-4f65-880a-f14802b53e7d',
      name: 'name',
      brand: 'brand',
      link: '',
      packingForm: 'packingform',
      price1: 0,
      price2: 0,
      priceSeller1: 0,
      priceSeller2: 0,
      description: 'description',
      categoryName: 'Bách Hóa',
      discount: 0,
      discountSeller: 0,
      productAsset: 'product asset',
      sku: null,
      discountMin: 0,
      discountMax: 0,
      content1: 'content 1',
      content2: '',
      content3: '',
      percent: 0,
      priceDiscountMin: 0,
      moneyReceived: 0,
      weigt: 0,
      tag1: false,
      tag7: false,
    },
  })

  const createPicture = async () => {
    if (
      saveVariant.length === 0 ||
      infoImageProduct === undefined ||
      infoImageProduct?.length === 0
    ) {
      alert('Vui lòng chọn ảnh Sản phẩm ở mục #1')
      setLoading(false)
      return
    }

    try {
      var file = new FormData()
      file.append('File', infoImageProduct, infoImageProduct.name)
      file.append('Type', 'Product')
      console.log('upload Image Step1 =>', file)

      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('tokenADMIN') ?? user}`,
        },
        method: 'POST',
        url: `https://api.newee.asia:8001/upload-image`,
        data: file,
      })

      return response.data
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const createProducts = async () => {
    console.log(inputs)
    try {
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('tokenADMIN') ?? user}`,
        },
        method: 'POST',
        url: `https://api.newee.asia:6001/Newee/ManagerProduct/Create`,
        data: JSON.stringify(inputs),
      })

      console.log(response)

      return response.data.data
    } catch (err) {
      console.log(err)
    }
  }

  const createPictureVariant = async (value, index, response2) => {
    try {
      var file = new FormData()
      file.append('File', value.path, value.path.name)
      file.append('Type', 'Variant')

      const response = await axios({
        url: 'https://api.newee.asia:8001/upload-image',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: file,
      })
        .then((response) => {
          saveStep[index].imageLink = response.data
          saveStep[index].productId = response2.id

          return saveStep[index]
        })
        .then((res) => {
          axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('tokenADMIN') ?? user}`,
            },
            method: 'POST',
            url: `https://api.newee.asia:6001/Newee/ManagerVariant/Create`,
            data: JSON.stringify(res),
          }).then((response) => {
            console.log(response)
          })
        })
    } catch (error) {
      console.log('erorr', error)
    }
  }
  const createVariants = async (response2) => {
    savePath.map((value, index) => {
      const response = createPictureVariant(value, index, response2)
    })

    console.log('end !')

    return
  }
  const [dataVariant, setDataVariant] = useState([
    {
      PropertyName: '20',
      PropertyValue: '20',
      productId: '',
      price: 1000000000,
      priceSeller: 0,
      moneyReceived: 100000000,
      percent: 10,
      count: 30,
      sku: '20',
      imageLink: 'https://api.newee.asia:8001/Photos/Product/637839829390380030.jpg',
    },
    {
      PropertyName: '20',
      PropertyValue: '30',
      productId: '',
      price: 40000000,
      priceSeller: 0,
      moneyReceived: 4000000,
      percent: 10,
      count: 40,
      sku: '30',
      imageLink: 'https://api.newee.asia:8001/Photos/Product/637637947921785375.jpg',
    },
    {
      PropertyName: '20',
      PropertyValue: '40',
      productId: '',
      price: 20000000,
      priceSeller: 0,
      moneyReceived: 2000000,
      percent: 10,
      count: 50,
      sku: '40',
      imageLink: 'https://api.newee.asia:8001/Photos/Product/637800133108220777.jpg',
    },
  ])

  const handleSubmitFull = async () => {
    setLoading(true)
    try {
      console.log('đã chạy!')

      const response1 = await createPicture()
      inputs.link = response1

      const response2 = await createProducts()
      await createVariants(response2)

      setNotify({
        isOpen: true,
        message: `Tạo sản phẩm và phân loại thành công!`,
        type: 'success',
      })

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className="container-content">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle py-1">Thêm sản phẩm mới! #25032022</h1>
          <div className="container-body">
            <div className="container-content mb2">{JSON.stringify(inputs)}</div>
            <div className="container-content mb2">{JSON.stringify(saveStep)}</div>
            {/* <div className="container-content mb2">{JSON.stringify(data)}</div> */}
            {/* <div className="container-content mb2">{JSON.stringify(dataVariant)}</div> */}

            <div className="container-content mb-2">
              <label>#1 - Tạo sản phẩm (1/3)</label>
              <form className="addProductForm">
                <form onSubmit={handleSubmit}>
                  <div className="container-space-between form-row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="Tên sản phẩm- Name">Tên sản phẩm- Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={inputs.name || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="Thương hiệu - Brand">Thương hiệu - Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={inputs.brand || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="Packing Form">Đơn vị tính - Packing Form</label>
                      <input
                        type="text"
                        className="form-control"
                        id="packingForm"
                        name="packingForm"
                        value={inputs.packingForm || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-sm-6">
                      <label> Danh mục sản phẩm - Category Id</label>
                      <select
                        className="form-select"
                        onClick={(value, key) => townsFilter(value, key)}
                        onTouchStart={(value, key) => townsFilter(value, key)}
                        onChange={(value, key) => townsFilter(value, key)}
                      >
                        <option value="1">Chọn danh mục sản phẩm.</option>
                        {listCategory.map((value, key) => {
                          return (
                            <option value={value.id} key={key}>
                              {value.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="productAsset">Link tài liệu - ProductAsset</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productAsset"
                        name="productAsset"
                        value={inputs.productAsset || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-sm-12 desc">
                      <label htmlFor="Description">Mô tả sản phẩm - Description</label>

                      <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={inputs.description || ''}
                        onChange={handleChange}
                        style={{ height: '30vh', maxWidth: 920 }}
                        defaultValue={''}
                      />
                    </div>

                    <div className="form-group col-sm-3 content">
                      <label htmlFor="content1">Content 1</label>

                      <textarea
                        type="text"
                        className="form-control"
                        id="content1"
                        name="content1"
                        value={inputs.content1 || ''}
                        onChange={handleChange}
                        style={{ height: '30vh', maxWidth: 920 }}
                        defaultValue={''}
                      ></textarea>
                    </div>
                    <div className="form-group col-sm-3 content">
                      <label htmlFor="content2">Content 2</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="content2"
                        name="content2"
                        value={inputs.content2 || ''}
                        onChange={handleChange}
                        style={{ height: '30vh', maxWidth: 920 }}
                        defaultValue={''}
                      ></textarea>
                    </div>
                    <div className="form-group col-sm-3 content">
                      <label htmlFor="content3">Content 3</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="content3"
                        name="content3"
                        value={inputs.content3 || ''}
                        onChange={handleChange}
                        style={{ height: '30vh', maxWidth: 920 }}
                        defaultValue={''}
                      ></textarea>
                    </div>

                    <UploadImage handleClick={getImageProduct} />
                  </div>
                  {showResult && <pre>{JSON.stringify(inputs, null, 2)}</pre>}
                </form>
              </form>
            </div>

            <div className="container-content mb-2">
              <label>#2 - Tạo phân loại (2/3)</label>

              <DynamicForms
                common={commonVariant || []}
                setCountVariant={setCountVariant || null}
                getDataVariant={getInfoVariant}
              />
            </div>
            <div className="container-content mb-2">
              <label>#3 - Hoàn thành (3/3)</label>
              <button
                type="button"
                className="addProductButton createProductButton"
                onClick={handleSubmitFull}
              >
                Tạo sản phẩm
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
