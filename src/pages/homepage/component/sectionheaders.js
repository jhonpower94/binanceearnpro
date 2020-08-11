import React, { useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

export const headings = {
  services: {
    title: "service Title here",
    subtitle: "service subtitle here",
    image: "services.svg",
  },
  payment: {
    title: "Payment Title here",
    subtitle: "payment subtitle here",
    image: "payment.svg",
  },
  addtrade: {
    title: "addtrade Title here",
    subtitle: "addtrade subtitle here",
    image: "copytrade.svg",
  },
  activities: {
    title: "Recent Hotblock Activites",
    subtitle: "Activites subtitle here",
    image: "activities.svg",
  },
  blockdata: {
    title: "blockdata Title here",
    subtitle: "blockdata subtitle here",
    image: "blockdata.svg",
  },
};

const useStyles = makeStyles((theme) => ({
  image: {
    height: "10em",
  },
}));

function SectionHeader(props) {
  const classes = useStyles();
  const { title, subtitle, image } = props;
  useEffect(() => {}, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={4}>
      <img
        src={require(`../images/${image}`)}
        className={classes.image}
        alt="image"
      />
      <Typography variant="h5">{title}</Typography>
      <Typography>{subtitle}</Typography>
    </Box>
  );
}

export default SectionHeader;
