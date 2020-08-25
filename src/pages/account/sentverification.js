import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { loading$ } from "../../redux/action";
import firebase, { auth } from "../../config";

import {
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margintop: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
  },
  text: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function VerifyEmailSent(props) {
  const classes = useStyles();
  const { email } = props;
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.avatar}>
          <img
            src={require("../../images/logodesktop.svg")}
            height={
              useMediaQuery(useTheme().breakpoints.up("sm")) ? "100px" : "80px"
            }
          />
        </div>
        <Typography component="h1" variant="h5">
          Verification Sent
        </Typography>
        <Typography variant="subtitle1" align="center">
          {`An email verification link has been sent to ${email}`}
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.margintop}
        >
          <Typography variant="subtitle1" align="center">
            Email vrified ? {""}
            <Link
              variant="body1"
              color="primary"
              onClick={() => navigate("../../dashboard")}
              className={classes.margintop}
            >
              proceed to account
            </Link>
          </Typography>
          <Typography variant="subtitle2" align="center">
              did not recieve email verification message {""}
          <Link
            variant="body1"
            color="primary"
            onClick={() => navigate("../verifyemail")}
            className={classes.margintop}
          >
            resend
          </Link>
          </Typography>
        </Box>
      </div>
    </Container>
  );
}

export default VerifyEmailSent;
