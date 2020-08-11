import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

const privacy = {
  title: "Privacy Policy",
  values: [
    { title: "Title 2", text: "privacy  text 1" },
    { title: "Title 2", text: "privacy  text 2" },
  ],
};

const terms = {
  title: "Terms",
  values: [
    { title: "Title 1", text: "Terms  text 1" },
    { title: "Title 2", text: "Terms  text 2" },
  ],
};

const euData = {
  title: "E.U Data Protection",
  values: [
    { title: "Title 2", text: "eu data protection  text" },
    { title: "Title 2", text: "eu data protection  text 2" },
  ],
};

const switchSecurity = (action) => {
  switch (action) {
    case "privacy":
      return privacy;

    case "terms":
      return terms;

    case "eu":
      return euData;
  }
};

function Security(props) {
  const classes = useStyles();
  const { page } = props;
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Security Title" image="securitywhite.svg" />,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop}>
      {switchSecurity(page).title}
    </Container>
  );
}

export default Security;
