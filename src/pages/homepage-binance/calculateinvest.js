import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  withStyles,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import "./fonts/font.min.scoped.css";
import "./fonts/index.min.scoped.css";
import "./styles.scoped.css";
import { formatLocaleCurrency } from "country-currency-map";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { investmentplans } from "../../service/plansashboard";
import humanizeDuration from "humanize-duration";

const getDays = (hrs, unit) => {
  let milliseconds = hrs * 60 * 60 * 1000;
  let time = humanizeDuration(milliseconds, { units: unit, round: true });
  //  console.log(time);
  return time;
};

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

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "#fcd535",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function CalculateInvestment() {
  const [values, setValues] = React.useState({
    amount: "0",
    plan: "0",
    earning: 0,
    error: false,
    helperText: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    const inputAmount = parseInt(values.amount);
    const currentRate = parseInt(investmentplans[values.plan].rate);

    if (inputAmount < investmentplans[values.plan].lot) {
      console.log("error");
      setValues({
        ...values,
        error: true,
        helperText: "Minimum amount is low",
      });
    } else {
      const earning = (currentRate / 100) * inputAmount;
      setValues({ ...values, error: false, helperText: "", earning: earning });
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            data-bn-type="text"
            class="css-xhdd21"
            data-v-80e230a3=""
          >
            💰 calculate investment...💰
          </div>
          <form onSubmit={submit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ValidationTextField
                  label="Investment amount"
                  required
                  variant="outlined"
                  value={values.amount}
                  id="validation-outlined-input"
                  name="amount"
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  error={values.error}
                  helperText={values.helperText}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select plan</FormLabel>
                  <RadioGroup
                    row
                    value={values.plan}
                    aria-label="gender"
                    name="plan"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {investmentplans.map((plan, index) => (
                      <FormControlLabel
                        key={index}
                        value={`${index}`}
                        control={<StyledRadio />}
                        label={`Plan ${index + 1}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  type={"submit"}
                  value={"Calculate earning"}
                  data-bn-type="button"
                  class="css-10hsupg"
                  data-v-329781c2=""
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                {`Returns `}
                <span className="itemtext">
                  {formatLocaleCurrency(values.earning, "USD", {
                    autoFixed: false,
                  })}
                </span>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CalculateInvestment;
