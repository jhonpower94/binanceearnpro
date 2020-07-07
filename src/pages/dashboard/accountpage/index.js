import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItemAvatar,
  Typography,
  Avatar,
} from "@material-ui/core";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  orange: {
    color: theme.palette.getContrastText("#fafafa"),
    backgroundColor: "#fafafa",
  },
  margintop: {
    marginTop: theme.spacing(5)
  }
}));

function DashboardPage() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.column}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>&#128176;</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Available balance"
                  secondary="Deposits and earnings"
                />
              </ListItem>

              <div className={classes.row}>
                <Typography variant="h4">$ 5,00</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.column}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>&#128142;</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Bonus balance"
                  secondary="Referral and other bonus"
                />
              </ListItem>

              <div className={classes.row}>
                <Typography variant="h4">$ 1,00</Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm" >
        <Paper className={classes.margintop}>
          <List>
            <ListItem>
              <ListItemText primary="Total deposited" />
              <ListItemSecondaryAction>
                <Typography>$ 400</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default DashboardPage;
