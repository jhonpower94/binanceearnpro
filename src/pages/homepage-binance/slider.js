import { Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Pagination from "./component/pagination";
import "./styles.scoped.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

const styles = {
  root: {
    position: "relative",
  },
  slide: {
    padding: 15,
    //  minHeight: 100,
    color: "#fff",
  },
  slide1: {
    backgroundColor: "#FEA900",
  },
  slide2: {
    backgroundColor: "#B3DC4A",
  },
  slide3: {
    backgroundColor: "#6AC0FF",
  },
};

function CardSliders() {
  const [state, setState] = useState({
    index: 0,
  });

  const handleChangeIndex = (index) => {
    setState({
      index: index,
    });
  };

  const { index } = state;
  const classes = useStyles();

  return (
    <div style={styles.root}>
      <AutoPlaySwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        {[
          {
            title: "Trade crypto with no stress",
            subtitle: "invest and earn from crypto exchange trading like a pro",
            image: "binance-earn.png",
          },
          {
            title: "Earn with Autopilot",
            subtitle:
              "invest with a pre-determined amount and accumulate your crypto holdings",
            image: "autoinvest.png",
          },
          {
            title: "Binance Earn pro pay",
            subtitle:
              "get paid and make payments with our borderless payment technology",
            image: "binance-pay.png",
          },
        ].map((slide, indexss) => (
          <div style={{ padding: 3 }} key={indexss}>
            <Card key={indexss} variant="outlined">
              <CardMedia
                className={classes.media}
                image={require(`./image/julia/new-hompage/${slide.image}`)}
                title="Contemplative Reptile"
              />
              <CardContent>
                <div class="css-1y58htc" data-v-2e7122e6="">
                  <div
                    data-bn-type="text"
                    class="css-10idg9v"
                    data-v-2e7122e6=""
                  >
                    {slide.title}
                  </div>
                  <div
                    data-bn-type="text"
                    class="css-1u4ulvl"
                    data-v-2e7122e6=""
                  >
                    {slide.subtitle}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Pagination dots={3} index={index} onChangeIndex={handleChangeIndex} />
    </div>
  );
}

export default CardSliders;
