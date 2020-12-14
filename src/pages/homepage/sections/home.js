import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  CardHeader,
  Divider,
} from "@material-ui/core";
import IntroHeader from "../component/introheader";
import SectionHeader, { headings } from "../component/sectionheaders";
import { AppContext } from "../../../App";
import { css } from "@emotion/core";
import Stats from "../sections/stats";
import "../homepage.css";
import Features from "../sections/features";
import InvestBlock from "../sections/investblock";
import Activities from "../sections/activities";
import BlockDatas from "../sections/blockdata";
import Payment from "../sections/payment";
import Locations from "../sections/locations";
import BounceLoader from "react-spinners/BounceLoader";
import {
  AndroidSharp,
  Apple,
  LaptopMac,
  ShareSharp,
  VerifiedUserSharp,
} from "@material-ui/icons";
import About from "./aboutus";
import { blue } from "@material-ui/core/colors";
import Calculator from "./calculateinvest";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const downloads = [
  {
    title: "Ios",
    image: <Apple />,
    link: "Ios downlaad",
  },
  {
    title: "Android",
    image: <AndroidSharp />,
    link: "Android download",
  },
  {
    title: "Windows",
    image: <LaptopMac />,
    link: "PC download",
  },
];

const affiliates = [
  { image: "paypal  INC" },
  { image: "skrill INC" },
  { image: "coinbase" },
  { image: "paxfull" },
  { image: "Yandex" },
  { image: "Joomla INC" },
  { image: "Bitpay INC" },
];

const useStyles = makeStyles((theme) => ({
  header: {
    background: "#303030",
  },

  margintop: {
    marginTop: theme.spacing(5),
  },
  bacground: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#ef6c00"),
  },
  img: {
    height: "20em",
  },
}));

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? "primary" : "inherit",
        },
      };
    }}
  />
);

function Home(props) {
  const classes = useStyles();
  const { refid } = props;
  const { setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({ layout: <IntroHeader />, refid: refid });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline>
        <Container style={{ position: "relative", top: "-200px" }}>
          <InvestBlock blocksHome={true} page="Invest" />
        </Container>

        <Container
          className={classes.margintop}
          style={{ position: "relative", top: "-200px" }}
        >
          <Activities />
        </Container>

        <div style={{ position: "relative", top: "-100px" }}>
          <div>
            <Stats />
          </div>

          <div>
            <Calculator />
          </div>
        </div>

        <div
          style={{ background: "#fcd19f", position: "relative", top: "-25px" }}
        >
          <Payment />
        </div>

        <div className={clsx(classes.margintop)}>
          <Container maxWidth="md" className={classes.margintop}>
            <Box
              className={classes.margintop}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">Menus</Typography>
              <Typography variant="body1">
                menus and available web app
              </Typography>
            </Box>
            <Grid container spacing={3} justify="center">
              {downloads.map((download, index) => (
                <Grid key={index} item xs={6} sm={4}>
                  <Box
                    className={classes.margintop}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {download.image}
                    <Typography>{download.link}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </CssBaseline>
    </React.Fragment>
  );
}

export default Home;
