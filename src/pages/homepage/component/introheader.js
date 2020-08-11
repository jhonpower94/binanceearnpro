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
  mobileIntrolarge: {
    width: "-webkit-fill-available",
  },
  mobileIntro: {
    width: "-webkit-fill-available",
  },
  introcolor: {
    color: theme.palette.getContrastText("#ef6c00"),
  },
}));
function IntroHeader() {
  const classes = useStyles();

  const { darktheme, setDarktheme } = useContext(AppContext);
  useEffect(() => {}, []);

  return (
    <Container id="intro">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center" m={1}>
            {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
              <img
                src={require(darktheme.status
                  ? "../../../images/screenlargelight.svg"
                  : "../../../images/screenlargedark.svg")}
                alt="logo"
                className={classes.mobileIntrolarge}
              />
            ) : (
              <img
                src={require(darktheme.status
                  ? "../../../images/screenmobilelight.svg"
                  : "../../../images/screenmobiledark.svg")}
                alt="logo"
                className={classes.mobileIntro}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            m={1}
            className={classes.introcolor}
          >
            <Typography variant="h4">Hot Block INC</Typography>
            <Typography variant="h6">
              Professional Forex trading signal and platform for traders
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default IntroHeader;
