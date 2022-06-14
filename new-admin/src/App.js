import "antd/dist/antd.min.css";
import React, { useContext,useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "./Components/topbar/Topbar";
import { UserContext } from "./Context/UserContext";
import Sidebar from "./Components/sidebar/Sidebar";

const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Users =  lazy(() => import("./Pages/Users/Users"));
const User = lazy(()=> import("./Pages/User/User"))
const Products =  lazy(() => import("./Pages/Products/Products"));
function App() {
  // const toastId = React.useRef(null);

  // const notify = () => {
  //   if(! toast.isActive(toastId.current)) {
  //     toastId.current = toast.success("I cannot be duplicated!");
  //   }
  // }
  // const [isAuth, setIsAuth] = useState(checkAuth());
  const user = useContext(UserContext)
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Router basename="/">
       <ScrollToTop />
        <Topbar />
        <div style={{display:"flex"}}>
        {user.isLogin && <Sidebar />}
        <Suspense fallback={<div>Loading...</div>}>
        {user.isLogin ? (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route exact path="/users" element={<Users />} />
            <Route path="/user/:userID" element={<User />} />
            <Route exact path="/products" element={<Products />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        )}
        </Suspense>
        </div>

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
