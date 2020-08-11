import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  Avatar,
  Box,
  Grid,
  Fade,
} from "@material-ui/core";
import {
  CancelSharp,
  CheckBoxSharp,
  CheckRounded,
  CloseRounded,
  StarSharp,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  cardheader: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  cardimage: {
    position: "relative",
    top: "2.5em",
  },
  avater: {
    width: "5em",
    height: "5em",
    background: "#fafafa",
    color: theme.palette.getContrastText("#fafafa"),
  },
}));

const signals = [
  {
    name: "Basic",
    price: 100,
    period: 1,
    support: false,
  },
  {
    name: "Pro",
    price: 500,
    period: 6,
    support: true,
    popular: true,
  },
  {
    name: "Pro",
    price: 800,
    period: 12,
    support: true,
  },
];

function Signal() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Signal Title" image="tradecopywhite.svg" />,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop}>
      <Grid container spacing={3} justify="center">
        {signals.map((signal, index) => (
          <Fade
            in={true}
            key={index}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <div className={classes.cardheader}>
                  <CardHeader
                    title={`$ ${signal.price}`}
                    action={
                      signal.popular ? <StarSharp color="secondary" fontSize="large" /> : null
                    }
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    className={classes.cardimage}
                  >
                    <Avatar className={classes.avater}>
                      <Typography variant="h5">{signal.name}</Typography>
                    </Avatar>
                  </Box>
                </div>

                <List>
                  <ListItem>
                    <ListItemText primary="Period" />
                    <ListItemSecondaryAction>
                      <Typography variant="h5">{`${signal.period} Month`}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Extra Trading Support" />
                    <ListItemSecondaryAction>
                      {signal.support ? (
                        <CheckRounded htmlColor="#098b1e" fontSize="large" />
                      ) : (
                        <CloseRounded color="error" fontSize="large" />
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="primary" fullWidth>
                      Subscribe
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default Signal;
