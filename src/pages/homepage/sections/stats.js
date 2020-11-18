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

const stats = [
  {
    title: "DAYS ONLINEe",
    value: "1789",
    icons: <SearchOutlined fontSize="large" />,
  },
  {
    title: "TOTAL ACCOUNTS",
    value: "2000",
    icons: <GroupAddOutlined fontSize="large" />,
  },
  {
    title: "TOTAL DEPOSITED",
    value: "$4916056.84",
    icons: <MonetizationOnOutlined fontSize="large" />,
  },
  {
    title: "TOTAL WITHDRAWN",
    value: "$9056910.81",
    icons: <MoneyOffOutlined fontSize="large" />,
  },
];

function Stats() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid key={index} item xs={12} sm={3}>
            <CardHeader
              avatar={stat.icons}
              title={stat.title}
              subheader={stat.value}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Stats;
