import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  Grid,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import ChartsPage from "./charts";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(1),
  },
}));

function Account() {
  const classes = useStyles();
  const { tabs, setTabs } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg">
      
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={4}>
          <ListItemText
            primary={<Typography variant="subtitle2">Main Balance</Typography>}
            secondary={<Typography variant="h5">77988888</Typography>}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <ListItemText
            primary={<Typography variant="subtitle2">Bonus Balance</Typography>}
            secondary={<Typography variant="h5">79789</Typography>}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <ListItemText
            primary={
              <Typography variant="subtitle2">Wallet Balance</Typography>
            }
            secondary={<Typography variant="h5">77868689</Typography>}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <ChartsPage />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
