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
  Container,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { VerifiedUserSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mtop: {
    marginTop: theme.spacing(2),
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
    <Container className={classes.mtop}>
      <Grid container spacing={4}>
        {[
          { title: "bitcoin", image: require("../images/icons/i-btn.png") },
          { title: "Etheriem", image: require("../images/icons/i-pmoney.png") },
          { title: "Comodo", image: require("../images/icons/i-ssl.png") },
          { title: "DDos", image: require("../images/icons/i-ddos.png") },
        ].map((val, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <Box display="flex" justifyContent="center">
              <img src={val.image} height="30" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Payment;
