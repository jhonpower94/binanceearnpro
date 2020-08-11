import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function Guide() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Guide Title" image="guidewhite.svg" />,
    });
    window.scrollTo(0, 0);
  }, []);

  return <Container className={classes.margintop}>Guide us</Container>;
}

export default Guide;
