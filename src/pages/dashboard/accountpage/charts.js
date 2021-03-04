import React, { useEffect } from "react";
import clsx from "clsx";
import { green, blue } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { docData, firestore } from "../../../config";
import {
  makeStyles,
  Box,
  MenuItem,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
} from "@material-ui/core";
import { Chart, Line, Area, Tooltip, Axis, Legend } from "bizcharts";
import { useSelector } from "react-redux";
import { Rating } from "@material-ui/lab";

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
    case "plan1":
      return "#137cbd";
    case "plan2":
      return green[500];
    case "plan3":
      return "#2d2d2d";

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
  const currentStrings = useSelector((state) => state.language);
  const [state, setState] = React.useState("plan1");
  const [star, setStar] = React.useState(3);
  const [currentValue, setCurrentValue] = React.useState(0);

  /* const [data, setData] = React.useState([]); */

  const [dataType, setDataType] = React.useState({
    plan1: [],
  });

  const [maxvalue, setMaxvalue] = React.useState({
    min: 10,
    max: 25,
  });

  useEffect(() => {
    const getPlanDatas = firestore.doc(`plans/${12345}`);
    docData(getPlanDatas, "id").subscribe((datax) => {
      datax.plan1.sort().reverse();
      datax.plan2.sort().reverse();
      datax.plan3.sort().reverse();
      setDataType({ ...datax });
      const maxLemgth = datax.plan1.length - 1;
      setCurrentValue(datax.plan1[maxLemgth].value);
    });
  }, []);

  const data = (state) => {
    switch (state) {
      case "plan1":
        return dataType.plan1;
      case "plan2":
        return dataType.plan2;
      case "plan3":
        return dataType.plan3;
      default:
        return [];
    }
  };

  const handleChange = (event) => {
    setState(event.target.value);
    switch (event.target.value) {
      case "plan1":
        return setMinMaxData(10, 25, dataType.plan1, 3);
      case "plan2":
        return setMinMaxData(35, 50, dataType.plan2, 4);
      case "plan3":
        return setMinMaxData(60, 95, dataType.plan3, 5);
      default:
        return null;
    }
  };

  const setMinMaxData = (min, max, array, star) => {
    const maxLength = array.length - 1;
    setCurrentValue(array[maxLength].value);
    setMaxvalue({
      min: min,
      max: max,
    });
    setStar(star);
  };

  const plansChart = [
    {
      label: `Silver plan`,
      value: "plan1",
    },
    {
      label: `Gold plan`,
      value: "plan2",
    },
    {
      label: `Diamond plan`,
      value: "plan3",
    },
  ];

  const scale = {
    value: {
      min: maxvalue.min,
      max: maxvalue.max,
      tickCount: 5,
      formatter: (val) => {
        return `${val} %`;
      },
    },
    time: {
      range: [0, 1],
      tickCount: 5,
      formatter: (val) => {
        const hour = new Date(val * 1000).getUTCDate();
        const time = new Date(val * 1000).getHours();
        return `${hour} : 00`;
      },
    },
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={useMediaQuery(useTheme().breakpoints.up("sm")) ? 5 : 3}
        justify={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? "flex-start"
            : "center"
        }
      >
        <Grid item xs={10} sm={4}>
          <TextField
            id="outlined-select-plan"
            select
            size="small"
            label={currentStrings.Dashboard.account.plans}
            value={state}
            onChange={handleChange}
            helperText={currentStrings.Dashboard.account.plan_helpertext}
            variant="outlined"
            fullWidth
          >
            {plansChart.map((vl, index) => (
              <MenuItem key={index} value={vl.value}>
                {vl.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Box
            display="flex"
            justifyContent={
              useMediaQuery(useTheme().breakpoints.up("sm"))
                ? "flex-start"
                : "center"
            }
          >
            <Rating name="read-only" value={star} readOnly />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Chart
            scale={scale}
            height={useMediaQuery(useTheme().breakpoints.up("sm")) ? 350 : 200}
            data={data(state)}
            autoFit
          >
            <Axis name="value" visible={true} />
            <Axis
              name="time"
              visible={
                useMediaQuery(useTheme().breakpoints.up("sm")) ? true : false
              }
            />
            <Tooltip shared />

            <Line color="trade" position="time*value" />

            <Legend
              name="trade"
              visible={false}
              marker={{
                symbol: "square",
              }}
            />
          </Chart>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ChartsPage;

/* 
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
    { trade: "plan2", time: "1", value: 55 },
    { trade: "plan2", time: "2", value: 60 },
    { trade: "plan2", time: "3", value: 64 },
    { trade: "plan2", time: "4", value: 70 },
    { trade: "plan2", time: "5", value: 69 },
    { trade: "plan2", time: "6", value: 55 },
    { trade: "plan2", time: "7", value: 60 },
    { trade: "plan2", time: "8", value: 58 },
    { trade: "plan2", time: "9", value: 60 },
    { trade: "plan3", time: "1", value: 30 },
    { trade: "plan3", time: "2", value: 49 },
    { trade: "plan3", time: "3", value: 54 },
    { trade: "plan3", time: "4", value: 50 },
    { trade: "plan3", time: "5", value: 40 },
    { trade: "plan3", time: "6", value: 39 },
    { trade: "plan3", time: "7", value: 35 },
    { trade: "plan3", time: "8", value: 48 },
    { trade: "plan3", time: "9", value: 38 },
  ];
 */
