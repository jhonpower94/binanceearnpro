import { Link, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SelectLanguage from "../../components/lang_select";

export default function Copyright() {
  const currentStrings = useSelector((state) => state.language);

  return (
    <Typography variant="body2" color="primary" align="center">
      {` © `}
      <Link color="primary" href="https://relianceexchange.co/">
        RELIANCEEXCHAGE
      </Link>
    </Typography>
  );
}
