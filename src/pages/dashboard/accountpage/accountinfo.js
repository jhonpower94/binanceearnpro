import React, { useEffect, useContext, useState } from "react";
import clsx from "clsx";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  CardHeader,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  LinearProgress,
  withStyles,
  Avatar,
  Link,
  Box,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { CloseSharp, FileCopySharp } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../../config";
import { ajax } from "rxjs/ajax";
import { orange, yellow } from "@material-ui/core/colors";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: yellow[800],
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    background: theme.palette.secondary.main,
  },
}));

function AccountInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const { currentab, setCurrentab } = useContext(AppContext);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);

  // referral snackber
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const [userAddress, setUserAdress] = useState({
    address: "",
    state: "",
    btcaddress: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [[snackPack, messageInfo, open]]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const onChangeAddress = (e) => {
    setUserAdress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddress = (e) => {
    e.preventDefault();
    firestore
      .doc(`users/${userInfos.id}`)
      .update(userAddress)
      .then(() => {
        ajax({
          url: "https://us-central1-bchunters-9ea45.cloudfunctions.net/skimasite/mail",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `${currentStrings.emailmessages.hello} ${userInfos.firstName}, ${currentStrings.emailmessages.accountinfo.text}.`,
            to: `${userInfos.email}, support@exchangetradingzone.com`,
            subject: currentStrings.emailmessages.accountinfo.subject,
          },
        }).subscribe(() => {
          console.log("user message sent");
        });
      });
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} justify="flex-start">
        <Grid item xs={12} sm={8}>
          <CardHeader
            //  avatar={<Avatar className={classes.avatar}>J</Avatar>}
            title={
              <Typography variant="body1">
                {currentStrings.Dashboard.account_info.profile_status}
              </Typography>
            }
            subheader={
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={isNaN(userInfos.btcaddress) ? 70 : 100}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body1">
                    {isNaN(userInfos.btcaddress) ? "70%" : "100%"}
                  </Typography>
                </Box>
              </Box>
            }
          />
        </Grid>
      </Grid>
      <form onSubmit={submitAddress}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={6}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
              disabled
              size="small"
            >
              <InputLabel htmlFor="referral-link">
                {currentStrings.Dashboard.account_info.Referral_link}
              </InputLabel>
              <OutlinedInput
                id="referral-link"
                value={`http://${window.location.hostname}/${userInfos.id}`}
                endAdornment={
                  <InputAdornment position="end">
                    <CopyToClipboard
                      text={`http://${window.location.hostname}/${userInfos.id}`}
                      onCopy={handleClick(
                        currentStrings.Dashboard.account_info.copy_link
                      )}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <FileCopySharp />
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={currentStrings.Dashboard.account_info.name}
              defaultValue={`${userInfos.firstName} ${userInfos.lastName}`}
              variant="outlined"
              size="small"
              name="fullname"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={currentStrings.Dashboard.account_info.mobile}
              defaultValue={`${userInfos.mobilecode} ${userInfos.numberformat}`}
              variant="outlined"
              size="small"
              name="Mobile"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your bitcoin Address"
              defaultValue={userInfos.btcaddress}
              variant="outlined"
              size="small"
              name="btcaddress"
              fullWidth
              required
              onChange={onChangeAddress}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              label="Street Address"
              defaultValue={userInfos.address}
              variant="outlined"
              size="small"
              name="address"
              fullWidth
              required
              onChange={onChangeAddress}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="State/Region"
              id="outlined-size-small"
              defaultValue={userInfos.state}
              variant="outlined"
              size="small"
              name="state"
              fullWidth
              required
              onChange={onChangeAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Update profile
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseSharp />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

export default AccountInfo;

/* const investmentCount = [
    {
      title: currentStrings.Dashboard.account_info.Current_running_investments,
      lenght: 4,
    },
    {
      title: currentStrings.Dashboard.account_info.Matured_investments,
      lenght: 3,
    },
    {
      title: currentStrings.Dashboard.account_info.Total_invested,
      lenght: 5,
    },
    {
      title: currentStrings.Dashboard.account_info.Total_withdrawn,
      lenght: 7,
    },
  ]; */
/*
 {investmentCount.map((data, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{data.title}</Typography>
                }
                secondary={<Typography variant="h5">{data.lenght}</Typography>}
              />
            </ListItem>
          </Grid>
        ))}

        */
