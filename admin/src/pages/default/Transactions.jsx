import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import InfoTransactions from "../../components/upload/dynamicForm/InfoTransactions";
import { fetchUser } from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./newProduct.css";


export default function Transactions(props) {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.user.listUser);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // ===
  const [getInput, setGetInput] = useState(null);

  useEffect(() => {
    if (fetchData.length === 0) {
      dispatch(fetchUser());
    }
  }, []);

  const API = `https://api.newee.asia:6001`;
  const handleSubmit = async () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      console.log(getInput);
      axios(`${API}/PrivatePayManager/Push`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${user}`,
        },
        method: "POST",
        data: JSON.stringify(getInput),
      })
        .then((res) => {
          console.log(res);
          setNotify({
            isOpen: true,
            message: "Gửi tiền vào Ví Seller thành công!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          setNotify({
            isOpen: true,
            message:
              "Gửi tiền vào Ví Seller thất bại! Kiểm tra lại codeSeller hoặc Đăng nhập lại để thử lại!",
            type: "error",
          });
        });
    } catch (err) {
      console.log(err);

      setNotify({
        isOpen: true,
        message:
          "Gửi tiền vào Ví Seller thất bại! Kiểm tra lại codeSeller hoặc Đăng nhập lại để thử lại!",
        type: "error",
      });
    }
  };
  const handleSubmitSecond = async () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      console.log(getInput);
      axios(`${API}/PrivatePayManager/Pop`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${user}`,
        },
        method: "POST",
        data: JSON.stringify(getInput),
      })
        .then((res) => {
          console.log(res);
          setNotify({
            isOpen: true,
            message: "Trừ tiền khỏi Ví Seller thành công!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          setNotify({
            isOpen: true,
            message:
              "Trừ tiền khỏi Ví Seller thất bại! Kiểm tra lại codeSeller hoặc Đăng nhập lại để thử lại!",
            type: "error",
          });
        });
    } catch (err) {
      console.log(err);

      setNotify({
        isOpen: true,
        message:
          "Trừ tiền khỏi Ví Seller thất bại! Kiểm tra lại codeSeller hoặc Đăng nhập lại để thử lại!",
        type: "error",
      });
    }
  };

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />

          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <h1 className="addProductTitle">Thêm sản phẩm mới!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/3)</label>
              <form className="addProductForm">
                <InfoTransactions
                  listUser={fetchData}
                  setGetInput={setGetInput}
                />
              </form>
            </div>

            <div className="newProduct-variants">
              <label>#3 - Hoàn thành (3/3)</label>
              <button
                type="button"
                className="addProductButton createProductButton"
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    title: "Thực hiện sẽ không thể thay đổi!",
                    subTitle: "Chắc chắn?",
                    onConfirm: () => {
                      handleSubmit();
                    },
                  })
                }
              >
                Gửi tiền vào Ví
              </button>

              <button
                type="button"
                className="addProductButton createProductButton"
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    title: "Thực hiện sẽ không thể thay đổi!",
                    subTitle: "Chắc chắn?",
                    onConfirm: () => {
                      handleSubmitSecond();
                    },
                  })
                }
              >
                Trừ tiền khỏi Ví
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
