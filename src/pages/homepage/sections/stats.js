import React, { useEffect } from "react";
import {
  Card,
  Grid,
  ListItem,
  CardHeader,
  Avatar,
  Paper,
  Typography,
  Box,
  ListItemText,
  Container,
  makeStyles,
} from "@material-ui/core";
import { VerifiedUserSharp } from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  image: {
    height: "5em",
  },
}));

const stats = [
  {
    title: "Trade Copied",
    value: 10000,
    image: require("../images/tradecopy.svg"),
  },
  {
    title: "Active Investors",
    value: 50000,
    image: require("../images/investor.svg"),
  },
  {
    title: "Return Rate",
    value: 50000,
    image: require("../images/percent.svg"),
  },
];

function Stats() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <CardHeader
              avatar={<img src={stat.image} className={classes.image} />}
              title={<Typography variant="h5">{stat.value}</Typography>}
              subheader={<Typography variant="h5">{stat.title}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default Stats;
