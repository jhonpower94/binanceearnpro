import React, { useEffect } from "react";
import {
  Grid,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  makeStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { VerifiedUserSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "15em",
  },
  icon: {
    fontSize: "5em",
  },
}));

const dealers = [
  {
    name: "Conbase",
    value: 5,
  },
  {
    name: "Luno",
    value: 4,
  },
  {
    name: "Paxfull",
    value: 4,
  },
];

function Payment() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column" alignItems="center" m={4}>
            <img
              src={require("../images/cryptos.svg")}
              className={classes.image}
              alt="image"
            />
            <Typography variant="h5">Title goes here</Typography>
            <Typography>SubTitle goes here</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              m={4}
            >
              <VerifiedUserSharp htmlColor="#098b1e" className={classes.icon} />
              <Typography variant="h6">Verified dealers</Typography>
            </Box>
            <List>
              {dealers.map((dealer, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar>&#128176;</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography>{dealer.name}</Typography>}
                  />
                  <Rating value={dealer.value} readOnly />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Payment;
