import { SnackbarProvider } from 'notistack'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import 'react-app-polyfill/ie11' // required for IE11
import 'react-app-polyfill/stable' // required for IE11
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import CreateSite from './pages/createSite/CreateSite'
// SETTINGS - DEFAULT
import Settings from './pages/default/Default'
import AddVariant from './pages/editProduct/AddVariant'
import EditVariant from './pages/editProduct/EditVariant'
import PromotionAdd from './pages/editPromotions/AddPromotions'
import PromotionEdit from './pages/editPromotions/EditPromotions'
// GHTK
import GHTK from './pages/GHTK/GHTK'
import GHTKStatus from './pages/GHTK/GHTKStatus'
import GhtkList from './pages/ghtkList/GhtkList'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NewOrder from './pages/newOrder/NewOrder'
import NewProduct from './pages/newProduct/NewProduct'
import NewProduct2022 from './pages/newProduct/NewProduct2022'
import NewProductEdit from './pages/newProduct/NewProductEdit'
import NewProductSheet from './pages/newProductSheet/NewProductSheet'
import NewUser from './pages/newUser/NewUser'
import OrderList from './pages/orderList/OrderList'
import Product from './pages/product/Product'
import ProductList from './pages/productList/ProductList'
// Promotion
import PromotionList from './pages/promotions/promotions-list/PromotionList'
//RANK
import RankList from './pages/rankList/RankList'
//Report
import ReportList from './pages/reports/ReportList'
import RequestList from './pages/request/RequestList'
// TRANSACTIONS
import Transactions from './pages/transactions/Transactions'
import User from './pages/user/User'
import UserList from './pages/userList/UserList'

//2022/04/12 Huynh-dt add create-account start
import CreateAccount from './pages/createAccount/CreateAccount'
//2022/04/12 Huynh-dt add create-account end

// SEO
const NotFound = React.lazy(() => import('./pages/404/NotFound'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const notistackRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [token, setToken] = useState(() => {
    let isToken = localStorage.getItem('tokenADMIN') ?? null

    return isToken
  })

  useEffect(() => {
    console.log(token)
  }, [])

  return (
    <BrowserRouter basename="/">
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        ref={notistackRef}
        action={(key) => (
          <span
            onClick={() => notistackRef.current.closeSnackbar(key)}
            style={{
              padding: '0 6px',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ✖
          </span>
        )}
      >
        <ScrollToTop />

        <Topbar token={token} setToken={setToken} />

        <div className="container">
          {token && <Sidebar />}
          <Suspense fallback={<div>Loading...</div>}>
            {token ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserList} />
                <Route path="/user/:userId" component={User} />
                <Route path="/newUser" component={NewUser} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:productId" component={Product} />
                <Route path="/EditVariant/:variantId" component={EditVariant} />
                <Route path="/AddVariant/:productId" component={AddVariant} />
                <Route path="/newproductSheet" component={NewProductSheet} />
                <Route path="/newproduct" component={NewProduct} />
                <Route path="/newproduct-2022" component={NewProduct2022} />
                <Route path="/editproduct/:productId" component={NewProductEdit} />
                <Route path="/promotions" component={PromotionList} />
                <Route path="/promotion/:promotionId" component={PromotionEdit} />
                <Route path="/promotion-add" component={PromotionAdd} />
                <Route extra path="/orders/:codeSeller" component={OrderList} />
                <Route path="/orders" component={OrderList} />
                <Route path="/ghtk" component={GhtkList} />
                <Route path="/order/:orderId" component={NewOrder} />
                <Route path="/order-GHTK/:orderId" component={GHTK} />
                <Route path="/status-GHTK/:orderId/:ghtkID" component={GHTKStatus} />
                <Route extra path="/reports/:reportId" component={ReportList} />
                <Route path="/reports" component={ReportList} />
                <Route path="/rankList" component={RankList} />
                <Route path="/requests" component={RequestList} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/settings" component={Settings} />
                <Route path="/create-site" component={CreateSite} />
                {/* 2022/04/12 Huynh-dt add create-account start */}
                <Route path="/create-account" component={CreateAccount} />
                {/* 2022/04/12 Huynh-dt add create-account end */}
                <Route exact path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/">
                  <Login token={token} setToken={setToken} />
                </Route>
                <Route exact path="/login">
                  <Login token={token} setToken={setToken} />
                </Route>
                <Route exact path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            )}
          </Suspense>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App
