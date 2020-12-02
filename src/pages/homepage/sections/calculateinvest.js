import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  CardHeader,
  Typography,
  MenuItem,
  Avatar,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Particles from "react-tsparticles";
import Background from "../images/Sun-Tornado.svg";
import { blue } from "@material-ui/core/colors";
import { ShareSharp } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import { blocks } from "../../../service/tradeblocks";

const useStyles = makeStyles((theme) => ({}));

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

function Calculator() {
  const classes = useStyles();
  const [value, setValue] = useState({
    rate: 6,
    amount: 0,
    profit: 0,
  });

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateProfit = (e) => {
    const result = (value.rate / 100) * e.target.value;
    setValue({ ...value, profit: result });
  };

  return (
    <div>
      <Particles
        // height="50px"
        // height={useMediaQuery(useTheme().breakpoints.up("sm")) ? "80%" : "85%"}
        style={{ position: "absolute" }}
        id="tsparticles"
        options={{
          background: {
            /* color: {
              value: blue[800],
            }, */
            image: `url("${Background}")`,
            color: "#cb491d",
            size: "cover",
            repeat: "no-repeat",
            position: "center center",
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={5} justify="center">
            <Grid item xs={12} sm={12}>
              <CardHeader
                title="Calculate investment"
                subheader="Calculcale investment total profits"
                titleTypographyProps={{ align: "center", variant: "h4" }}
                subheaderTypographyProps={{ align: "center" }}
                style={{ color: "#fff" }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                label="Currency"
                value={value.rate}
                onChange={(e) => {
                  setValue({ ...value, rate: e.target.value });
                }}
                helperText="Please select your currency"
                variant="filled"
              >
                {blocks.map((option, index) => (
                  <MenuItem key={index} value={option.rate}>
                    {`${option.name} - ${option.duration}hrs`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                size="small"
                fullWidth
                id="outlined-number"
                label="Amount"
                name="amount"
                defaultValue={value.amount}
                variant="filled"
                onChange={(e) => updateProfit(e)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                helperText="Enter investment amount"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                size="small"
                fullWidth
                id="outlined-number-profit"
                label="Profit"
                name="profit"
                value={value.profit}
                variant="filled"
                onChange={(e) => {}}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                helperText="Estimated profit return"
              />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid
            container
            spacing={3}
            justify="center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Grid item xs={6} sm={6}>
              <CardHeader
                avatar={
                  <Avatar
                    variant="rounded"
                    style={{
                      background: "#ffffff",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <ShareSharp style={{ fontSize: "70" }} />
                  </Avatar>
                }
                title={<Typography variant="h5">AFFILATE PROGRAMM</Typography>}
                subheader="Each your referral brings you reward from his deposit amount. Your own deposit is not required to attract investors and earn. Just register account and apply your referral link everywhere you can."
                style={{ color: "#fff" }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CardHeader
                avatar={
                  <img
                    src={require("../images/certificate1.png")}
                    width="100"
                  />
                }
                title={
                  <Typography variant="h5">
                    coininvest.net investment LIMITED
                  </Typography>
                }
                subheader="In July 2016 coininvest.net investment Limited passed the incorporation process in the United Kingdom and is listed by Companies House."
                style={{ color: "#fff" }}
              />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Calculator;
