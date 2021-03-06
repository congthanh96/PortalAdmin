import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../components/notifications/Notifications'
import DynamicForms from '../../components/upload/dynamicForm/DynamicForms'
import InfoProduct from '../../components/upload/dynamicForm/InfoProduct'
import { createProducts, createVariant, getCategory, uploadImage } from '../../reducers'
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

  const isCreate = useSelector((state) => state.product.createProduct)

  const [loading, setLoading] = useState(false)
  const onClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000) //3 seconds
  }
  useEffect(() => {
    if (listCategory?.length === 0) {
      dispatch(getCategory())
    }
  }, [listCategory])

  // 1. upload image Product => link image ?
  // 2. upload info Product => id Product ?
  // 3. upload variant => id variant ?

  // 1- upload ảnh sản phẩm. (chạy hàm get)
  // 1.1 get thông tin sản phẩm
  const [showResult, setShowResult] = useState(false)

  const [infoImageProduct, setInfoImageProduct] = useState()
  const [resImageProduct, setResImageProduct] = useState('')
  const [listResponseImageVariant, setListResponseImageVariant] = useState()

  // THÔNG TIN ĐIỀN Ở FORM 1/2
  const [infoProduct, setInfoProduct] = useState()
  // https://api.newee.asia:6001/Newee/ManagerProduct/Create
  const [variantProduct, setVariantProduct] = useState({
    ProductId: '',
    Price: '',
    PriceSeller: '',
    PropertyName: '',
    PropertyValue: '',
    sku: '',
    Count: '',
    imageLink: '',
    percent: '',
    moneyReceived: '',
  })
  // "https://api.newee.asia:6001/Newee/ManagerVariant/Create",

  const [propertyName, setPropertyName] = useState('')
  const [propertyValue, setPropertyValue] = useState('')
  const [variantProducts, setVariantProducts] = useState({})
  const [isVariant, setIsVariant] = useState(false)
  const [commonVariant, setCommonVariant] = useState({})

  // số lượng variant.
  const [countVariant, setCountVariant] = useState(1)

  const getImageProduct = (infoProduct, infoImage) => {
    setInfoImageProduct(infoImage)
  }
  //Result = multiple link anh san pham

  // 0. LẤY THÔNG TIN NHẬP Ở FORM 1/2
  const getInfoProduct = (infoProduct, srcProduct) => {
    setInfoProduct(infoProduct[0])

    setInfoImageProduct(srcProduct)
  }
  // 1. UPLOAD ẢNH => RES LINK
  //Result = link anh san pham
  const uploadImageProduct = () => {
    // alert("uploadImageProduct");
    var file = new FormData()

    file.append('File', infoImageProduct, infoImageProduct.name)
    file.append('Type', 'Product')

    axios({
      url: 'https://api.newee.asia:8001/upload-image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: file,
    }).then(function (response) {
      setResImageProduct(response.data)
      infoProduct[0].Link = response.data
    })
  }
  // 2. UPLOAD INFO PRODUCT => RES ID

  // =>> Result = ID sản phẩm

  const createInfoProduct = () => {}

  // 3. LẤY THÔNG TIN Ở FORM 2/2
  const [savePath, setSavePath] = useState([])
  const [saveVariant, setSaveVariant] = useState([])
  const getInfoVariant = (infoVariant, pathVariant) => {
    setSaveVariant(infoVariant)
    setSavePath(pathVariant)
  }
  const [saveLinkImageVariant, setSaveLinkImageVariant] = useState([])
  // 4. UPLOAD ẢNH VARIANT => RES saveVariant
  const uploadImageProductVariant = async () => {
    if (saveVariant.length === 0) {
      alert('Vui lòng chọn ảnh Phân loại!')
      return
    }

    var a = []
    savePath.forEach((element, index) => {
      var file = new FormData()
      file.append('File', element.path, element.path.name)
      file.append('Type', 'Variant')

      axios({
        url: 'https://api.newee.asia:8001/upload-image',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: file,
      }).then(function (response) {
        a.push(response.data)
        saveVariant[index].imageLink = response.data
      })

      setSaveLinkImageVariant(a)
    })
  }
  // 5. FINAL
  const final = async () => {
    // saveVariant.forEach((element, index) => {
    //   console.log("final", element);
    //   dispatch(createVariant(element));
    // });

    dispatch(createVariant(saveVariant))
  }

  // SUBMIT TẠO SẢN PHẨM
  const createProduct = async () => {
    try {
      await dispatch(uploadImage(infoImageProduct, infoProduct))
      await dispatch(createProducts(saveVariant))
      // await uploadImageProductVariant();
      // await final();
    } catch (err) {
      alert('that bai')
      // setLoading(false);
    }
  }

  const [step1, setStep1] = useState({})
  const [idProduct, setIdProduct] = useState('')

  const handleSubmitCreateProduct = async () => {
    console.log('1/4 ảnh sản phẩm =>', infoImageProduct)
    console.log('2/4 thông tin form 1/2 => tạo product', infoProduct)
    console.log('3/4 ảnh Variant =>', savePath)
    console.log('4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4', saveVariant)
    try {
      setLoading(true)
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
      console.log(element)
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
  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Thêm sản phẩm mới!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/3)</label>
              <form className="addProductForm">
                <InfoProduct
                  getDataProduct={getInfoProduct}
                  downCategory={listCategory}
                  showResult={showResult}
                  downData={infoProduct || null}
                />
              </form>
            </div>
            <div className="newProduct-variants">
              <label>#2 - Tạo phân loại (2/3)</label>

              <DynamicForms
                common={commonVariant || []}
                setCountVariant={setCountVariant || null}
                getDataVariant={getInfoVariant}
              />
            </div>
            <div className="newProduct-variants">
              <label>#3 - Hoàn thành (3/3)</label>
              <button
                type="button"
                className="addProductButton createProductButton"
                onClick={() => handleSubmitCreateProduct()}
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
