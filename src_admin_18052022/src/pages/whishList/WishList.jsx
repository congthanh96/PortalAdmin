import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import _ from "lodash";
import debounce from "lodash.debounce";
import SearchBar from "material-ui-search-bar";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createSiteSellerApi } from "../../api/private";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { fetchProducts, fetchUser } from "../../reducers";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";
import "./productList.css";
//2022/04/13 Huynh-dt export file ADD
import CustomToolbar from "../../components/ToolbarExportToCSV/CustomToolbar";
//2022/04/13 Huynh-dt export file ADD

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },

  fabProgress: {
    color: green[500],
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  options: {
    minHeight: 40,
  },
}));

export default function WhishList() {
  let successLoading = "Loading page success!";
  let successGHTK = "Loading ghtk success!";
  let success = "Thêm sản phẩm yêu thích thành công!";
  let error = "Thêm sản phẩm yêu thích thất bại!";
  let warning = "Thêm sản phẩm yêu thích";

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  let { codeSeller } = useParams();

  const history = useHistory();
  const classes = useStyles();

  const { orders, isLoading } = useSelector((state) => state.order);
  const fetchData = useSelector((state) => state.user.listUser);

  const [rows, setRows] = useState([]);

  const [isDev, setIsDev] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeBtn, setActiveBtn] = useState(0);

  const [pageSize, setPageSize] = useState(10);
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

  const [sortModel, setSortModel] = useState([{ field: "id", sort: "desc" }]);
  const [sortProducts, setSortProducts] = useState([
    { field: "id", sort: "desc" },
  ]);
  const [sortUser, setSortUser] = useState([{ field: "code", sort: "desc" }]);

  const onClick = async (id, index) => {
    if (codeSeller !== undefined) {
      history.push("/orders");
    }

    setLoading(true);
    setActiveBtn(index);
    setIsDev(!isDev);

    switch (index) {
      case 0:
        getListSiteRegister();

        break;

      case 1:
        getListSiteRegisterActive();

        break;

      case 2:
        setConfirmDialog({
          isOpen: true,
          title: "Thực hiện sẽ không thể thay đổi hoặc thay đổi rất phức tạp!",
          subTitle: "Chắc chắn?",
          onConfirm: () => {
            handleFinal();
          },
        });
        break;

      default:
        break;
    }

    setLoading(false);
  };
  const downCategory = [
    { id: "All", name: "Danh sách sản phẩm", index: 0 },
    { id: "GHTK", name: "Danh sách Seller", index: 1 },
    { id: "create-site", name: "Hoàn thành", index: 2 },
  ];

  const [searched, setSearched] = useState(codeSeller || "");

  const requestSearch = (searchedVal) => {
    console.log(orders);
    if (orders.length === 0 || orders.length === undefined) return;
    const filteredRows = orders.filter((row) => {
      return (
        row.code?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.fullName?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.updater?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.codeSeller?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });

    setRows(filteredRows);

    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setRows(orders);
  };

  // 0604
  // GHTK
  useEffect(() => {
    getListSiteRegister();
  }, []);

  const getListSiteRegister = async () => {
    try {
      const response = await createSiteSellerApi.getListRegister();
      setRows(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getListSiteRegisterActive = async () => {
    try {
      const response = await createSiteSellerApi.getListRegisterActive();
      setRows(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinal = async () => {
    closeSnackbar();
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    if (checkProducts.length === 0) {
      enqueueSnackbar("Vui lòng chọn danh sách sản phẩm", {
        variant: "warning",
      });
      return;
    }
    if (checkUsers.length === 0) {
      enqueueSnackbar("Vui lòng chọn danh sách Seller!", {
        variant: "warning",
      });
      return;
    }
    try {
      // CALL API HERE
      // let data = { sellerIds: checkUsers, productIds: checkProducts }
      const response = await createSiteSellerApi.adminAddToSeller(
        JSON.stringify({ sellerIds: checkUsers, productIds: checkProducts })
      );
      console.log("response", response);
      enqueueSnackbar(success, {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };

  const handleAdminCreateSite = async () => {
    closeSnackbar();

    try {
      // CALL API HERE
      const idUser = "afb09d7a-9ca4-46ca-bb30-0400d8fdb475";
      const data = {
        url: "vanslug3",
        shopName: "vanshop4",
      };
      const response = await createSiteSellerApi.adminCreate(idUser, data);
      console.log("response", response);
      enqueueSnackbar(success, {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };
  const [dataSite, setDataSite] = useState({
    url: "",
    shopName: "",
  });

  const [_isLoading, setIsLoading] = useState(false);
  const debouncedSave = useRef(
    debounce((name, value) => saveChangeInput(name, value), 1000)
  ).current;
  const handleChangeInput = (event) => {
    setIsLoading(true);
    const { value: value, name: name } = event.target;
    dataSite[name] = value;

    debouncedSave(name, value);
  };
  const saveChangeInput = (name, value) => {
    try {
      // setDataSite({
      //   ...dataSite,
      //   [name]: value,
      // })
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };

  const handleCreateSite = async () => {
    console.log(_isLoading);
    setIsLoading(true);
    closeSnackbar();
    console.log(dataSite);
    console.log(infoUser?.id);
    console.log(!infoUser);

    if (infoUser?.id === undefined) {
      enqueueSnackbar("Vui lòng chọn thông tin Seller!", {
        variant: "warning",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    if (dataSite.shopName.length === 0 || dataSite.url.length === 0) {
      enqueueSnackbar(warning, {
        variant: "warning",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      console.log(dataSite);
      const idUser = "afb09d7a-9ca4-46ca-bb30-0400d8fdb475";
      const response = await createSiteSellerApi.adminCreate(
        infoUser?.id,
        dataSite
      );
      console.log("response create site", response);
      enqueueSnackbar(success, {
        variant: "success",
      });

      setInfoUser({});
    } catch (error) {
      const err = "Lỗi cú pháp";
      console.log("Failed to create Page error: ", error);
      console.log("Failed to create Page error: ", err);
      enqueueSnackbar(err, {
        variant: "error",
      });
      setIsLoading(false);
      return Promise.reject(err);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (fetchData.length === 0) {
      dispatch(fetchUser());
    }
  }, []);
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    console.log(infoUser);
  }, [infoUser]);

  // PRODUCT
  const allProducts = useSelector((state) => state.product.products);
  const [products, setProducts] = useState(allProducts || []);
  // USER
  const fetchUsers = useSelector((state) => state.user.listUser);
  const [users, setUsers] = useState(fetchUsers || []);

  const [checkProducts, setCheckProducts] = useState([]);
  const [checkUsers, setCheckUsers] = useState([]);
  const [checkAll, setCheckAll] = useState([]);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts(500, 1));
    }
  }, []);
  useEffect(() => {
    if (allProducts.length !== 0) {
      setProducts(allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    if (fetchUsers.length === 0) {
      dispatch(fetchUser());
    }
  }, []);
  useEffect(() => {
    if (fetchUsers.length !== 0) {
      setUsers(fetchUsers);
    }
  }, [fetchUsers]);

  const rowProduct = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product",
      width: 600,
      //2022/04/13 Huynh-dt export file ADD
      valueFormatter: ({ value }) => `${value}`,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.link} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
  ];
  const rowUser = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "createTime", headerName: "Thời gian tạo", width: 110 },
    {
      field: "code",
      headerName: "Mã CTV",
      width: 150,
    },

    { field: "email", headerName: "Email", width: 250 },
    {
      field: "firstName",
      headerName: "Họ tên",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <span>
              {params.row.firstName !== null && params.row.lastName
                ? params.row.firstName + " " + params.row.lastName
                : `-`}
            </span>
          </>
        );
      },
    },
    { field: "iDrecommend", headerName: "Người giới thiệu", width: 130 },
    { field: "phone", headerName: "phone", width: 120 },
  ];

  return (
    <div className="productList h-100">
      <>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="product-list-header">
          <div className="header-left">
            {downCategory.map((value, index) => (
              <ButtonComponent
                key={index}
                color={activeBtn === index ? "primary" : "default"}
                variant={"contained"}
                onClick={() => onClick(value.id, index)}
                loading={loading}
                name={value.name}
                mr={8}
                mb={4}
              />
            ))}
          </div>

          <div className="header-right">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              style={{
                width: 230,
                height: 35,
                marginRight: 10,
                marginBottom: 10,
              }}
              placeholder="Mã đơn hàng, tên người nhận, tên người duyệt"
            />
          </div>
        </div>
        {isLoading ? (
          <ColoredLinearProgress />
        ) : (
          <>
            <>
              Products: {checkProducts.length}
              User: {checkUsers.length}
            </>

            <DataGrid
              rows={products || []}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              columns={rowProduct}
              checkboxSelection
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              sortModel={sortProducts}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = products.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                setCheckProducts(selectedRowData.map((value) => value.id));
              }}
              onSortModelChange={(model) => {
                if (!_.isEqual(model, sortProducts)) {
                  setSortProducts(model);
                }
              }}
              //2022/04/13 Huynh-dt export file ADD
              components={{
                Toolbar: () => CustomToolbar("WishList"),
              }}
              //2022/04/13 Huynh-dt export file ADD
            />

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <h2>Danh sách Seller</h2>
            </div>
            <DataGrid
              rows={users || []}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              columns={rowUser}
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = users.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                setCheckUsers(selectedRowData.map((value) => value.id));
              }}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              sortModel={sortUser}
              onSortModelChange={(model) => {
                if (!_.isEqual(model, sortUser)) {
                  console.log("đã chạy !");
                  setSortUser(model);
                }
              }}
              //2022/04/13 Huynh-dt export file ADD
              components={{
                Toolbar: () => CustomToolbar("Seller List"),
              }}
              //2022/04/13 Huynh-dt export file ADD
            />
          </>
        )}
      </>
    </div>
  );
}
