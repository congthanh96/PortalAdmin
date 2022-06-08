import 'antd/dist/antd.min.css'
import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProvider from "./Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checkAuth from "./Utils/checkAuth";
import Topbar from "./Components/topbar/Topbar";

const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Login/Login"));
function App() {
  // const toastId = React.useRef(null);

  // const notify = () => {
  //   if(! toast.isActive(toastId.current)) {
  //     toastId.current = toast.success("I cannot be duplicated!");
  //   }
  // }
  const isAuth = checkAuth();
  return (
    <Router>
      <Topbar />
      <UserProvider>
        {isAuth ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </UserProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
