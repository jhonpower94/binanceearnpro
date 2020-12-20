import React, { useEffect } from "react";
import {
  Card,
  Grid,
  ListItem,
  CardHeader,
  Avatar,
  Paper,
  Typography,
  Box,
  ListItemText,
  Container,
  makeStyles,
  Divider,
  CardContent,
  ListItemAvatar,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { ArrowUpwardSharp, VerifiedUserSharp } from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import WithdrawTable from "../component/trnanstble/withdrawtable";
import DepositTable from "../component/trnanstble/depositable";
import { useSelector } from "react-redux";
import { red } from "@material-ui/core/colors";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  cardone: {
    position: "absolute",
    top: "-10px",
    background: theme.palette.background.default,
    left: "65px",
  },
  cardtwoe: {
    position: "absolute",
    top: "-10px",
    background: theme.palette.background.default,
    right: "65px",
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // Purple and green play nicely together.
      main: red[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#fff",
    },
    /*  background: {
      default: "#fff",
    }, */
    action: {
      selected: "#2196f33d",
    },
  },
});

function Activities() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  useEffect(() => {}, []);

  const TransactionAray = [
    {
      name: currentStrings.homepage.activities.deposit,
      datas: <DepositTable />,
    },
    {
      name: currentStrings.homepage.activities.withdrawal,
      datas: <WithdrawTable />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          {TransactionAray.map((trans, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Card variant="outlined" style={{ background: "transparent" }}>
                <div
                  className={
                    trans.name === currentStrings.homepage.activities.deposit
                      ? classes.cardone
                      : classes.cardtwoe
                  }
                >
                  <CardHeader
                    title={trans.name}
                    subheader={currentStrings.homepage.activities.subheader}
                    titleTypographyProps={{
                      align: "center",
                    }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                  />
                </div>

                <CardContent>{trans.datas}</CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Activities;

/* 
{trans.datas.map((data, index) => (
              <ListItem key={index}>
                <ListItemText primary={data.name} />
                <Typography variant="h5">{`$ ${data.amount}`}</Typography>
              </ListItem>
            ))}

               
              */
