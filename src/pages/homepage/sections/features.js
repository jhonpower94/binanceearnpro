import React, { useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Grid,
  CardHeader,
  makeStyles,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@material-ui/core";
import { CheckRounded, CloseRounded, VerifiedUserSharp } from "@material-ui/icons";

const features = [
  {
    title: "Invest",
    icon: require("../../../images/investdot.svg"),
    lists: [
      { action: "Follow multiple trading blocks", is: true },
      { action: "Need to be experienced trader", is: false },
      { action: "Trade Assurace is enabled", is: true },
      { action: "Automatic control of your investment", is: true },
    ],
    button: "Invest now",
  },
  {
    title: "Signal",
    icon: require("../../../images/signaldot.svg"),
    lists: [
      { action: "Follow multiple trading Signals", is: true },
      { action: "Need to be experienced trader", is: true },
      { action: "Trade Assurance is enabled", is: false },
      { action: "Automatic control of your investment", is: false },
    ],
    button: "Subscribe",
  },
];

const useStyles = makeStyles((theme) => ({
  image: {
    height: "4em",
  },
}));

function Features() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Card variant="outlined">
              <Box display="flex" flexDirection="column" alignItems="center">
                <CardHeader
                  avatar={<img src={feature.icon} className={classes.image} />}
                  title={<Typography variant="h5">{feature.title}</Typography>}
                />

                <CardContent>
                  {feature.lists.map((list, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        {list.is ? (
                          <CheckRounded htmlColor="#098b1e" />
                        ) : (
                          <CloseRounded color="error" />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography align="center">{list.action}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                  <Button variant="contained" color="primary" fullWidth>
                    {feature.button}
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default Features;
