import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function Guide() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.get_started.title}
          subheader={currentStrings.homepage.pages.get_started.subheader}
        />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop} maxWidth="lg">
      <Typography variant="body1">
        {`${currentStrings.homepage.pages.get_started.typeA} cryptotradecenter.co investment Limited.`}
      </Typography>
      <br />
      <Typography variant="body1">
        {currentStrings.homepage.pages.get_started.typeB}
      </Typography>
      <br />
      <Typography variant="body1">
        {currentStrings.homepage.pages.get_started.typeC}
      </Typography>
    </Container>
  );
}

export default Guide;
