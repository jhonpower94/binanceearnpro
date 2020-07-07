import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../../App.css";
import {
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  right: {
    position: "relative",
    top: "6em",
    marginRight: theme.spacing(2),
  },
  space: {
    flexGrow: 1,
  },
}));

const numberaray = [120, 60, 77, 80, 20, 83, 67, 80, 100, 59, 88, 95, 84];

function Invest() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.column}>
              <ListItem>
                <ListItemText primary="Sas & Has" />
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.column}>
              <ListItem className={classes.row}>
                <ListItemText primary="Tys & Hyb" />

                <Typography variant="h5" className={classes.mgright}>
                  3 Days
                </Typography>
                <Button variant="contained" color="primary">
                  Invest
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Minimun stake $100`} />
              </ListItem>
              <div className={classes.row}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="auto"
                  viewBox="0 0 550 30"
                  space="preserve"
                  className="chart"
                >
                  <polyline
                    fill="#ff9800"
                    stroke="#f93d00"
                    strokeWidth="3"
                    fillOpacity="10%"
                    points={`00,120
                            20,${numberaray[1]}
                            40,${numberaray[2]}
                            60,${numberaray[3]}
                            80,${numberaray[6]}
                            100,${numberaray[7]}
                            120,${numberaray[8]}
                            140,${numberaray[9]}
        160,${numberaray[10]}
        180,${numberaray[11]}
        200,${numberaray[12]}
        220,10
        240,70
        260,100
        280,100
        300,40
        320,0
        360,100
        380,120
        400,60
        420,70
        440,80
        460,57
        480,80
        500,73`}
                  />
                </svg>
                <div className={classes.right}>
                  <Typography variant="h4">9%</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Invest;
