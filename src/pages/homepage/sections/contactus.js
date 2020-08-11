import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

const arraydata = [
    {
        "name": "gold",
        "id": 1,
        "start": 12,
        "market": "usd/eur",
        "return": 15,
        "date": "8/4/2020"
    },
    {
        "name": "gold",
        "id": 2,
        "start": 12,
        "market": "usd/eur",
        "return": 15,
        "date": "8/4/2020"
    },
];

function Contactus() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Contactus Title" image="messagewhite.svg" />,
    });
    window.scrollTo(0, 0);
    console.log(arraydata.slice(1, 2))
  }, []);

return <Container className={classes.margintop}>Contactus</Container>;
}

export default Contactus;

