import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container, Typography } from "@material-ui/core";

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

  return (
    <Container className={classes.margintop} maxWidth="lg">
      <Typography variant="body1">
        To make your first deposit and start earning, you have to be registered
        user on the website of coininvest.net investment Limited.
      </Typography>
      <br />
      <Typography variant="body1">
        You should have personal account which you will be able to make an
        investment in the cryptocurrency markets, get daily profits on an
        ongoing investment and withdraw as well, you can also use affiliate link
        to increase your income.
      </Typography>
      <br />
      <Typography variant="body1">
        Registration process is quite simple and fast enough. Just specify your
        personal details and Bitcoin address. It's free and doesn't require any
        email confirmation or some your documents.
      </Typography>
    </Container>
  );
}

export default Guide;
