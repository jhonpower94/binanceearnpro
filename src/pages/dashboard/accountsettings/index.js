import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Paper,
  CardHeader,
  Avatar,
  CardContent,
  Button,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText("#fafafa"),
    backgroundColor: "#fafafa",
  },
  mgtop: {
    marginTop: theme.spacing(1),
  },
  mgtopx: {
    marginTop: theme.spacing(3),
  },
}));

function AccountSettings(props) {
  const page = props.page;
  const classes = useStyles();

  const resetPass = (event) => {
    event.preventDefault();
    console.log("password reset");
  };

  const resetEmail = (event) => {
    event.preventDefault();
    console.log("Email reset");
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <CardHeader
            action={
              page == "password" ? (
                <img
                  src={require("../icons/resetpass.svg")}
                  alt="image"
                  width="80"
                />
              ) : (
                <img
                  src={require("../icons/email.svg")}
                  alt="image"
                  width="80"
                />
              )
            }
            title={
              page == "password" ? "Reset password" : "Change email address"
            }
          />
          <CardContent>
            {page == "password" ? (
              <form onSubmit={resetPass}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter Email Address"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.mgtopx}
                  fullWidth
                >
                  Request for password reset
                </Button>
              </form>
            ) : (
              <form onSubmit={resetEmail}>
                <TextField
                  fullWidth
                  className={classes.mgtop}
                  id="outlined-basic"
                  label="Enter new Email Address"
                />
                <TextField
                  fullWidth
                  className={classes.mgtop}
                  id="outlined-basic"
                  label="Enter your password"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.mgtopx}
                  fullWidth
                >
                  Proceed
                </Button>
              </form>
            )}
          </CardContent>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default AccountSettings;
