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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        mt={4}
        className={classes.introtext}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">
          Professional Forex trading signal and platform for traders
        </Typography>
      </Box>
    </Container>
  );
}

export default IntroHeaderPages;
