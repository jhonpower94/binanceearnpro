import React, { useEffect, useContext } from "react";
import {
  makeStyles,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { PlayCircleOutline } from "@material-ui/icons";
import { navigate } from "@reach/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ReactPlayer from "react-player/youtube";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  margintopx: {
    marginTop: theme.spacing(3),
  },
}));

function AboutHome() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={3}
        direction={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? "row"
            : "column-reverse"
        }
      >
        <Grid item xs={12} sm={6}>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
            <Box
              mt={5}
              mb={5}
              display="flex"
              flexDirection="column"
              alignItems={
                useMediaQuery(useTheme().breakpoints.up("sm"))
                  ? "flex-start"
                  : "center"
              }
            >
              <Typography
                variant="h4"
                align={
                  useMediaQuery(useTheme().breakpoints.up("sm"))
                    ? "left"
                    : "center"
                }
                style={{ color: "#08091b" }}
              >
                Reliable & profitable trading platform for investment.
              </Typography>
              <Typography
                variant="body1"
                align={
                  useMediaQuery(useTheme().breakpoints.up("sm"))
                    ? "left"
                    : "center"
                }
                color="textSecondary"
                className={classes.margintopx}
                style={{ color: "#000" }}
              >
                We’re reinventing the global equity blockchian – that is secure,
                smart and easy-to-use platform, and completely disrupting the
                way businesses raise capital and the way investors buy and sell
                shares.
              </Typography>
              <Button
                variant="text"
                color="primary"
                size="large"
                startIcon={<PlayCircleOutline />}
                className={classes.margintopx}
                onClick={handleClickOpen}
              >
                watch video
              </Button>
            </Box>
          </AnimationOnScroll>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
            <Box
              mt={5}
              mb={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={require("../images/trade.jpg")}
                alt="logo"
                height="250px"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.margintopx}
                onClick={() => {
                  navigate("/guide");
                }}
              >
                see our documentation
              </Button>
            </Box>
          </AnimationOnScroll>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <ReactPlayer url="https://youtu.be/gZoZN_VZ2Hc" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AboutHome;
