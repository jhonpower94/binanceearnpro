import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Convert, Converter } from "easy-currencies";
import {
  Container,
  Paper,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";
var btc = require("bitcoin-exchange-rate");

const useStyles = makeStyles((theme) => ({
  space: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
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
  displaycolumn: {
    display: "flex",
    flexDirection: "column",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

let converter = new Converter(
  "OpenExchangeRates",
  "236dd075cd5245eea8b196f1dd855fff"
);

const currency = "USD";
const amount = 2000;

function Exchange() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    numberformat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    btc.bitcoinrate(currency, amount);
    converter
      .convert(1000, "USD", "NGN")
      .then((value) => console.log(value))
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <CardHeader
            action={
              <img
                src={require("../icons/exchange.svg")}
                alt="image"
                width="80"
              />
            }
            title="Exchnange"
            subheader="exchange local currency to btcoin"
          />
          <CardContent className={classes.displaycolumn}>
            <TextField
              label="enter amount"
              value={values.numberformat}
              onChange={handleChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.mgtopx}
            >
              Exchange
            </Button>
          </CardContent>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Exchange;
