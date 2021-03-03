import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../../App";
import "../homepage.css";
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  createMuiTheme,
  useMediaQuery,
  useTheme,
  Slide,
} from "@material-ui/core";

import Particles from "react-tsparticles";
import { blue, red } from "@material-ui/core/colors";
import ArmChart from "./armchart";
import Background from "../../../pages/homepage/images/header-middle-bg.png";
import Backgroundsecond from "../../../pages/homepage/images/header-middle-bg1.png";
import { navigate } from "@reach/router";
import { useSelector } from "react-redux";
import { AnimationOnScroll } from "react-animation-on-scroll";

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
  image: {
    height: "20em",
    transform: "rotate3d(1, -1, 0, 60deg)",
  },
  imagemoile: {
    height: "16em",
  },
  intro: {
    paddingTop: "40px",
    zIndex: 1,
    position: "relative",
  },
  header: {
    //  background: `url(${Background}) center no-repeat`,
    background: "#08091b",

    backgroundSize: "cover",
  },
  headerRtl: {
    background: `url(${Backgroundsecond}) center no-repeat`,
    height: "600px",
    backgroundSize: "cover",
  },
  toolbar: theme.mixins.toolbar,
  space: {
    flexGrow: 1,
  },
}));
function IntroHeader() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { intro, rightoleft } = useContext(AppContext);
  useEffect(() => {}, []);

  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        // Purple and green play nicely together.
        main: red[900],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#fafafa",
      },
      /*  background: {
        default: "#fff",
      }, */
      action: {
        selected: "#2196f33d",
      },
    },
  });

  return (
    <div className={classes.header}>
      <div className={classes.toolbar} />
      <Particles
      //  height="500px"
        // height={useMediaQuery(useTheme().breakpoints.up("sm")) ? "80%" : "85%"}
        style={{ position: "absolute" }}
        id="tsparticles"
        options={{
          background: {
              color: {
              value: "#08091b",
            }, 
            /*
            image: `url(${Background})`,

            size: "cover",
            repeat: "no-repeat",
            position: "center center",
            */
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#1565c0",
            },
            links: {
              color: "#1565c0",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <div className={classes.intro}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box mt={5} style={{ color: "#fafafa" }}>
                <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                  <Typography
                    variant="h4"
                    align={
                      useMediaQuery(useTheme().breakpoints.up("sm"))
                        ? "left"
                        : "center"
                    }
                  >
                    {currentStrings.homepage.intro.title}
                  </Typography>
                </AnimationOnScroll>
              </Box>
              <Box mt={2}>
                <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                  <Typography
                    variant="h6"
                    align={
                      useMediaQuery(useTheme().breakpoints.up("sm"))
                        ? "left"
                        : "center"
                    }
                    color="textSecondary"
                  >
                    {currentStrings.homepage.intro.body}
                  </Typography>
                </AnimationOnScroll>
              </Box>
              <Box
                display="flex"
                justifyContent={
                  useMediaQuery(useTheme().breakpoints.up("sm"))
                    ? "flex-start"
                    : "center"
                }
                mt={2}
              >
                <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      if (intro.refid) {
                        navigate(`account/register/${intro.refid}`);
                      } else {
                        navigate("/account");
                      }
                    }}
                  >
                    {currentStrings.homepage.intro.button}
                  </Button>
                </AnimationOnScroll>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                <Box display="flex" justifyContent="center" mt={2} mb={5} >
                  <img
                    src={require("../images/intro.png")}
                    alt="logo"
                    height="300px"
                  />
                </Box>
              </AnimationOnScroll>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default IntroHeader;

/*
<Grid item xs={12} sm={6}>
              <ArmChart />
            </Grid>

              <Particles
        height="auto"
        // height={useMediaQuery(useTheme().breakpoints.up("sm")) ? "80%" : "85%"}
        style={{ position: "absolute", opacity: 0.8 }}
        id="tsparticles"
        options={{
          background: {
             color: {
              value: blue[800],
            }, 
            image: `url(${Background})`,

            size: "100% 100%",
            repeat: "no-repeat",
            position: "center bottom",
            
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
            */
