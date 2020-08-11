import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

const ios = {
  title: "Ios",
  values: [
    { image: "IOS images", text: "ios text" },
    { image: "IOS images two", text: "ios text 2" },
  ],
};
const android = {
  title: "Android",
  values: [
    { image: "Android images", text: "Android text" },
    { image: "Android images two", text: "Android text 2" },
  ],
};
const windows = {
  title: "Windows",
  values: [
    { image: "windows images", text: "windows text" },
    { image: "windows images two", text: "Android text 2" },
  ],
};

const switchDownload = (action) => {
  switch (action) {
    case "ios":
      return ios;

    case "android":
      return android;

    case "windows":
      return windows;
  }
};

function Downloads(props) {
  const classes = useStyles();
  const { page } = props;
  const { setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Downloads" image="downloadwhite.svg" />,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop}>
      <Typography>{switchDownload(page).title}</Typography>
    </Container>
  );
}

export default Downloads;
