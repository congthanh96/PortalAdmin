import "./newProduct.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import InfoTransactions from "../../components/upload/dynamicForm/InfoTransactions";
import DynamicForms from "../../components/upload/dynamicForm/DynamicForms";
import Notification from "../../components/notifications/Notifications";
import { getCategory } from "../../reducers";

export default function Default(props) {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.product.isLoading);
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

  const handleSubmit = async () => {};

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Thêm sản phẩm mới!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/3)</label>
              <form className="addProductForm">
                <InfoTransactions />
              </form>
            </div>
            <div className="newProduct-variants">
              <label>#2 - Tạo phân loại (2/3)</label>
            </div>
            <div className="newProduct-variants">
              <label>#3 - Hoàn thành (3/3)</label>
              <button
                type="button"
                className="addProductButton createProductButton"
                onClick={() => handleSubmit()}
              >
                Gửi tiền vào Ví
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
