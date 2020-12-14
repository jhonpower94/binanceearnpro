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
import { useSelector } from "react-redux";

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
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.about_us.title}
          subheader={`${currentStrings.homepage.pages.about_us.subheader} relianceexchange.co`}
        />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" className={classes.margintop}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={12}>
          <CardContent>
            <Typography align="left" variant="subtitle2">
              {`relianceexchange.co ${currentStrings.homepage.pages.about_us.typeA}`}
            </Typography>
            <br />
            <Typography align="left" variant="subtitle2">
              {`relianceexchange.co ${currentStrings.homepage.pages.about_us.typeB}`}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
