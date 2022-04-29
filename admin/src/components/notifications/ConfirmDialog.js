import React, {useState} from "react";
import {
  Snackbar,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ButtonComponent } from "../../_constants/UI/button/ButtonComponent";
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogAction: {
    justifyContent: "center",
    
  },
  subTitle: {textAlign: 'center', padding: 20}
}));
function Notifications({
  title,
  subTitle,
  color,
  confirmDialog,
  setConfirmDialog,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle></DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2"  className={classes.subTitle}>{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
       
        <ButtonComponent
          color={"default"}
          variant={"contained"}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          loading={loading}
          name={"Hủy/ Thoát"}
        />
        <ButtonComponent
          color={"primary"}
          variant={"contained"}
          onClick={confirmDialog.onConfirm}
          loading={loading}
          name={"Thực hiện"}
          
          />
      </DialogActions>
    </Dialog>
  );
}

export default Notifications;
