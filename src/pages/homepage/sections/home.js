import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import { CssBaseline, Container } from "@material-ui/core";
import IntroHeader from "../component/introheader";
import { AppContext } from "../../../App";
import { css } from "@emotion/core";
import Stats from "../sections/stats";
import "../homepage.css";
import InvestBlock from "../sections/investblock";
import Activities from "../sections/activities";
import Payment from "../sections/payment";

import Calculator from "./calculateinvest";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
      <CssBaseline />
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
        <div style={{ background: "#fff" }}>
          <Stats />
        </div>

        <div>
          <Calculator />
        </div>
      </div>

      <div style={{ background: "#fff", position: "relative", top: "-25px" }}>
        <Payment />
      </div>
    </React.Fragment>
  );
}

export default Home;
