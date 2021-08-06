import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import { CssBaseline, Container, Typography, Box } from "@material-ui/core";
import IntroHeader from "../component/introheader";
import { AppContext } from "../../../App";
import { css } from "@emotion/core";
import Stats from "../sections/stats";
import "../homepage.css";
import InvestBlock from "../sections/investblock";
import Activities from "../sections/activities";
import Payment from "../sections/payment";

import Calculator from "./calculateinvest";
import { red } from "@material-ui/core/colors";
import AboutHome from "./abouthome";

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
      <div style={{ position: "relative", background: "#eff6ff" }}>
        <coingecko-coin-price-static-headline-widget
          coin-ids="bitcoin,eos,ethereum,litecoin,ripple,bnb-diamond,metahash,dogebtc,ripple-alpha,arion,bitcash,adax"
          currency="usd"
          locale="en"
          background-color="#09132e"
        ></coingecko-coin-price-static-headline-widget>
        <AboutHome />
      </div>
      <InvestBlock />

      <div style={{ background: "#08091b" }}>
        <Activities />
      </div>

      <div>
        <Stats />
      </div>
      <Calculator />
      <div style={{ position: "relative", background: "#fafafa", top: "15px" }}>
        <Payment />
      </div>
    </React.Fragment>
  );
}

export default Home;
