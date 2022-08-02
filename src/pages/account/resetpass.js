import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import React, { useEffect } from "react";
import firebase, { auth } from "../../config";

import { Snackbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { loading$ } from "../../redux/action";
import Copyright from "./copyright";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margintop: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  fontsize: {
    fontSize: "large",
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const [values, setValues] = React.useState({
    email: "",
  });

  const [state, setState] = React.useState({
    open: false,
    loading: false,
    vertical: "top",
    horizontal: "center",
    severity: "",
    message: "",
  });

  const { vertical, horizontal, open, loading, severity, message } = state;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const resetpass = (event) => {
    event.preventDefault();
   // dispatch(loading$());

   setState({ ...state, loading: true });

    auth.sendPasswordResetEmail(values.email).then(() => {
     // dispatch(loading$());
      setState({ ...state, open: true, loading: false, severity: "success", message: "Your password reset link has been sent to your email." });
      console.log("sent");
    }).catch(err=>{
      setState({ ...state, open: true, loading: false, severity: "warning", message: err.message });
      console.log(err)});
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setValues({
          ...values,
          email: user.email,
        });
      } else {
        return null;
      }
    });
  }, []);

  return (
    <>
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
            {currentStrings.account.reset_pass.title}
          </Typography>
          <form className={classes.form} onSubmit={resetpass}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={currentStrings.account.email}
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {currentStrings.account.reset_pass.title}
            </Button>
            <Grid container>
              <Grid item xs>
                <Box display="flex" justifyContent="center">
                  <Link
                    to="../"
                    className={clsx(classes.link, classes.fontsize)}
                    color="primary"
                  >
                    {currentStrings.account.signin.title}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          // message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
