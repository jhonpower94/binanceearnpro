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
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  FilterListRounded,
  ExpandLess,
  ExpandMore,
  AddCircleSharp,
} from "@material-ui/icons";
import { blocks } from "../../../service/tradeblocks";
import Pagnition from "../../../components/pagination";
import { useSelector, useDispatch } from "react-redux";
import { blocks$ } from "../../../redux/action";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of, from, Observabl } from "rxjs";
import Axios from "axios-observable";
import { data } from "currency-codes";
import { navigate } from "@reach/router";
import { Converter } from "easy-currencies";
import getSymbolFromCurrency from "currency-symbol-map";
import { reactLocalStorage } from "reactjs-localstorage";
var getCountry = require("country-currency-map").getCountry;
var formatLocaleCurrency = require("country-currency-map").formatLocaleCurrency;

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
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
const currencyCode = JSON.parse(window.localStorage.getItem("country"))
  .currencycode;

function Invest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    paymentInfo,
    MinDeposits,
    setMinDeposit,
    setPaymentInfo,
  } = useContext(AppContext);

  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(8);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [arrays, setArrays] = useState(blocks);

  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = blocks.slice(indexofFirstpage, indexofLastpost);

  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortFromHighest = () => {
    blocks.sort((a, b) => {
      return b.minimum_stake - a.minimum_stake;
    });
    setArrays([...blocks]);
  };
  const sortFromLowest = () => {
    blocks.sort((a, b) => {
      return a.minimum_stake - b.minimum_stake;
    });
    setArrays([...blocks]);
  };

  const addTrade = (index, data) => {
    console.log(data);
    setPaymentInfo({ ...paymentInfo, block: data, blockindex: index });
    navigate("invoice");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
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

        <Grid container spacing={5} justify="center">
          {currentPost.map((trade, index) => (
            <Fade
              in={true}
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Grid item xs={12} sm={4}>
                <Paper className={classes.column}>
                  <div className={classes.headerbg}>
                    <CardHeader
                      avatar={
                        <Avatar className={classes.avatar}>
                          <Typography>&#128176;</Typography>
                        </Avatar>
                      }
                      action={
                        <Typography variant="h6">{trade.name}</Typography>
                      }
                    />
                  </div>

                  <List>
                    <ListItem>
                      <ListItemText primary="Minimun stake" />
                      <Typography variant="h5">
                        {formatLocaleCurrency(trade.lot, currencyCode, {
                          autoFixed: false,
                        })}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Return rate" />
                      <Typography variant="h5">{`${trade.rate} %`}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Duration" />
                      <Typography variant="h5">{`${trade.duration} hrs`}</Typography>
                    </ListItem>
                    <ListItem>
                      <Button
                        startIcon={<AddCircleSharp />}
                        variant="text"
                        className={classes.mgtopx}
                        fullWidth
                        onClick={() => addTrade(index, trade)}
                      >
                        Add new trade
                      </Button>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Invest;
