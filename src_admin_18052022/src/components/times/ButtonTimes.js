import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export const ButtonTimes = ({ name, label, times, setTimes }) => {
  var today = new Date();
  var eToday = new Date();

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var mm1 = String(today.getMonth() + 2).padStart(2, "0"); //January is 0!

  var mm2 = mm1 - 12; //January is 0!
  var yyyy = today.getFullYear();
  var yyyy1 = today.getFullYear() + 1;

  // today = dd + '-' + mm + '-' + yyyy;
  today = yyyy + "-" + mm + "-" + dd + "T00:00:00";
  eToday =
    mm1 > 12
      ? yyyy1 + "-" + mm2 + "-" + dd + "T00:00:00"
      : yyyy + "-" + mm1 + "-" + dd + "T00:00:00";

  const [value, setValue] = useState(today);

  const handleChange = (newValue) => {
    setValue(newValue);
    let today = new Date();
    let dd = String(newValue.getDate()).padStart(2, "0");
    let mm = String(newValue.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = newValue.getFullYear();
    // today = dd + '-' + mm + '-' + yyyy;
    today = yyyy + "-" + mm + "-" + dd + "T00:00:00";

    console.log("button times", today);

    setValue(today);
    setTimes({
      ...times,
      day: dd,
      month: mm,
      year: yyyy,
      full: mm + "/" + dd + "/" + yyyy,
      fullYear: mm + "/" + dd + "/" + yyyy + "T00:00:00",
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          name={name || "sToday"}
          label={label || "Format - Tháng/Ngày/Năm"}
          inputFormat="MM/dd/yyyy"
          value={times?.full ? times?.full : value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};
