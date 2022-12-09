import { Button, Grid, IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  ArrowForwardIosRounded, CloseRounded,
  MenuRounded
} from "@material-ui/icons";
import { navigate } from "@reach/router";
import clsx from "clsx";
import React from "react";

export const menuLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Plans", path: "/plans" },
  { title: "Guide", path: "/guide" },
  { title: "Faq", path: "/faqs" },
];

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function MenuDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton aria-label="dismiss" onClick={toggleDrawer(anchor, false)}>
          <CloseRounded />
        </IconButton>
      </div>
      <List>
        {menuLinks.map((link, index) => (
          <ListItem button key={index} onClick={() => navigate(link.path)}>
            <ListItemText primary={link.title} />
            <ArrowForwardIosRounded />
          </ListItem>
        ))}
      </List>
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disableElevation
              onClick={() => navigate("account")}
            >
              Sign in
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              onClick={() => navigate("account/register")}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("top", true)}
        aria-label="upload picture"
        component="span"
      >
        <MenuRounded size="large" />
      </IconButton>

      <React.Fragment>
        <SwipeableDrawer
          anchor={"top"}
          open={state.top}
          onClose={toggleDrawer("top", false)}
          onOpen={toggleDrawer("top", true)}
        >
          {list("top")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
