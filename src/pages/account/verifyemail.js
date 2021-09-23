import React, { useEffect, useContext, useState } from "react";
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

function VerifyEmail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendEmail = () => {
  //  auth.languageCode = "fr";
    auth.currentUser
      .sendEmailVerification()
      .then(function Copyright() {
        console.log("email sent");
        navigate(`emailsent/${email}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("../account");
      } else {
        setEmail(user.email);
        if (user.emailVerified) {
          navigate("../dashboard");
        } else {
          return null;
        }
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.avatar}>
          <img
            src={require("../../images/logomobile.svg")}
            height={
              useMediaQuery(useTheme().breakpoints.up("sm")) ? "80px" : "80px"
            }
          />
        </div>
        <Typography component="h1" variant="h5">
          verify email
        </Typography>
        <Typography variant="subtitle1" align="center">
          {`Click on the Send verification link button below to send verification link to`}
        </Typography>
        <Typography color="textSecondary">{email}</Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.margintop}
        >
          <Link
            variant="body1"
            color="primary"
            onClick={sendEmail}
            className={classes.margintop}
          >
            Send verification link
          </Link>
        </Box>
      </div>
    </Container>
  );
}

export default VerifyEmail;
