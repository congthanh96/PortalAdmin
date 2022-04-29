import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Notification from "../../components/notifications/Notifications";
import InfoPromotionEdit from "../../components/upload/promotions/InfoPromotionEdit";
import {
    createProducts,
    createVariant,
    fetchProducts,
    productConvert,
    uploadImage
} from "../../reducers";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./newProduct.css";

export default function EditPromotions() {
  let { promotionId } = useParams();
  console.log("promotionId", promotionId);
  const dispatch = useDispatch();

  const isFlavors = useSelector((state) => state.product.isFlavors);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.product.isLoading);
  const allProducts = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts(500, 1));
      dispatch(productConvert());
    }
  }, []);

  useEffect(() => {
    if (isFlavors.length === 0) {
      dispatch(productConvert());
    }
  }, [allProducts.length]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Phân loại",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imageLink}
              alt="Newee"
            />
            {params.row.propertyName}
          </div>
        );
      },
    },
    { field: "propertyValue", headerName: "Thuộc tính", width: 150 },
    { field: "sku", headerName: "Thuộc tính", width: 150 },

    {
      field: "price",
      headerName: "Giá niêm yết",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.price)}</>;
      },
    },
    {
      field: "moneyReceived",
      headerName: "Giá Seller",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{formatVND(params.row.moneyReceived)}</>;
      },
    },
    {
      field: "percent",
      headerName: "Chiết khấu",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return <>{params.row.percent}%</>;
      },
    },
    { field: "count", headerName: "Số lượng", width: 140, align: "center" },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleDelete = (id) => {
    alert("da chay");
  };

  const [showResult, setShowResult] = useState(false);

  const [infoImageProduct, setInfoImageProduct] = useState();
  const [resImageProduct, setResImageProduct] = useState("");
  const [listResponseImageVariant, setListResponseImageVariant] = useState();

  const [infoProduct, setInfoProduct] = useState();

  const [variantProduct, setVariantProduct] = useState({
    ProductId: "",
    Price: "",
    PriceSeller: "",
    PropertyName: "",
    PropertyValue: "",
    sku: "",
    Count: "",
    imageLink: "",
    percent: "",
    moneyReceived: "",
  });

  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [variantProducts, setVariantProducts] = useState({});
  const [isVariant, setIsVariant] = useState(false);
  const [commonVariant, setCommonVariant] = useState({});

  const [countVariant, setCountVariant] = useState(1);

  const getImageProduct = (infoProduct, infoImage) => {
    setInfoImageProduct(infoImage);
  };

  // 0. LẤY THÔNG TIN NHẬP Ở FORM 1/2
  const getInfoProduct = (infoProduct, srcProduct) => {
    setInfoProduct(infoProduct[0]);
    setInfoImageProduct(srcProduct);
  };
  // 1. UPLOAD ẢNH => RES LINK
  //Result = link anh san pham
  const uploadImageProduct = () => {
    // alert("uploadImageProduct");
    var file = new FormData();

    file.append("File", infoImageProduct, infoImageProduct.name);
    file.append("Type", "Product");

    axios({
      url: "https://api.newee.asia:8001/upload-image",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: file,
    }).then(function (response) {
      setResImageProduct(response.data);
      infoProduct[0].Link = response.data;
    });
  };
  // 2. UPLOAD INFO PRODUCT => RES ID

  // =>> Result = ID sản phẩm

  const createInfoProduct = () => {};

  // 3. LẤY THÔNG TIN Ở FORM 2/2
  const [savePath, setSavePath] = useState([]);
  const [saveVariant, setSaveVariant] = useState([]);
  const [saveVariantProduct, setSaveVariantProduct] = useState([]);
  const [saveVariantId, setSaveVariantId] = useState("");

  const getInfoVariant = (infoVariant, pathVariant) => {
    setSaveVariant(infoVariant);
    setSavePath(pathVariant);
  };
  const [saveLinkImageVariant, setSaveLinkImageVariant] = useState([]);
  // 4. UPLOAD ẢNH VARIANT => RES saveVariant
  const uploadImageProductVariant = async () => {
    if (saveVariant.length === 0) {
      alert("Vui lòng chọn ảnh Phân loại!");
      return;
    }

    var a = [];
    savePath.forEach((element, index) => {
      var file = new FormData();
      file.append("File", element.path, element.path.name);
      file.append("Type", "Variant");

      axios({
        url: "https://api.newee.asia:8001/upload-image",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: file,
      }).then(function (response) {
        a.push(response.data);
        saveVariant[index].imageLink = response.data;
      });

      setSaveLinkImageVariant(a);
    });
  };
  // 5. FINAL
  const final = async () => {
    // saveVariant.forEach((element, index) => {
    //   console.log("final", element);
    //   dispatch(createVariant(element));
    // });

    dispatch(createVariant(saveVariant));
  };

  // SUBMIT TẠO SẢN PHẨM
  const createProduct = async () => {
    try {
      await dispatch(uploadImage(infoImageProduct, infoProduct));
      await dispatch(createProducts(saveVariant));
      // await uploadImageProductVariant();
      // await final();
    } catch (err) {
      alert("that bai");
      // setLoading(false);
    }
  };

  const getCommonVariant = (data) => {
    setIsVariant(true);
    setCommonVariant(data);
  };
  const getListDataVariant = (data) => {
    setVariantProducts(data);
  };
  const createListDataVariant = (data) => {
    alert("da chay ");
  };

  const [step1, setStep1] = useState({});
  const [step2, setStep2] = useState({});
  const [idProduct, setIdProduct] = useState("");
  const handleSubmitCreateProduct = async () => {
    console.log("2/4 thông tin form 1/2 => tạo product", infoProduct);
    console.log(
      "4/4 thông tin form 2/2 => tạo Variant + resuilt 2/4",
      saveVariantProduct
    );
    return;

    try {
      setLoading(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const API = `https://api.newee.asia:6001`;

  // 1/4 UPLOAD ẢNH
  const uploadImageStep1 = () => {
    if (saveVariant.length === 0 || infoImageProduct.length === 0) {
      alert("Vui lòng chọn ảnh Sản phẩm / phân loại!");
      setLoading(false);
      return;
    }

    var file = new FormData();
    file.append("File", infoImageProduct, infoImageProduct.name);
    file.append("Type", "Product");
    console.log("upload Image Step1 =>", file);

    axios({
      url: "https://api.newee.asia:8001/upload-image",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: file,
    })
      .then(function (response) {
        infoProduct.link = response.data;
        createProductStep2(infoProduct);
        setStep1(infoProduct);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // 2/4 CREATE PRODUCT
  const createProductStep2 = async (dataStep1) => {
    console.log("step1 with data-step2", dataStep1);
    console.log("step1 with data-step2", JSON.stringify(dataStep1));
    console.log("step1 with step2", step1);

    try {
      await axios(`${API}/Newee/ManagerProduct/Create`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${user}`,
        },
        method: "POST",
        data: JSON.stringify(dataStep1),
      })
        .then((res) => {
          console.log(res);

          uploadListImageVariantStep3(res.data.data);
          setIdProduct(res.data.data.id);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
          alert(err.response.data.errors);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err.response.data.errors);
    }
  };
  // 3/4 UPLOAD LIST ẢNH
  const uploadListImageVariantStep3 = async (dataStep2) => {
    console.log("data Step 2", dataStep2);
    console.log("data Step 2 => id", dataStep2.id);

    var a = [];
    savePath.forEach((element, index) => {
      var file = new FormData();
      file.append("File", element.path, element.path.name);
      file.append("Type", "Variant");

      console.log(file);
      axios({
        url: "https://api.newee.asia:8001/upload-image",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: file,
      })
        .then(function (response) {
          console.log("response ", response.data);
          a.push(response.data);
          saveVariant[index].imageLink = response.data;
          saveVariant[index].productId = dataStep2.id;
        })
        .catch((err) => {
          setLoading(false);
          console.log("error step3", err);
          alert("Tạo hình ảnh Variant không thành công!");
        });
      setSaveLinkImageVariant(a);
    });
    console.log("list Link Variant =>", a);
    setTimeout(() => {
      createListVariantStep4(saveVariant, dataStep2.id);
    }, 5000);
  };
  // 4/4 CREATE VARIANT
  const createListVariantStep4 = async (dataStep3, idProducts) => {
    console.log("createListVariantStep4 ", dataStep3);
    console.log("createListVariantStep4 ", JSON.stringify(dataStep3[0]));
    console.log("idProduct", idProducts);
    dataStep3.forEach((element) => {
      if (element.productId === "" || element.productId === undefined) {
        element.productId = idProducts;
      }
      try {
        axios(`${API}/Newee/ManagerVariant/Create`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${user}`,
          },
          method: "POST",
          data: JSON.stringify(element),
        })
          .then((res) => {
            console.log(res);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm thành công!",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);

            setNotify({
              isOpen: true,
              message: "Tạo phân loại sản phẩm không thành công!",
              type: "success",
            });
            setLoading(false);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert("Tạo phân loại không thành công!");
      }
    });
  };

  return (
    <div className="newProduct">
      {isLoading || loading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          {" "}
          <Notification notify={notify} setNotify={setNotify} />
          <h1 className="addProductTitle">Sửa khuyến mãi!</h1>
          <div className="newProduct-container">
            <div className="newProduct-info">
              <label>#1 - Khuyến mãi (1/2)</label>
              <form className="addProductForm">
                <InfoPromotionEdit
                  getDataProduct={getInfoProduct}
                  downProduct={isFlavors}
                  showResult={showResult}
                  downData={infoProduct || null}
                  setSaveVariantProduct={setSaveVariantProduct}
                  saveVariantProduct={saveVariantProduct}
                  setSaveVariantId={setSaveVariantId}
                  saveVariantId={saveVariantId}
                  setNotify={setNotify}
                  //

                  promotionId={promotionId}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
