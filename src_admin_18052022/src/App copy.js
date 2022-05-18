import React, { lazy, useEffect, useState } from "react";
import "react-app-polyfill/ie11"; // required for IE11
import "react-app-polyfill/stable"; // required for IE11
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import AddVariant from "./pages/editProduct/AddVariant";
import EditVariant from "./pages/editProduct/EditVariant";
import PromotionAdd from "./pages/editPromotions/AddPromotions";
import PromotionEdit from "./pages/editPromotions/EditPromotions";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewOrder from "./pages/newOrder/NewOrder";
import NewProduct from "./pages/newProduct/NewProduct";
import NewProductEdit from "./pages/newProduct/NewProductEdit";
import NewProductSheet from "./pages/newProductSheet/NewProductSheet";
import NewUser from "./pages/newUser/NewUser";
import OrderList from "./pages/orderList/OrderList";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
// Promotion
import PromotionList from "./pages/promotions/promotions-list/PromotionList";
//RANK
import RankList from "./pages/rankList/RankList";
//Report
import ReportList from "./pages/reports/ReportList";
import RequestList from "./pages/request/RequestList";
// TRANSACTIONS
import Transactions from "./pages/transactions/Transactions";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";

// SEO
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("user =>", user);
  const [role, setRole] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setRole(true);
    } else if (localStorage.getItem("tokenADMIN")) {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [Object.keys(user).length]);

  return (
    <Router>
      {role === true ? (
        <>
          {" "}
          <Topbar />
          <div className="container">
            <Sidebar />
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

              <Route
                path="/editproduct/:productId"
                component={NewProductEdit}
              />

              <Route path="/promotions" component={PromotionList} />

              <Route path="/promotion/:promotionId" component={PromotionEdit} />

              <Route path="/promotion-add" component={PromotionAdd} />

              <Route path="/orders" component={OrderList} />

              <Route path="/order/:orderId" component={NewOrder} />

              <Route extra path="/reports/:reportId" component={ReportList} />

              <Route path="/reports" component={ReportList} />

              <Route path="/rankList" component={RankList} />

              <Route path="/requests" component={RequestList} />

              <Route path="/transactions" component={Transactions} />
            </Switch>
          </div>
        </>
      ) : (
        <>
          <Route path="/" component={Login} />
          <Route path="/login" component={Login} />
        </>
      )}
    </Router>
  );
}

export default App;
