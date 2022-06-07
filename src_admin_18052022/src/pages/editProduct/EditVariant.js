import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import Notification from '../../components/notifications/Notifications'
import DynamicForms from '../../components/upload/dynamicForm/DynamicFormEditVariant'
import { getCategory } from '../../reducers'
import ColoredLinearProgress from '../../_constants/UI/button/LineProgress'
import './newProduct.css'

export default function AddVariant() {
  let productId = ''
  const history = useHistory()
  let { variantId } = useParams()
  const location = useLocation()

  const dataVariantRow = location.state?.dataVariantRow
  console.log(' fromDashboard ', dataVariantRow)
  console.log(' fromDashboard ', variantId)

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
  const [isRender, setIsRender] = useState(false)
  const onClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000) //3 seconds
  }
  useEffect(() => {
    if (listCategory?.length === 0) {
      dispatch(getCategory())
    }
  }, [listCategory])
  const RowVariant = () => {
    return (
      <div className="productList">
        <DataGrid
          // rows={variantProduct !== undefined ? variantProduct : []}
          rows={[
            {
              id: '0a4fd2fc-42d6-4c6f-89b0-da44ede5ef70',
              productId: '02355b4c-0346-466d-8f25-64655524bbd7',
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: '1458f623-e81a-4c68-a2a2-6affecd8a788',
              productId: '02355b4c-0346-466d-8f25-64655524bbd7',
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: '8f07d90e-cf85-4f70-9db0-4eb11c54e233',
              productId: '02355b4c-0346-466d-8f25-64655524bbd7',
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
            {
              id: 'ba3e2e7b-a6a6-4f23-9e3d-5e5c63821e52',
              productId: '02355b4c-0346-466d-8f25-64655524bbd7',
              price: 1200000,
              priceSeller: 0,
              moneyReceived: 120000,
            },
          ]}
          disableSelectionOnClick
          columns={columns}
          pageSize={100}
          checkboxSelection
        />
      </div>
    )
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Phân loại',
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageLink} alt="Newee" />
            {params.row.propertyName}
          </div>
        )
      },
    },
    { field: 'propertyValue', headerName: 'Thuộc tính', width: 150 },
    { field: 'sku', headerName: 'Thuộc tính', width: 150 },

    {
      field: 'price',
      headerName: 'Giá niêm yết',
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>
      },
    },
    {
      field: 'moneyReceived',
      headerName: 'Giá Seller',
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return <>{formatVND(params.row.moneyReceived)}</>
      },
    },
    {
      field: 'percent',
      headerName: 'Chiết khấu',
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return <>{params.row.percent}%</>
      },
    },
    { field: 'count', headerName: 'Số lượng', width: 140, align: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        )
      },
    },
  ]
  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1
    // setMoney(newAmount);
    return newAmount.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
  }
  const handleDelete = (id) => {
    alert('da chay')
    // setData(data.filter((item) => item.id !== id));
  }

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
  // https://api.newee.asia:5001/Newee/ManagerProduct/Create
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
  // "https://api.newee.asia:5001/Newee/ManagerVariant/Create",

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

  const [step1, setStep1] = useState({})
  const [step2, setStep2] = useState({})
  const [idProduct, setIdProduct] = useState('')
  const handleSubmitCreateProduct = async () => {
    console.log('3/4 ảnh Variant =>', savePath)
    console.log('4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4', saveVariant)

    try {
      setLoading(true)

      if (savePath?.length === 0) {
        console.log('Chạy 1')
        await createEditVariantStep5()
      } else {
        console.log('Chạy 2')
        // return;
        await uploadListImageVariantStep3()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const API = `https://api.newee.asia:5001`

  // 1/4 UPLOAD ẢNH
  const uploadImageStep1 = () => {
    if (saveVariant.length === 0 || infoImageProduct.length === 0) {
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
  const uploadListImageVariantStep3 = async () => {
    console.log('uploadListImageVariantStep3', productId)

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
          dataVariantRow.imageLink = response.data
          saveVariant[index].imageLink = response.data
          saveVariant[index].productId = productId
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
      createListVariantStep4(saveVariant, productId)
    }, 5000)
  }
  // 4/4 CREATE VARIANT
  const createListVariantStep4 = async (dataStep3, idProducts) => {
    console.log('createListVariantStep4 ', dataStep3)
    console.log('createListVariantStep4 ', JSON.stringify(dataStep3[0]))
    console.log('idProduct', idProducts)
    dataStep3.forEach((element) => {
      if (element.productId === '' || element.productId === undefined) {
        element.productId = productId
      }
      try {
        axios(`${API}/Newee/ManagerVariant/Edit`, {
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

    setIsRender(!isRender)
  }

  const createEditVariantStep5 = async () => {
    console.log('3/4 2 ảnh Variant =>', savePath)
    console.log('4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4', saveVariant)

    saveVariant.forEach((element) => {
      console.log('edit variant admin =>', element)
      console.log('edit variant admin =>', JSON.stringify(element))
      try {
        axios(`${API}/Newee/ManagerVariant/Edit`, {
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
              message: 'Sửa phân loại sản phẩm thành công!',
              type: 'success',
            })
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response)

            setNotify({
              isOpen: true,
              message: 'Sửa phân loại sản phẩm không thành công!',
              type: 'success',
            })
            setLoading(false)
          })
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
        setNotify({
          isOpen: true,
          message: 'Sửa phân loại sản phẩm không thành công!',
          type: 'success',
        })
        alert('Sửa phân loại không thành công!')
      }
    })

    setIsRender(!isRender)
  }
  useEffect(() => {
    setNotify({
      isOpen: true,
      message: 'Khi thay đổi thông tin nhập ở #1 (1/3) luôn chọn lại Ảnh sản phẩm!',
      type: 'warning',
    })
  }, [])

  //

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          {' '}
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Sửa phân loại!</h1>
          <div className="newProduct-container">
            <div className="newProduct-variants">
              <label>#1 - Sửa phân loại (1/2)</label>

              <DynamicForms
                common={commonVariant || []}
                setCountVariant={setCountVariant || null}
                getDataVariant={getInfoVariant}
                dataVariantRow={dataVariantRow}
              />

              {/*  */}
            </div>
            <div className="newProduct-variants">
              <label>#2 - Hoàn thành (2/2)</label>
              <button
                type="button"
                className="addProductButton createProductButton"
                // onClick={() => createProduct()}
                onClick={() => handleSubmitCreateProduct()}
              >
                Sửa phân loại
              </button>
              <button
                type="button"
                className="addProductButton createProductButton"
                // onClick={() => createProduct()}
                onClick={() => history.goBack()}
              >
                Quay lại
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
