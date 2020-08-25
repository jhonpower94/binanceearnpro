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
import { VerifiedUserSharp } from "@material-ui/icons";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const downloads = [
  {
    title: "Ios",
    image: "applelogo.svg",
    link: "download",
  },
  {
    title: "Android",
    image: "androidlogo.svg",
    link: "download",
  },
  {
    title: "Windows",
    image: "windowslogo.svg",
    link: "download",
  },
];

const affiliates = [
  { image: "paypal image" },
  { image: "srill image" },
  { image: "coinbase image" },
  { image: "paxfull image" },
  { image: "toyota image" },
  { image: "mcdonald image" },
  { image: "samsung image" },
];

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
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

  useEffect(() => {
    setIntro({ layout: <IntroHeader /> });
  }, []);

  const { setIntro } = useContext(AppContext);

  return (
    <React.Fragment>
      <CssBaseline>
        <div className={classes.header}>
          <Container id="stats" maxWidth="lg">
            <Stats />
          </Container>
        </div>

        <Container id="features" maxWidth="lg" className={classes.margintop}>
          <SectionHeader
            title={headings.services.title}
            subtitle={headings.services.subtitle}
            image={headings.services.image}
          />
          <Features />
        </Container>

        <div className={classes.margintop}>
          <SectionHeader
            title={headings.addtrade.title}
            subtitle={headings.addtrade.subtitle}
            image={headings.addtrade.image}
          />
          <InvestBlock blocksHome={true} page="Invest" />
        </div>

        <div className={classes.margintop}>
          <SectionHeader
            title={headings.activities.title}
            subtitle={headings.activities.subtitle}
            image={headings.activities.image}
          />
          <Activities />
        </div>

        <div className={clsx(classes.margintop, classes.header)}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  m={4}
                >
                  <img
                    src={require("../images/blockdata.svg")}
                    alt="image"
                    className={classes.img}
                  />
                  <Typography variant="h5">Title goes here</Typography>
                  <Typography>SubTitle goes here</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <BlockDatas frontView={true} />
              </Grid>
            </Grid>
          </Container>
        </div>

        <Container maxWidth="lg" className={classes.margintop}>
          <SectionHeader
            title={headings.payment.title}
            subtitle={headings.payment.subtitle}
            image={headings.payment.image}
          />
          <Payment />
        </Container>

        <div id="aboutus" className={clsx(classes.margintop, classes.header)}>
          <Container>
            <Grid container spacing={3}>
              <Grid id="Locations" item xs={12} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img src={require("../images/referral.svg")} width="150" />
                  <Typography variant="h5">Title goes here</Typography>
                  <Typography>SubTitle goes here</Typography>
                </Box>
              </Grid>

              <Grid id="Locations" item xs={12} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={require("../images/location.svg")}
                    width="150"
                    alt="image"
                  />
                  <Locations single={true} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={require("../images/message.svg")}
                    width="150"
                    alt="image"
                  />
                  <Typography variant="h5">Message</Typography>
                  <Typography align="center">
                    Message our depart based on your required service
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="md" className={classes.margintop}>
            <Box
              className={classes.margintop}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">Downloads</Typography>
              <Typography variant="body1">submenu</Typography>
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
                    <img
                      src={require(`../images/${download.image}`)}
                      alt="image"
                      width="50"
                    />
                    <Typography>{download.link}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
        <Container maxWidth="sm" className={classes.margintop}>
          <Grid container spacing={3} justify="center">
            {affiliates.map((afl, index) => (
              <Grid key={index} item xs={6} sm={3}>
                <Box display="flex" justifyContent="center">
                  {afl.image}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
}

export default Home;
