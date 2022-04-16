import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid'
import _ from 'lodash'
import SearchBar from 'material-ui-search-bar'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createSiteSellerApi } from '../../api/private'
import ConfirmDialog from '../../components/notifications/ConfirmDialog'
import Notification from '../../components/notifications/Notifications'
import { ButtonComponent } from '../../_constants/UI/button/ButtonComponent'
import ColoredLinearProgress from '../../_constants/UI/button/LineProgress'
import './productList.css'
 //2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
 //2022/04/13 Huynh-dt export file ADD

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  options: {
    minHeight: 40,
  },
}))

export default function GhtkList() {
  let successLoading = 'Loading page success!'
  let successGHTK = 'Loading ghtk success!'
  let success = 'Gửi yêu cầu tạo Domain thành công!'
  let error = 'Gửi yêu cầu tạo Domain thất bại!'
  let warning = 'Vui lòng chọn tên Domain'

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  let { codeSeller } = useParams()

  const history = useHistory()
  const classes = useStyles()

  const { orders, ghtk, isRender, isLoading } = useSelector((state) => state.order)

  const [rows, setRows] = useState(ghtk)

  const [isDev, setIsDev] = useState(false)
  const [loading, setLoading] = useState(false)

  const [activeBtn, setActiveBtn] = useState(1)

  const [pageSize, setPageSize] = useState(10)
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

  const [sortModel, setSortModel] = useState([{ field: 'url', sort: 'desc' }])

  const onClick = async (id, index) => {
    if (codeSeller !== undefined) {
      history.push('/orders')
    }

    setLoading(true)
    setActiveBtn(index)
    setIsDev(!isDev)
    var filter = []
    switch (index) {
      case 0:
        loadingPage()

        break

      case 1:
        getListSiteRegister()

        break

      default:
        break
    }

    setLoading(false)
  }
  const downCategory = [
    { id: 'All', name: 'Loading', index: 0 },
    { id: 'GHTK', name: 'GHTK', index: 1 },
  ]

  const columns = [
    { field: 'isActive', headerName: 'ID', width: 90, hide: true },
    { field: 'isActive', headerName: 'Trạng thái', width: 150 },
    { field: 'sellerName', headerName: 'Thông tin Seller', width: 300 },
    { field: 'shopName', headerName: 'Tên Shop', width: 150 },
    { field: 'url', headerName: 'Tên domain', width: 300 },

    {
      field: '',
      headerName: 'Actions',
      width: 200,
       //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
       //2022/04/13 Huynh-dt export file end
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => handleActiveSite(params.row.url)}>
              Kích hoạt
            </button>
          </>
        )
      },
    },

    // {
    //   field: 'url',
    //   headerName: 'Mã Đơn Hàng',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={'/active/' + 1}>
    //           <button className={true ? 'orderListEditDev' : 'orderListEdit'}>{params.url}</button>
    //         </Link>
    //       </>
    //     )
    //   },
    // },
  ]

  const [searched, setSearched] = useState(codeSeller || '')

  const requestSearch = (searchedVal) => {
    console.log(orders)
    if (orders.length === 0 || orders.length === undefined) return
    const filteredRows = orders.filter((row) => {
      return (
        row.code?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.fullName?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.updater?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase())
      )
    })

    setRows(filteredRows)

    console.log(filteredRows)
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
    setRows(orders)
  }

  // 0604
  // GHTK
  useEffect(() => {
    getListSiteRegister()
  }, [])
  const loadingPage = async () => {
    closeSnackbar()

    try {
      enqueueSnackbar(successLoading, {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      })
    }
  }
  const getListSiteRegister = async () => {
    try {
      const response = await createSiteSellerApi.getListRegister()
      setRows(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleActiveSite = async (url) => {
    console.log('url', url)
    closeSnackbar()
    if (url === undefined) {
      enqueueSnackbar(warning, {
        variant: 'warning',
      })
      return
    }
    try {
      // CALL API HERE
      enqueueSnackbar(success, {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      })
    }
  }
  return (
    <div className="productList">
      <>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        <div className="product-list-header">
          <div className="header-left">
            {downCategory.map((value, index) => (
              <ButtonComponent
                key={index}
                color={activeBtn === index ? 'primary' : 'default'}
                variant={'contained'}
                onClick={() => onClick(value.id, index)}
                loading={loading}
                name={value.name}
                mr={6}
                mb={4}
              />
            ))}
          </div>

          <div className="header-right">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              style={{
                width: 230,
                height: 35,
                marginRight: 10,
                marginBottom: 10,
              }}
              placeholder="Mã đơn hàng, tên người nhận, tên người duyệt"
            />
          </div>
        </div>
        {isLoading ? (
          <ColoredLinearProgress />
        ) : (
          <DataGrid
            rows={rows}
            getRowId={(row) => row.url}
            disableSelectionOnClick
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            sortModel={sortModel}
            onSortModelChange={(model) => {
              if (!_.isEqual(model, sortModel)) {
                console.log('đã chạy !')
                setSortModel(model)
              }
            }}
            //2022/04/13 Huynh-dt export file ADD
            components={{
              Toolbar: () => CustomToolbar("Create Site"),
            }}
            //2022/04/13 Huynh-dt export file ADD
          />
        )}
      </>
    </div>
  )
}
