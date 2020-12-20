import React, { useEffect } from "react";
import {
  Grid,
  CardHeader,
  Avatar,
  Container,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import {
  GroupAddOutlined,
  MoneyOffOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import { css } from "@emotion/core";
import MonetizationOnOutlined from "@material-ui/icons/MonetizationOnOutlined";
import { useSelector } from "react-redux";
import { red } from "@material-ui/core/colors";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  images: {
    height: "5em",
  },
  avatar: {
    background: theme.palette.background.default,
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // Purple and green play nicely together.
      main: red[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#fafafa",
    },
    /*  background: {
      default: "#fff",
    }, */
    action: {
      selected: "#2196f33d",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={3} justify="center">
          {stats.map((stat, index) => (
            <Grid key={index} item xs={12} sm={3}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>{stat.icons}</Avatar>
                }
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
    </ThemeProvider>
  );
}

export default Stats;
