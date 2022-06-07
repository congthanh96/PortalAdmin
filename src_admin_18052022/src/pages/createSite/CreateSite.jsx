import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import debounce from "lodash.debounce";
import SearchBar from "material-ui-search-bar";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createSiteSellerApi } from "../../api/private";
import { ButtonLoading } from "../../components/common/buttons";
import ConfirmDialog from "../../components/notifications/ConfirmDialog";
import Notification from "../../components/notifications/Notifications";
import { fetchUser } from "../../reducers";
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

export default function GhtkList() {
  let successLoading = "Loading page success!";
  let successGHTK = "Loading ghtk success!";
  let success = "Gửi yêu cầu tạo Domain thành công!";
  let error = "Gửi yêu cầu tạo Domain thất bại!";
  let warning = "Vui lòng chọn tên Domain";

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

  const [sortModel, setSortModel] = useState([{ field: "url", sort: "desc" }]);

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

      default:
        break;
    }

    setLoading(false);
  };
  const downCategory = [
    { id: "All", name: "Đăng ký", index: 0 },
    { id: "GHTK", name: "Kích hoạt", index: 1 },
    { id: "create-site", name: "Admin Tạo Site", index: 2 },
  ];

  const columns = [
    { field: "isActive", headerName: "ID", width: 90, hide: true },
    { field: "isActive", headerName: "Trạng thái", width: 150 },
    { field: "sellerName", headerName: "Thông tin Seller", width: 300 },
    { field: "shopName", headerName: "Tên Shop", width: 150 },
    { field: "url", headerName: "Tên domain", width: 400 },

    {
      field: "",
      headerName: "Actions",
      width: 200,
      //2022/04/13 Huynh-dt export file ADD
      disableExport: true,
      //2022/04/13 Huynh-dt export file ADD
      renderCell: (params) => {
        return (
          <>
            {activeBtn !== 1 && (
              <>
                <button
                  className="productListEdit"
                  onClick={() => handleActiveSite(params.row.url)}
                >
                  Kích hoạt
                </button>

                {/* <button className="productListEdit" onClick={() => handleAdminCreateSite()}>
                  Tạo Site
                </button> */}
              </>
            )}
          </>
        );
      },
    },

    // {
    //   field: 'url',
    //   headerName: 'Mã Đơn Hàng',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={'/active/' + 1}>
    //           <button className={true ? 'orderListEditDev' : 'orderListEdit'}>{params.url}</button>
    //         </Link>
    //       </>
    //     )
    //   },
    // },
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

  const handleActiveSite = async (url) => {
    console.log("url", url);
    closeSnackbar();
    if (url === undefined) {
      enqueueSnackbar(warning, {
        variant: "warning",
      });
      return;
    }
    try {
      // CALL API HERE

      const response = await createSiteSellerApi.activeSite(url);
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

  console.log(fetchData);
  useEffect(() => {
    if (fetchData.length === 0) {
      dispatch(fetchUser());
    }
  }, []);
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
      label: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      label: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
      label: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
      label: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
      label:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
      label: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
      label: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
  ];
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    console.log(infoUser);
  }, [infoUser]);

  return (
    <div className="productList">
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
                mr={6}
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
            {activeBtn === 2 ? (
              <div className="newee-create-page">
                <div className="container-form h-500">
                  <div className="form">
                    <div className="header d-flex-space-between-center">
                      <div className="header-go-back text-center"></div>
                      <div className="header-title text-center">
                        Đăng ký Domain
                      </div>
                      <div className="header-info"></div>
                    </div>
                    <div className="body">
                      <div className="pb-2">
                        <label htmlFor="sub">Tên Seller</label>
                      </div>
                      <div className="custom-auto mb-2">
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={fetchData?.map((value) => ({
                            label: value.email,
                            id: value.id,
                            code: value.code,
                            name: value.firstName + value.lastName,
                          }))}
                          sx={{ width: 400 }}
                          onChange={(event, value) => setInfoUser(value)}
                          renderInput={(params) => (
                            <TextField {...params} label="Thông tin Seller" />
                          )}
                        />
                        {infoUser?.label && (
                          <div className="p-container">
                            <p>Email: {infoUser.label}</p>
                            <p>Mã CTV: {infoUser.code}</p>
                            <p>Tên: {infoUser.name}</p>
                          </div>
                        )}
                      </div>

                      <div className="pb-2">
                        <label htmlFor="sub">Tên sub Domain</label>
                      </div>
                      <div className="custom-input mb-2">
                        <input
                          id="url"
                          name="url"
                          type="text"
                          placeholder="Nhập tên domain của đối tác..."
                          onChange={(e) => handleChangeInput(e)}
                          // value={dataSite.url}
                        />
                      </div>

                      <div className="pb-2">
                        <label htmlFor="shopName">Tên Shop</label>
                      </div>
                      <div className="custom-input">
                        <input
                          id="shopName"
                          name="shopName"
                          type="text"
                          placeholder="Nhập tên Shop của đối tác..."
                          onChange={(e) => handleChangeInput(e)}
                          // value={dataSite.shopName}
                        />
                      </div>
                    </div>
                    <div className="footer">
                      <ButtonLoading
                        isLoading={_isLoading}
                        text="Đăng ký Domain"
                        handleClick={handleCreateSite}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DataGrid
                rows={rows}
                getRowId={(row) => row.url}
                disableSelectionOnClick
                columns={columns}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 25, 50, 100]}
                pagination
                sortModel={sortModel}
                onSortModelChange={(model) => {
                  if (!_.isEqual(model, sortModel)) {
                    console.log("đã chạy !");
                    setSortModel(model);
                  }
                }}
                //2022/04/13 Huynh-dt export file ADD
                components={{
                  Toolbar: () => CustomToolbar("Create site"),
                }}
                //2022/04/13 Huynh-dt export file ADD
              />
            )}
          </>
        )}
      </>
    </div>
  );
}
