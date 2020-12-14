import { Link, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export default function Copyright() {
  const currentStrings = useSelector((state) => state.language);

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`${currentStrings.account.copyright} © `}
      <Link color="inherit" href="https://reliancexchange.co/">
        Hotblockinvest
      </Link>{" "}
    </Typography>
  );
}
