import "./newDefault.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import InfoDefault from "../../components/upload/dynamicForm/InfoDefault";
import DynamicForms from "../../components/upload/dynamicForm/DynamicForms";
import Notification from "../../components/notifications/Notifications";
import { getCategory } from "../../reducers";
import CustomInput from "../../components/material/CustomInput";
import Button from "../../components/material/Button";
import ConfigAPI from "../../utils/ConfigAPI";

export default function Default(props) {
  const dispatch = useDispatch();
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

  const [getInput, setGetInput] = useState(null);
  const handleSubmit = async () => {
    try {
      // TO do
      console.log(getInput);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Settings!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Tạo sản phẩm (1/3)</label>
              <form className="addProductForm">
                <InfoDefault getInput={getInput} setGetInput={setGetInput} />
              </form>
            </div>

            <div className="newProduct-variants">
              <Button
                type="button"
                color="primary"
                className="form__custom-button"
                onClick={() => handleSubmit()}
              >
                Gửi tiền vào Ví
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
