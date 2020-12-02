import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../App";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../../App.css";
import {
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  ListItemAvatar,
  Avatar,
  Fade,
  List,
  Box,
  CardHeader,
  Card,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  Divider,
  CardActions,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  FilterListRounded,
  ExpandLess,
  ExpandMore,
  AddCircleSharp,
  Star,
} from "@material-ui/icons";
import { blocks } from "../../../service/tradeblocks";
import Pagnition from "../../../components/pagination";
import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of, from, Observabl } from "rxjs";
import Axios from "axios-observable";
import { data } from "currency-codes";
import { navigate } from "@reach/router";
import { Converter } from "easy-currencies";
import getSymbolFromCurrency from "currency-symbol-map";
import { reactLocalStorage } from "reactjs-localstorage";
import { Rating } from "@material-ui/lab";
var getCountry = require("country-currency-map").getCountry;
var formatLocaleCurrency = require("country-currency-map").formatLocaleCurrency;

const useStyles = makeStyles((theme) => ({
  column: {
    background: "transparent",
  },
  row: {
    display: "flex",
  },
  margin: {
    margin: theme.spacing(1),
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  right: {
    position: "relative",
    top: "6em",
    marginRight: theme.spacing(2),
  },
  space: {
    flexGrow: 1,
  },
  headerbg: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#ef6c00"),
  },
  avatar: {
    background: "#fafafa",
    color: "#000000",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

function InvestNew() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const { paymentInfo, setPaymentInfo, setCurrentab } = useContext(AppContext);

  const arrays = [
    {
      name: "Plan 1",
      title: currentStrings.Dashboard.invest.plan_title.a,
      rate: 6,
      min_rate: 10,
      max_rate: 25,
      duration: 24,
      lot: 50,
      max: 3000,
      hrs: 24,
    },
    {
      name: "Plan 2",
      title: currentStrings.Dashboard.invest.plan_title.b,
      rate: 12,
      min_rate: 35,
      max_rate: 50,
      duration: 24,
      lot: 500,
      max: 5000,
      hrs: 24,
    },
    {
      name: "Plan 3",
      title: currentStrings.Dashboard.invest.plan_title.c,
      rate: 15,
      min_rate: 60,
      max_rate: 95,
      duration: 34,
      lot: 1000,
      max: 30000,
      hrs: 34,
    },
  ];

  const addTrade = (index, data) => {
    console.log(data);
    setPaymentInfo({ ...paymentInfo, block: data, blockindex: index });
    navigate("/dashboard/invoice");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(1));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={5} justify="center">
          {arrays.map((trade, index) => (
            <Fade
              in={true}
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" className={classes.column}>
                  <CardHeader
                    title={trade.title}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    subheader={
                      <Rating
                        name="read-only"
                        value={index + 3}
                        readOnly
                        size="small"
                      />
                    }
                  />

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="baseline"
                  >
                    <Typography component="h2" variant="h3">
                      {`${trade.min_rate} - ${trade.max_rate} `}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      %
                    </Typography>
                  </Box>
                  <List>
                    <Divider variant="inset" component="li" />

                    <ListItem>
                      <ListItemText
                        primary={currentStrings.Dashboard.invest.duration}
                        secondary={`${trade.hrs} %`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={currentStrings.Dashboard.invest.Minimun_stake}
                        secondary={formatLocaleCurrency(trade.lot, "USD", {
                          autoFixed: false,
                        })}
                      />
                    </ListItem>

                    <CardActions>
                      <Button
                        variant="outlined"
                        className={classes.mgtopx}
                        fullWidth
                        onClick={() => addTrade(index, trade)}
                      >
                        {currentStrings.Dashboard.invest.action}
                      </Button>
                    </CardActions>
                  </List>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default InvestNew;

/*
custom filter and pagnation

<div className={classes.margin}>
          <Button
            startIcon={<FilterListRounded />}
            endIcon={open ? <ExpandLess /> : <ExpandMore />}
            onClick={handleClick}
          >
            sort by
          </Button>
          <StyledMenu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {[
              {
                title: "Highest",
                click: sortFromHighest,
              },
              {
                title: "Lowest",
                click: sortFromLowest,
              },
            ].map((opt, index) => (
              <MenuItem
                onClick={() => {
                  opt.click();
                  handleClose();
                }}
                key={index}
              >
                <ListItemText primary={opt.title} />
              </MenuItem>
            ))}
          </StyledMenu>
          <span className={classes.space} />
          <Pagnition
            postperpage={postperpage}
            totalpost={arrays.length}
            paginate={paginate}
          />
        </div>
*/
