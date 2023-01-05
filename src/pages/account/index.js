import {
  Backdrop, CssBaseline,
  makeStyles
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/loader";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


function AccountLayout(props) {
  const classes = useStyles();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    console.log(loading.loading);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      {props.children}

      <Backdrop className={classes.backdrop} open={loading.loading}>
        <CustomLoader
         />
      </Backdrop>
    </React.Fragment>
  );
}

export default AccountLayout;
