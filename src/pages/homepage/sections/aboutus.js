import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Link,
  Card,
  Grid,
  Button,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
  link: {
    cursor: "pointer",
  },
  scroll: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
}));

function About() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="About Title" image="aboutwhite.svg" />,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.margintop}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={12}>
          <CardHeader
            title="ABOUT US"
            subheader="ABOUT THE COMPANY"
            titleTypographyProps={{
              align: "center",
            }}
            subheaderTypographyProps={{ align: "center" }}
          />
          <CardContent>
            <Typography align="left" variant="subtitle2">
              coininvest.net investment Limited is ready to propose profitable
              cooperation for all comers. We present a high-tech and modern
              company which is recognized industry leader in the field of
              computer technology, software and innovations. Our technical
              experts are involved in developing new methods and effective
              algorithms of Bitcoin investment. Over last few years coininvest.net
              investment Limited has managed to build a few large investment farms in
              the United Kingdom and Scotland.We have equipped them with the
              most powerful and modern investment hardware that around the clock
              provides excellent results and serves as a source for earnings.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="secondary">
          Login
        </Button>
        <Box ml={3}>
          <Button variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default About;
