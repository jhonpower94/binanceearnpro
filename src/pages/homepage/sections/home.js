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
    link: "download",
  },
  {
    title: "Android",
    image: <AndroidSharp />,
    link: "download",
  },
  {
    title: "Windows",
    image: <LaptopMac />,
    link: "download",
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
        <Container
          maxWidth="lg"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(113,683,328)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23fafafa'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='1507' height='1255.8' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.06'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        >
          <div style={{ position: "relative", top: "-200px" }}>
            <InvestBlock blocksHome={true} page="Invest" />
          </div>

          <div
            className={classes.margintop}
            style={{ position: "relative", top: "-200px" }}
          >
            <Activities />
          </div>
        </Container>

        <div style={{ position: "relative", top: "-100px" }}>
          <div style={{ background: "#fff" }}>
            <Stats />
          </div>

          <div id="features">
            <Calculator />
          </div>
        </div>

        <div
          style={{ background: "#ffe6de", position: "relative", top: "-25px" }}
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
