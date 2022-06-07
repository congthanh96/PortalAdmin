import { useEffect } from "react";
import "./reportList.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchReports } from "../../reducers";

import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
import ColoredLinearProgress from "../../_constants/UI/button/LineProgress";

export default function ReportList() {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.report.reports);
  const isLoading = useSelector((state) => state.report.isLoading);
  const [data, setData] = useState(productRows);
  console.log("data", productRows);
  useEffect(() => {
    if (allData.length === 0) {
      dispatch(fetchReports("09", "2021"));
    }
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const formatVND = (currentAmout) => {
    const newAmount = currentAmout / 1;
    // setMoney(newAmount);
    return newAmount.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const columns = [
    { field: "codeSeller", headerName: "CodeSeller", width: 120 },
    { field: "codeReferal", headerName: "MGT", width: 120 },
    { field: "fullName", headerName: "Tên", width: 200 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "phone", headerName: "SDT", width: 120 },
    {
      field: "revenueSale",
      headerName: "Tổng doanh thu",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.revenueSale)}</>;
      },
    },
    {
      field: "bonusSale",
      headerName: "HH Cá nhân",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusSale)}</>;
      },
    },
    {
      field: "bonusSellerDown",
      headerName: "Thưởng nhóm",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusSellerDown)}</>;
      },
    },
    {
      field: "bonusRank",
      headerName: "HH Rank",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.bonusRank)}</>;
      },
    },
    {
      field: "other",
      headerName: "Khác",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.other)}</>;
      },
    },
    {
      field: "sumbonus",
      headerName: "TN Tháng",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.sumbonus)}</>;
      },
    },
    {
      field: "leftMoney",
      headerName: "Số dư Ví",
      width: 140,
      align: "right",
      renderCell: (params) => {
        return <>{formatVND(params.row.leftMoney)}</>;
      },
    },

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
          </>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); //3 seconds
  };

  return (
    <div className="productList">
      {isLoading ? (
        <ColoredLinearProgress />
      ) : (
        <>
          <ButtonComponent
            color={"primary"}
            variant={"contained"}
            onClick={onClick}
            loading={loading}
            name={"Báo cáo tháng 8"}
          />
          <ButtonComponent
            color={"primary"}
            variant={"contained"}
            onClick={onClick}
            loading={loading}
            name={"Báo cáo tháng 9"}
          />

          <DataGrid
            rows={allData}
            getRowId={(row) => row.codeSeller}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </>
      )}
      {/* 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string */}
      {/* 'small' | 'medium' | 'large' | string */}
      {/* 'contained' | 'outlined' | 'text' | string */}
    </div>
  );
}
