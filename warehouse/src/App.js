import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "./Components/topbar/Topbar";
import NotFound from "./Pages/404/NotFound";
import Sidebar from "./Components/sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Orders from "./Pages/Orders/Orders";
import PackingOrder from "./Pages/PackingOrder/PackingOrder";
import ShippingOrder from "./Pages/ShippingOrder/ShippingOrder";
import ApproveOrders from "./Pages/ApproveOrders/ApproveOrders";
import GHTK from "./Pages/GHTK/GHTK";
import Login from "./Pages/Login/login";
import ImportProductMount from "./Pages/ImportProductMount/ImportProductMount";
import ExportProductMount from "./Pages/ExportProductMount/ExportProductMount";
import Reports from "./Pages/Reports/Reports"
import "./App.css";

export default function App() {
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />

      <Topbar />

      <div className="container">
        {isLogin && <Sidebar />}
        <Suspense fallback={<div>Loading...</div>}>
          {isLogin ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" exact render={() => <Redirect to="/" />} />
              <Route path="/products" component={Products} />
              <Route exact path="/product/:productID" component={Product} />
              <Route
                exact
                path="/product/import-product-mount/:productID"
                component={ImportProductMount}
              />
              <Route
                exact
                path="/product/export-product-mount/:productID"
                component={ExportProductMount}
              />
              <Route path="/orders" component={Orders} />
              <Route path="/packing-order/:orderID" component={PackingOrder} />
              <Route path="/shipping-order/:orderID" component={ShippingOrder} />
              <Route path="/approve-orders" component={ApproveOrders} />
              <Route path="/GHTK/:orderID" component={GHTK} />
              <Route path="/reports" component={Reports} />
              <Route path="*" component={NotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          )}
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
