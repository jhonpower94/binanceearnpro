import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Link,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  icon: {
    fontSize: theme.spacing(30),
  },
}));

function Complete(props) {
  const classes = useStyles();

  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <CheckCircle htmlColor="#1b9e2b" className={classes.icon} />
        <Box m={2}>
          <Typography align="center" variant="body1">
            Your Transaction successful and is now being processed, thank you
            &#10084;&#65039;
            <Link component="button" onClick={() => navigate("./")}>
              {`go to dashboard`}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Complete;
