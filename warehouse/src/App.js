import Login from "./Pages/Login/Login";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "./Components/topbar/Topbar";
import NotFound from "./Pages/404/NotFound";
import "./App.css";
import Sidebar from "./Components/sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Orders from "./Pages/Orders/Orders";
import Order from "./Pages/Order/Order";
import ApproveOrders from "./Pages/ApproveOrders/ApproveOrders";
import GHTK from "./Pages/GHTK/GHTK";

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
              <Route path="/products" component={Products} />
              <Route path="/product/:productID" component={Product} />
              <Route path="/orders" component={Orders} />
              <Route path="/order/:orderID" component={Order} />
              <Route path="/approve-orders" component={ApproveOrders} />
              <Route path="/GHTK/:orderID" component={GHTK} />
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
