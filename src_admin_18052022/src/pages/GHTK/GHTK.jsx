import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from '../../components/material/Button'
import Notification from '../../components/notifications/Notifications'
import InfoGHTK from '../../components/upload/dynamicForm/InfoGHTK'
import ConfigAPI from '../../utils/ConfigAPI'
import ColoredLinearProgress from '../../_constants/UI/button/LineProgress'
import './newDefault.css'

export default function GHTK({ location }) {
  const { state } = location
  console.log(state)
  let { orderId } = useParams()

  const dispatch = useDispatch()
  const { orderDetail, isLoading, orderDetailApi } = useSelector((state) => state.order)

  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const [getInput, setGetInput] = useState(null)

  const handleSubmit = async () => {
    try {
      createBillGHTK()
    } catch (err) {
      console.log(err)
    }
  }
  const [GHTK_Products, setGHTK_Products] = useState([])
  const [isCheckPriceShippingGHTK, setIsCheckPriceShippingGHTK] = useState([])
  const [isCheck, setIsCheck] = useState(false)
  const [dataGHTK, setDataGHTK] = useState({
    products: [
      {
        name: 'bút',
        weight: 0.1,
        quantity: 1,
        product_code: 1241,
      },
      {
        name: 'tẩy',
        weight: 0.2,
        quantity: 1,
        product_code: 1254,
      },
    ],
    order: {
      id: 'a4',
      pick_name: 'HCM-nội thành',
      pick_address: '590 CMT8 P.11',
      pick_province: 'TP. Hồ Chí Minh',
      pick_district: 'Quận 3',
      pick_ward: 'Phường 1',
      pick_tel: '0911222333',
      tel: '0911222333',
      name: 'GHTK - HCM - Noi Thanh',
      address: '123 nguyễn chí thanh',
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      hamlet: 'Khác',
      is_freeship: '1',
      pick_date: '2016-09-30',
      pick_money: 47000,
      note: 'Khối lượng tính cước tối đa: 1.00 kg',
      value: 3000000,
      transport: 'fly',
      pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
      deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
      pick_session: 2, // Phiên lấy xfast
      tags: [1, 7],
    },
  })
  const [dataGHTK2, setDataGHTK2] = useState([])

  const getPriceShippingGHTK = async () => {
    console.log(state)
    var data = {
      province: state.tp ? state.tp : 'TP Hồ Chí Minh',
      district: state.qh ? state.qh : 'Quận Tân Bình',
      address: state.address ? state.address : '406/36 Cộng Hoà',
      tags: [0],
      weight: 1000,
      value: state.totalPrice * 1,
      pick_district: 'Quận Bình Thạnh',
      pick_province: 'Thành Phố Hồ Chí Minh',
    }

    ConfigAPI(`ghtk/shipmentfee`, 'POST', data)
      .then((res) => {
        console.log('GHTK - Get giá shipping GHTK thành công', res)
        console.log('GHTK - Get giá shipping GHTK thành công', res.data.fee.fee)

        setIsCheckPriceShippingGHTK(res.data)
        setDataGHTK2([
          {
            id: state?.idBill || '', // id đơn hàng.
            pick_name: state?.code || '', // Tên đơn hàng - mã đơn hàng.
            pick_address: '438 Nơ Trang Long', // Thông tin công ty
            pick_province: 'Thành Phố Hồ Chí Minh', // Thông tin công ty.
            pick_district: 'Quận Bình Thạnh', // Thông tin công ty.
            pick_ward: 'Phường 13', // Thông tin công ty.
            pick_tel: '0972100200', // Thông tin công ty.
            tel: state?.phone || '', // Thông tin người nhận
            name: state?.fullName, // Thông tin người nhận
            address: state?.address || '', // Thông tin người nhận
            province: state?.tp || '', // Thông tin người nhận
            district: state?.qh || '', // Thông tin người nhận
            ward: state?.pXa || '', // Thông tin người nhận
            street: state?.address || '', // Thông tin người nhận
            value: state?.totalPrice * 1 || 100000, // Thông tin giá ship
            hamlet: 'khác', // Thông tin người nhận
            is_freeship: '0', // Thông tin giá ship
            pick_date: '2021-11-20', // Thông tin ngày nhận đơn hàng
            pick_money: state?.totalPrice * 1 || 100000, // Thông tin giá đơn hàng
            note: 'đơn hàng 123 - không cần gọi đâu nà', // Thông tin người nhận ghi chú.
            transport: 'road', // Thông tin phương thức vận chuyển
            pick_option: 'cod', // Thông tin cod or bank
            deliver_option: 'none',
            tags: [0], // thông tin hàng bình thường, dễ vỡ.
          },
        ])
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: 'GHTK - Get giá shipping GHTK thất bại! Vui lòng đăng nhập lại!',
          type: 'error',
        })
        console.log(err.response)
      })
  }

  const createBillGHTK = async (info) => {
    setLoading(true)

    var listProducts = []
    await state.billDetail.forEach((element) => {
      listProducts.push({
        name: `${element.productName}` || 'sản phẩm test 01',
        weight: element.weight * 1 || 1,
        quantity: element.count * 1 || 1,
        product_code: '',
      })
    })

    setGHTK_Products(listProducts)
    let dataLocal = {
      products: listProducts,
      order: dataGHTK2[0] || getInput[0],
    }

    setDataGHTK(dataLocal)

    setTimeout(() => {
      ConfigAPI(`ghtk/post-order`, 'POST', JSON.stringify(dataLocal))
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          setLoading(false)
          return res
        })
        .then((res) => {
          console.log('res-2', res)
          if (res.data.success) {
            updateBillGHTK(dataLocal, res)
          }
        })
        .catch((err) => {
          alert('Đăng đơn hàng lên GHTK không thành công! Vui lòng đăng nhập lại để thử lại!')
          console.log(err.response)

          setNotify({
            isOpen: true,
            message:
              'GHTK - Đăng đơn hàng lên GHTK không thành công! Vui lòng đăng nhập lại để thử lại!',
            type: 'error',
          })
          setLoading(false)
        })
    }, 1000)
  }

  const responseUpdate = {
    data: {
      success: true,
      message: '',
      order: {
        label_id: 'S20068350.1089169730',
        partner_id: '8c41e031-efeb-46e1-947b-aec652f85935',
        status: '1',
        status_text: 'Chưa tiếp nhận',
        created: '2022-03-22 23:22:51',
        modified: '2022-03-22 23:22:51',
        message: 'đơn hàng 123 - không cần gọi đâu nà',
        pick_date: '2022-03-23',
        deliver_date: '2022-03-23',
        customer_fullname: 'test',
        customer_tel: '0972197200',
        address: '400 cong hoa Cộng Hòa, 400 cong hoa, Quận Tân Bình, TP Hồ Chí Minh',
        storage_day: '0',
        ship_money: '22000',
        insurance: '0',
        value: '22000',
        weight: '1000',
        pick_money: '502000',
        is_freeship: '1',
      },
    },
  }

  const updateBillGHTK = async (dataLocal, responseGHTK) => {
    ConfigAPI(
      `Newee/Bill/UpdateShip?idBill=${dataLocal.order.id}&shipName=GHTK&idShip=${responseGHTK.data.order.label}&shipStatusText=Chưa xác nhận`,
      'POST',
      null
    )
      .then((res) => {
        console.log('res update bill responseGHTK', responseGHTK)
        console.log('res update bill', res)

        setNotify({
          isOpen: true,
          message: 'GHTK - Cập nhập tên đơn vị vận chuyển thành công!',
          type: 'success',
        })
        setLoading(false)
        return responseGHTK
      })
      .then((responseGHTK) => {
        getDetailBillGHTK(responseGHTK)
      })
      .catch((err) => {
        alert('GHTK - Cập nhập tên đơn vị vận chuyển không thành công!')
        setNotify({
          isOpen: true,
          message: 'GHTK - Cập nhập tên đơn vị vận chuyển không thành công!',
          type: 'error',
        })
        console.log(err.response)
        setLoading(false)
      })
  }

  const [getDetailBill2, setGetDetailBill2] = useState({
    success: true,
    message: '',
    order: {
      label_id: 'S20068350.1329293057',
      partner_id: '07516282-55b7-4acb-aff4-75c3e8bc9abf',
      status: '1',
      status_text: 'Chưa tiếp nhận',
      created: '2022-03-22 22:58:26',
      modified: '2022-03-22 22:58:26',
      message: 'đơn hàng 123 - không cần gọi đâu nà',
      pick_date: '2022-03-23',
      deliver_date: '2022-03-23',
      customer_fullname: 'test 16:52',
      customer_tel: '0972197000',
      address: 'test Cộng Hòa, 406 Cộng Hoà, Quận Tân Bình, TP Hồ Chí Minh',
      storage_day: '0',
      ship_money: '22000',
      insurance: '0',
      value: '22000',
      weight: '1000',
      pick_money: '388000',
      is_freeship: '1',
    },
  })

  const [getDetailBill, setGetDetailBill] = useState()

  const getDetailBillGHTK = async (responseGHTK) => {
    ConfigAPI(`ghtk/get-order/${responseGHTK.data.order.label}`, 'GET', null)
      .then((res) => {
        console.log('getDetailBillGHTK', res)

        setGetDetailBill(res)
        setNotify({
          isOpen: true,
          message: 'GHTK - Cập nhập tên đơn vị vận chuyển thành công!',
          type: 'success',
        })
        setLoading(false)
      })
      .catch((err) => {
        alert('GHTK - Cập nhập tên đơn vị vận chuyển không thành công!')
        setNotify({
          isOpen: true,
          message: 'GHTK - Cập nhập tên đơn vị vận chuyển không thành công!',
          type: 'error',
        })
        console.log(err.response)
        setLoading(false)
      })
  }

  useEffect(() => {
    getPriceShippingGHTK()
  }, [])

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <div
            className="header-space"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}
          >
            <h1 className="addProductTitle">Giao hàng tiết kiệm</h1>
            <Button
              type="button"
              color="primary"
              className="form__custom-button"
              onClick={() => handleSubmit()}
            >
              Đăng đơn hàng lên GHTK
            </Button>
          </div>
          <div className="newProduct-container">
            {getDetailBill && (
              <div className="newProduct-info">
                <pre>{JSON.stringify(getDetailBill, null, 2)}</pre>
              </div>
            )}

            <div className="newProduct-info">
              <form className="addProductForm">
                <InfoGHTK
                  getInput={getInput}
                  setGetInput={setGetInput}
                  dataGHTK={dataGHTK2.length !== 0 && dataGHTK2}
                  setDataGHTK2={setDataGHTK2}
                />
              </form>
            </div>

            <div className="newProduct-variants">
              <Button
                type="button"
                color="primary"
                className="form__custom-button"
                onClick={() => handleSubmit()}
              >
                Đăng đơn hàng lên GHTK
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
