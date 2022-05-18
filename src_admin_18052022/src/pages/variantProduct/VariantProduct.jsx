import { createStyles, makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../../components/notifications/ConfirmDialog'
import Notification from '../../components/notifications/Notifications'
import { deleteVariant } from '../../reducers'
import ConfigAPI from '../../utils/ConfigAPI'
import ColoredLinearProgress from '../../_constants/UI/button/LineProgress'
import './product.css'

const useStyles = makeStyles(
  createStyles({
    name: { 'font-size': '14px' },
  })
)

export default function VariantProduct(props) {
  let { productId, isRenderFc } = props
  const dispatch = useDispatch()

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })

  const [infoProduct, setInfoProduct] = useState()
  const [variantProduct, setVariantProduct] = useState()

  const classes = useStyles(props)
  const [content1, setContent1] = useState(infoProduct?.content1)

  const [isCheck, setIsCheck] = useState(false)

  const isLoading = useSelector((state) => state.product.isLoading)
  const isRender = useSelector((state) => state.product.isRender)

  const [loading, setLoading] = useState(false)
  const onClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000) //3 seconds
  }

  useEffect(() => {
    // console.log("đa chạy lại ư");
    getProductVariant()
  }, [productId, isRender, isRenderFc])
  useEffect(() => {
    console.log(content1)
  }, [content1])

  const getProduct = async () => {
    ConfigAPI(`Newee/ManagerProduct/GetById/${productId}`, 'GET', null)
      .then((res) => {
        console.log('get Product 1 =>', res)
        setInfoProduct(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getProductVariant = async () => {
    ConfigAPI(`Newee/ManagerVariant/Get/${productId}`, 'GET', null)
      .then((res) => {
        console.log('get Product 22 =>', res)
        setVariantProduct(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1
    // setMoney(newAmount);
    return newAmount.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
  }

  const handleDelete = (id) => {
    // alert("da chay");

    dispatch(deleteVariant(id))
    // setData(data.filter((item) => item.id !== id));

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    dispatch(deleteVariant(id))

    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    })
  }

  const [name, setName] = React.useState('John Snow')
  const [isNameFocused, setIsNamedFocused] = useState(false)
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
    { field: 'weight', headerName: 'Cân nặng(gram)', width: 140, align: 'center' },
    { field: 'tag1', headerName: 'Dễ vở', width: 140, align: 'center' },
    { field: 'tag7', headerName: 'Nông sản/ thực phẩm khô', width: 140, align: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: '/EditVariant/' + params.row.id,
                state: { dataVariantRow: params.row },
              }}
            >
              <button className="productListEdit">Xem/ Sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              // onClick={() => handleDelete(params.row.id)}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Thực hiện sẽ không thể thay đổi!',
                  subTitle: 'Chắc chắn?',
                  onConfirm: () => {
                    handleDelete(params.row.id)
                  },
                })
              }}
            />
          </>
        )
      },
    },
  ]

  const RowVariant = () => {
    return (
      <div className="productList variant-products" style={{ height: 500 }}>
        <DataGrid
          rows={variantProduct !== undefined ? variantProduct : []}
          disableSelectionOnClick
          columns={columns}
          pageSize={100}
          checkboxSelection
          style={{ height: 400 }}
        />
      </div>
    )
  }

  const handleChange = (event) => {
    setContent1(event.target.value)
  }

  return (
    <div className="product variant-product">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
          <div className="productBottom info">
            <form className="productForm pr-2">
              <label>Thông tin chi tiết - Phân loại</label>

              <Link
                to={{
                  pathname: '/AddVariant/' + productId,
                  state: { fromDashboard: infoProduct },
                }}
              >
                <button className="productAddButton">Thêm phân loại</button>
              </Link>
            </form>

            <RowVariant />
          </div>
        </>
      )}
    </div>
  )
}
