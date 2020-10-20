import React, { useEffect } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow, blue, red } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { docData, firestore } from "../../../config";

import {
  useScrollTrigger,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  Box,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Button,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Chart,
  Line,
  Area,
  Tooltip,
  Axis,
  Coordinate,
  Legend,
} from "bizcharts";
import { navigate } from "@reach/router";

const useStyles = () => {
  return makeStyles((theme) => ({
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    formControl: {
      minWidth: 120,
    },
    icon: {
      borderRadius: "50%",
      width: 20,
      height: 20,
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
        width: 20,
        height: 20,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#106ba3",
      },
    },
  }));
};

const radioColor = (key) => {
  switch (key) {
    case "currencies":
      return "#137cbd";
    case "stock":
      return green[500];
    case "realestate":
      return "#2d2d2d";
    case "commodities":
      return yellow[800];
    default:
      return blue[800];
  }
};

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes().root}
      disableRipple
      color="default"
      checkedIcon={
        <span className={clsx(classes().icon, classes().checkedIcon)} />
      }
      icon={<span className={classes().icon} />}
      {...props}
    />
  );
}

function ChartsPage() {
  const classes = useStyles();
  const [state, setState] = React.useState("currencies");
  const [currentValue, setCurrentValue] = React.useState(0);

  /* const [data, setData] = React.useState([]); */

  const [dataType, setDataType] = React.useState({
    currencies: [],
  });

  const [maxvalue, setMaxvalue] = React.useState({
    min: 75,
    max: 95,
  });

  /* useEffect(() => {
    const getPlanDatas = firestore.doc(`plans/${12345}`);
    docData(getPlanDatas, "id").subscribe((datax) => {
      datax.currencies.sort().reverse();
      datax.stock.sort().reverse();
      datax.realestate.sort().reverse();
      datax.commodities.sort().reverse();
      setDataType({ ...datax });
      const maxLemgth = datax.currencies.length - 1;
      setCurrentValue(datax.currencies[maxLemgth].value);
    });
  }, []); */

  const data = (state) => {
    switch (state) {
      case "currencies":
        return dataType.currencies;
      case "stock":
        return dataType.stock;
      case "realestate":
        return dataType.realestate;
      case "commodities":
        return dataType.commodities;
      default:
        return [];
    }
  };

  const handleChange = (event) => {
    setState(event.target.value);
    switch (event.target.value) {
      case "currencies":
        return setMinMaxData(75, 95, dataType.currencies);
      case "stock":
        return setMinMaxData(54, 74, dataType.stock);
      case "realestate":
        return setMinMaxData(26, 54, dataType.realestate);
      case "commodities":
        return setMinMaxData(5, 30, dataType.commodities);
      default:
        return null;
    }
  };

  const setMinMaxData = (min, max, array) => {
    const maxLength = array.length - 1;
    setCurrentValue(array[maxLength].value);
    setMaxvalue({
      min: min,
      max: max,
    });
  };

  const datannn = [
    { trade: "currency", time: "1", value: 75 },
    { trade: "currency", time: "2", value: 80 },
    { trade: "currency", time: "3", value: 77 },
    { trade: "currency", time: "4", value: 91 },
    { trade: "currency", time: "5", value: 88 },
    { trade: "currency", time: "6", value: 80 },
    { trade: "currency", time: "7", value: 75 },
    { trade: "currency", time: "8", value: 95 },
    { trade: "currency", time: "9", value: 85 },
    { trade: "stock", time: "1", value: 55 },
    { trade: "stock", time: "2", value: 60 },
    { trade: "stock", time: "3", value: 64 },
    { trade: "stock", time: "4", value: 70 },
    { trade: "stock", time: "5", value: 69 },
    { trade: "stock", time: "6", value: 55 },
    { trade: "stock", time: "7", value: 60 },
    { trade: "stock", time: "8", value: 58 },
    { trade: "stock", time: "9", value: 60 },
    { trade: "realestate", time: "1", value: 30 },
    { trade: "realestate", time: "2", value: 49 },
    { trade: "realestate", time: "3", value: 54 },
    { trade: "realestate", time: "4", value: 50 },
    { trade: "realestate", time: "5", value: 40 },
    { trade: "realestate", time: "6", value: 39 },
    { trade: "realestate", time: "7", value: 35 },
    { trade: "realestate", time: "8", value: 48 },
    { trade: "realestate", time: "9", value: 38 },
    { trade: "commodities", time: "1", value: 20 },
    { trade: "commodities", time: "2", value: 25 },
    { trade: "commodities", time: "3", value: 22 },
    { trade: "commodities", time: "4", value: 31 },
    { trade: "commodities", time: "5", value: 34 },
    { trade: "commodities", time: "6", value: 20 },
    { trade: "commodities", time: "7", value: 25 },
    { trade: "commodities", time: "8", value: 28 },
    { trade: "commodities", time: "9", value: 19 },
  ];

  const scale = {
    value: {
      min: maxvalue.min,
      max: maxvalue.max,
    },
    time: {
      range: [0, 1],
    },
  };

  return (
    <React.Fragment>
      <Grid container spacing={4} justify="flex-start">
        
        <Grid item xs={6} sm={4}>
          <FormControl
            variant="outlined"
            //  className={classes().formControl}
            size="small"
            fullWidth
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Plans
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={state}
              onChange={handleChange}
              label="Plans"
            >
              <MenuItem value="currencies">Currency</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
              <MenuItem value="realestate">Realestate</MenuItem>
              <MenuItem value="commodities">Commodities</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} sm={4}>
          95%
        </Grid>
        <Grid item xs={4} sm={4}>
          <Button variant="outlined" color="primary">
            Invset
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Chart scale={scale} height={250} data={datannn} autoFit>
            <Axis name="value" visible={true} />
            <Axis name="time" visible={false} />
            <Tooltip shared />

            <Line
              color={[
                "trade",
                (xVal) => {
                  switch (xVal) {
                    case "currency":
                      return blue[500];
                    case "stock":
                      return green[500];
                    case "realestate":
                      return red[800];
                    case "commodities":
                      return yellow[800];
                    default:
                      return blue[800];
                  }
                },
              ]}
              position="time*value"
            />
            <Legend
              name="trade"
              visible={false}
              marker={{
                symbol: "square",
                style: {
                  fill: null,
                },
              }}
            />
            <Box display="flex" justifyContent="center" mt={3}></Box>
          </Chart>
        </Grid>
      </Grid>

      <CardContent></CardContent>
    </React.Fragment>
  );
}

export default ChartsPage;
