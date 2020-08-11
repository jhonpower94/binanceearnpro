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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(4),
  },
  link: {
    cursor: "pointer",
  },
}));

const blocs = [1, 2, 3, 4, 5, 6, 7, 8];

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
    <Container className={classes.margintop} maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="h1" align="center">
          Best forext trading management platform you can rely on
        </Typography>
        <Typography variant="body1" align="center">
          At Hotblock, our entire business is to make forex trading more better
          and easier for traders and investors, with advance trading tools and
          Hotbloc Expert mangers, forex trading has never been easier and safe
        </Typography>

        <Link
          component="button"
          variant="h6"
          color="primary"
          onClick={() => {}}
          className={clsx(classes.link, classes.margintop)}
        >
          Trade Blocks
        </Link>
      </Box>
      <Grid container spacing={3} justify="center" className={classes.margintop}>
        {blocs.map((bloc, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <Card variant="outlined">
              <Box display="flex" flexDirection="column" alignItems="center">
                Image Here
                <Typography variant="body1" color="primary">
                  288.63
                </Typography>
                <Typography variant="caption">Avg. Return</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
