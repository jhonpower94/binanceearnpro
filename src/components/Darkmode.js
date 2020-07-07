import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector } from "react-redux";
import { AppContext } from "../App";

export default function Nightmode() {
    const currentStrings = useSelector((state) => state.language);
  const [checked, setChecked] = React.useState(false);
  const {darktheme, setDarktheme} = useContext(AppContext);
  const toggleChecked = () => {
    setChecked((prev) => !prev);
    setDarktheme({ status: !darktheme.status });
    console.log(darktheme);
  };

  return (
    <FormControlLabel
      control={
        <Switch color="primary" checked={checked} onChange={toggleChecked} />
      }
      label="Dark mode"

    />
  );
}
