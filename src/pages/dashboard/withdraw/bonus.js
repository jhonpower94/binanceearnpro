import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  CardHeader,
  Avatar,
  CardContent,
  Button,
  Typography,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
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

function WithdrawBonus(props) {
  const classes = useStyles();
  const page = props.page;
  const [values, setValues] = React.useState({
    numberformat: "",
  });


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submited");
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <CardHeader
            action={
              <img
                src={require("../icons/withdrawbonus.svg")}
                alt="image"
                width="80"
              />
            }
            title="withdraw Bonus"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4">$ 50,000</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                remaining Bonus
              </Typography>
            </Box>
          </CardContent>

          <CardContent>
            <form onSubmit={handleSubmit}>
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
              <TextField
                fullWidth
                className={classes.mgtop}
                id="outlined-basic"
                label="recievers bitcoin address"
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
          </CardContent>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default WithdrawBonus;
