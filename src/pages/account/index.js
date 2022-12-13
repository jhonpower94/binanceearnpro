import { css } from "@emotion/core";
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  makeStyles
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomLoader from "../../components/loader";

const override = css`
  display: block;
  margin: 0 auto;
  top: 15em;
`;

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: theme.palette.primary.main,
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

function AccountLayout(props) {
  const classes = useStylesFacebook();
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
