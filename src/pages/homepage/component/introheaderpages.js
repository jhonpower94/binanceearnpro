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
}));
function IntroHeaderPages(props) {
  const classes = useStyles();
  const { image, title } = props;
  const { darktheme, setDarktheme } = useContext(AppContext);
  useEffect(() => {}, []);

  return (
    <Container id="intro">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center" mt={1}>
            <img
              src={require(`../images/${image}`)}
              alt="image"
              className={classes.image}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={1}
            className={classes.introtext}
          >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h6" align="center">
              Professional Forex trading signal and platform for traders
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default IntroHeaderPages;
