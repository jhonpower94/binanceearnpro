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
import {
  GroupAddOutlined,
  MoneyOffOutlined,
  SearchOutlined,
  VerifiedUserSharp,
} from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import MonetizationOnOutlined from "@material-ui/icons/MonetizationOnOutlined";
import { useSelector } from "react-redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  images: {
    height: "5em",
  },
}));

function Stats() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  useEffect(() => {}, []);

  const stats = [
    {
      title: currentStrings.homepage.stats.online,
      value: "1789+",
      icons: <SearchOutlined fontSize="large" />,
    },
    {
      title: currentStrings.homepage.stats.accounts,
      value: "2875+",
      icons: <GroupAddOutlined fontSize="large" />,
    },
    {
      title: currentStrings.homepage.stats.deposits,
      value: "$3.160,300",
      icons: <MonetizationOnOutlined fontSize="large" />,
    },
    {
      title: currentStrings.homepage.stats.withdrawn,
      value: "$7.430,400",
      icons: <MoneyOffOutlined fontSize="large" />,
    },
  ];

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        {stats.map((stat, index) => (
          <Grid key={index} item xs={12} sm={3}>
            <CardHeader
              title={stat.value}
              subheader={stat.title}
              titleTypographyProps={{
                align: "center",
                variant: "h5",
              }}
              subheaderTypographyProps={{
                align: "center",
                variant: "caption",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Stats;
