import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../../App.css";
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Fade,
  List,
  Box,
  CardHeader,
  Card,
  Divider,
  CardActions,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import { navigate } from "@reach/router";
import { Converter } from "easy-currencies";
import { Rating } from "@material-ui/lab";
import { investmentplans } from "../../../service/plansashboard";
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

function InvestNew() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const dispatch = useDispatch();
  const { paymentInfo, setPaymentInfo } = useContext(AppContext);

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
        <Box display="flex" justifyContent="center" mt={5} mb={5}>
          <Typography variant="h4" align="center">
            Investment Plans
          </Typography>
        </Box>
        <Grid container spacing={5} justify="center">
          {investmentplans.slice(0, 3).map((trade, index) => (
            <Fade
              in={true}
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardHeader
                    title={trade.name}
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
                      {`${trade.rate} `}
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
                        secondary={`${trade.hrs} ${currentStrings.Dashboard.invest.hour}`}
                        primaryTypographyProps={{ align: "center" }}
                        secondaryTypographyProps={{
                          variant: "h5",
                          align: "center",
                        }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={currentStrings.Dashboard.invest.Minimun_stake}
                        secondary={formatLocaleCurrency(
                          trade.lot,
                          userInfos.currencycode
                        )}
                        primaryTypographyProps={{ align: "center" }}
                        secondaryTypographyProps={{
                          variant: "h5",
                          align: "center",
                        }}
                      />
                    </ListItem>

                    <CardActions>
                      <Button
                        variant="contained"
                        className={classes.mgtopx}
                        fullWidth
                        onClick={() => addTrade(index, trade)}
                        color="primary"
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

        <Box display="flex" justifyContent="center" mt={5} mb={5}>
          <Typography variant="h4" align="center">
            Mining Plans
          </Typography>
        </Box>
        <Grid container spacing={5} justify="center">
          {investmentplans.slice(3, 6).map((trade, index) => (
            <Fade
              in={true}
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardHeader
                    title={trade.name}
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
                      {`${trade.rate} `}
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
                        secondary={`${trade.hrs} ${currentStrings.Dashboard.invest.hour}`}
                        primaryTypographyProps={{ align: "center" }}
                        secondaryTypographyProps={{
                          variant: "h5",
                          align: "center",
                        }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={currentStrings.Dashboard.invest.Minimun_stake}
                        secondary={
                          trade.rate == 50
                            ? "Unlimited"
                            : formatLocaleCurrency(
                                trade.lot,
                                userInfos.currencycode
                              )
                        }
                        primaryTypographyProps={{ align: "center" }}
                        secondaryTypographyProps={{
                          variant: "h5",
                          align: "center",
                        }}
                      />
                    </ListItem>

                    <CardActions>
                      <Button
                        variant="outlined"
                        className={classes.mgtopx}
                        fullWidth
                        onClick={() => addTrade(index, trade)}
                        color="primary"
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
