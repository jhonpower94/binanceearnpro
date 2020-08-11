import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(3),
  },
}));

const locations = [
  {
    name: "NG",
    Address: "No 332B Alaba Intl Square",
  },
  {
    name: "US",
    Address: "No 332B Alaba Intl Square",
  },
  {
    name: "UK",
    Address: "No 332B Alaba Intl Square",
  },
  {
    name: "RS",
    Address: "No 332B Alaba Intl Square",
  },
];

const array = locations.slice(0, 1);

function Locations(props) {
  const classes = useStyles();
  const { single } = props;
  const { setIntro } = useContext(AppContext);

  const [newLocation, setNewLocation] = useState([]);
  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="location Title" image="locationwhite.svg" />,
    });
    window.scrollTo(0, 0);
    single ? setNewLocation(array) : setNewLocation(locations);
  }, []);

  return (
    <Container className={classes.margintop}>
      <Grid container spacing={3}>
        {newLocation.map((loc, index) => (
          <Grid key={index} item xs={12} sm={single ? 12 : 4}>
            <ListItem>
              <ListItemAvatar>
                <img src={require("../../../images/mobile.svg")} width="50" />
              </ListItemAvatar>

              <ListItemText
                primary={<Typography>{loc.name}</Typography>}
                secondary={<Typography variant="h6">{loc.Address}</Typography>}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Locations;
