import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function Contactus() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.support.title}
          subheader={currentStrings.homepage.pages.support.subheader}
        />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop} maxWidth="md">
      <Grid container spacing={4} justify="center">
        <Grid item xs={6} sm={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-name"
            label="Full name"
            name="name"
            variant="outlined"
            onChange={(e) => {}}
            helperText="Enter your full name"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-email"
            label="Email"
            name="email"
            variant="outlined"
            onChange={(e) => {}}
            helperText="Enter your email address"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            fullWidth
            helperText="Enter your message here"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button variant="contained" color="primary" fullWidth>
            Send email
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contactus;
