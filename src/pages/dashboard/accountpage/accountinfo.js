import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Card,
  CardContent,
  LinearProgress,
  withStyles,
  Avatar,
  Link,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import { FileCopySharp, VerifiedUserSharp } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";

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
    backgroundColor: "#1a90ff",
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
  const currentStrings = useSelector((state) => state.language);
  const { currentab, setCurrentab } = useContext(AppContext);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);

  // referral snackber
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} justify="center">
        <Grid item xs={12} sm={8}>
          <CardHeader
            avatar={<Avatar className={classes.avatar}>J</Avatar>}
            title={
              <Typography variant="body1">
                {currentStrings.Dashboard.account_info.profile_status}
              </Typography>
            }
            subheader={
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body2">50%</Typography>
                </Box>
              </Box>
            }
          />
        </Grid>
      </Grid>
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
              value={`http://${window.location.hostname}/account/register/${userInfos.id}`}
              endAdornment={
                <InputAdornment position="end">
                  <CopyToClipboard
                    text={`http://${window.location.hostname}/account/register/${userInfos.id}`}
                    onCopy={handleClick("Link copied")}
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
            label="Full name"
            defaultValue="Jhon snow"
            variant="outlined"
            size="small"
            name="fullname"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mobile"
            defaultValue="+2348065322234"
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
            defaultValue=""
            variant="outlined"
            size="small"
            name="btcaddress"
            fullWidth
            required
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
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="State/Region"
            id="outlined-size-small"
            defaultValue=""
            variant="outlined"
            size="small"
            name="state"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="outlined" fullWidth color="inherit">
            Update profile
          </Button>
        </Grid>
      </Grid>
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
