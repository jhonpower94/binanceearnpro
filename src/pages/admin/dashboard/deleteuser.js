import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";

import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function DeleteUsers() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Container className={classes.margintop}>DeleteUsers</Container>;
}

export default DeleteUsers;
