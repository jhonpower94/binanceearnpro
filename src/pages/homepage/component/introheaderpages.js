import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import "../homepage.css";
import {
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "10em",
  },
  introtext: {
    color: theme.palette.getContrastText("#ef6c00"),
  },
  headerpage: {
    background: theme.palette.primary.main,
  },
  toolbar: theme.mixins.toolbar,
  space: {
    flexGrow: 1,
  },
}));
function IntroHeaderPages(props) {
  const classes = useStyles();
  const { title, subheader } = props;
  const { darktheme, setDarktheme } = useContext(AppContext);
  useEffect(() => {}, []);

  return (
    <div className={classes.headerpage}>
      <div className={classes.toolbar} />
      <Container maxWidth="lg">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={12}>
            <Box mt={2}>
              <Typography variant="h4" color="secondary">
                {title}
              </Typography>
              <Typography variant="h6" color="secondary">
                {subheader}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default IntroHeaderPages;
