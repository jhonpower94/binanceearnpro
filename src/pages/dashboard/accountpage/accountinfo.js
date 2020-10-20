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
} from "@material-ui/core";
import { FileCopySharp } from "@material-ui/icons";
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
}));

function AccountInfo() {
  const classes = useStyles();
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

  const profileData = [
    {
      title: "Total profit",
      value: "$000",
    },
    {
      title: "Total investment",
      value: "$000",
    },
    {
      title: "Total withdrawn",
      value: "$000",
    },
    {
      title: "Total bonus earned",
      value: "$000",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} >
        {profileData.map((data, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <ListItemText
              primary={
                <Typography variant="subtitle2">{data.title}</Typography>
              }
              secondary={<Typography variant="h5">{data.value}</Typography>}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={3}>
          <CardHeader
          avatar={
            <Avatar>J</Avatar>
          }
            title={
              <Typography variant="subtitle2">Account profile</Typography>
            }
            subheader={
              <BorderLinearProgress variant="determinate" value={50} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <List>
            {[
              { from: "jhon snow", date: "12/9/2020", deposit_amount: "$500" },
              { from: "jhon snow", date: "12/9/2020", deposit_amount: "$500" },
              { from: "jhon snow", date: "12/9/2020", deposit_amount: "$500" },
              { from: "jhon snow", date: "12/9/2020", deposit_amount: "$500" },
            ].map((data, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={data.from}
                  secondary={`@ ${data.date}`}
                />
                <Typography variant="h6">{data.deposit_amount}</Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          >
            <InputLabel htmlFor="referral-link">Referral link</InputLabel>
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
      </Grid>
    </Container>
  );
}

export default AccountInfo;
