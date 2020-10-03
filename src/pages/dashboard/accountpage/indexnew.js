import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow, blue } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import {
  useScrollTrigger,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
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

const useStyles = makeStyles((theme) => ({}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[800],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlackCheckbox = withStyles({
  root: {
    color: "#5d7092",
    "&$checked": {
      color: "#2d2d2d",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function DashboardPage() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    currency: true,
    stock: true,
    realestate: true,
    commodities: true,
  });

  const [dataType, setDataType] = React.useState({
    currency: "",
    stock: "",
    realestate: "",
    commodities: "",
  });

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      setDataType({ ...dataType, [event.target.name]: "" });
    } else {
      setDataType({ ...dataType, [event.target.name]: event.target.name });
    }
  };

  const data = [
    { trade: "currency", year: "1750", value: 300 },
    { trade: "currency", year: "1800", value: 400 },
    { trade: "currency", year: "1850", value: 409 },
    { trade: "currency", year: "1900", value: 526 },
    { trade: "currency", year: "1950", value: 440 },
    { trade: "currency", year: "1999", value: 363 },
    { trade: "currency", year: "2050", value: 94 },
    { trade: "stock", year: "1750", value: 106 },
    { trade: "stock", year: "1800", value: 107 },
    { trade: "stock", year: "1850", value: 111 },
    { trade: "stock", year: "1900", value: 1766 },
    { trade: "stock", year: "1950", value: 221 },
    { trade: "stock", year: "1999", value: 767 },
    { trade: "stock", year: "2050", value: 133 },
    { trade: "realestate", year: "1750", value: 163 },
    { trade: "realestate", year: "1800", value: 203 },
    { trade: "realestate", year: "1850", value: 276 },
    { trade: "realestate", year: "1900", value: 628 },
    { trade: "realestate", year: "1950", value: 547 },
    { trade: "realestate", year: "1999", value: 729 },
    { trade: "realestate", year: "2050", value: 408 },
    { trade: "commodities", year: "1750", value: 200 },
    { trade: "commodities", year: "1800", value: 200 },
    { trade: "commodities", year: "1850", value: 200 },
    { trade: "commodities", year: "1900", value: 460 },
    { trade: "commodities", year: "1950", value: 230 },
    { trade: "commodities", year: "1999", value: 300 },
    { trade: "commodities", year: "2050", value: 300 },
  ];

  const filterData = data.filter((value) => {
    return (
      value.trade != dataType.currency &&
      value.trade != dataType.stock &&
      value.trade != dataType.realestate &&
      value.trade != dataType.commodities
    );
  });

  const scale = {
    value: {
      nice: true,
    },
    year: {
      type: "linear",
      tickInterval: 50,
    },
  };

  return (
    <React.Fragment>
      <CardHeader
        title={<Typography variant="body1">Percentage Returns</Typography>}
      />
      <CardContent>
        <Chart scale={scale} height={300} data={filterData} autoFit>
          <Axis name="value" visible={true} />
          <Axis name="year" visible={false} />
          <Tooltip shared />
          <Line
            adjust="stack"
            color={[
              "trade",
              (xVal) => {
                switch (xVal) {
                  case "currency":
                    return blue[500];
                  case "stock":
                    return green[500];
                  case "realestate":
                    return "#2d2d2d";
                  case "commodities":
                    return yellow[800];
                  default:
                    return blue[800];
                }
              },
            ]}
            position="year*value"
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
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.currency}
                  onChange={handleChange}
                  name="currency"
                  color="primary"
                />
              }
              label="Primary"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.stock}
                  onChange={handleChange}
                  name="stock"
                />
              }
              label="Custom color"
            />
            <FormControlLabel
              control={
                <BlackCheckbox
                  checked={state.realestate}
                  onChange={handleChange}
                  name="realestate"
                />
              }
              label="Custom color"
            />
            <FormControlLabel
              control={
                <YellowCheckbox
                  checked={state.commodities}
                  onChange={handleChange}
                  name="commodities"
                />
              }
              label="Custom color"
            />
          </FormGroup>
        </Chart>
      </CardContent>
    </React.Fragment>
  );
}

export default DashboardPage;
