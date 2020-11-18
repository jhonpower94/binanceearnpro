import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  CardHeader,
  Typography,
} from "@material-ui/core";
import Particles from "react-tsparticles";
import Background from "../images/main2-bg.png";
import { blue } from "@material-ui/core/colors";
import { ShareSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

function Calculator() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Particles
        // height="50px"
        // height={useMediaQuery(useTheme().breakpoints.up("sm")) ? "80%" : "85%"}
        style={{ position: "absolute" }}
        id="tsparticles"
        options={{
          background: {
            /* color: {
              value: blue[800],
            }, */
            image: `url(${Background})`,

            size: "100% 100%",
            repeat: "no-repeat",
            position: "center center",
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
      <Container maxWidth="sm" style={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={12}>
            <CardHeader
              title="Calculate investment"
              subheader="Calculcale investment total profits"
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{ align: "center" }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            one
          </Grid>
          <Grid item xs={6} sm={6}>
            two
          </Grid>
          <Grid item xs={6} sm={6}>
            three
          </Grid>
        </Grid>
      </Container>
      <Container>
      <Grid container spacing={3} justify="center" style={{ position: "relative", zIndex: 1 }}>
        <Grid item xs={6} sm={6}>
          <CardHeader
            avatar={<ShareSharp style={{ fontSize: "100" }} />}
            title={<Typography variant="h5">AFFILATE PROGRAMM</Typography>}
            subheader="Each your referral brings you reward from his deposit amount. Your own deposit is not required to attract investors and earn. Just register account and apply your referral link everywhere you can."
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <CardHeader
            avatar={
              <img src={require("../images/certificate1.png")} width="100" />
            }
            title={
              <Typography variant="h5">
                Coinspringinvest.net MINING LIMITED
              </Typography>
            }
            subheader="In July 2016 Coinspringinvest.net Mining Limited passed the incorporation process in the United Kingdom and is listed by Companies House."
          />
        </Grid>
      </Grid>
    
      </Container>
     </div>
  );
}

export default Calculator;
