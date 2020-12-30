import React, { useEffect } from "react";

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Snackbar,
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { CloseSharp, FileCopySharp } from "@material-ui/icons";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "25ch",
  },
}));

function CopyInput(props) {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { name, value, id } = props;
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [[snackPack, messageInfo, open]]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth disabled size="small">
        <InputLabel htmlFor="outlined-adornment-password">{name}</InputLabel>
        <OutlinedInput
          id={id}
          type="text"
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <CopyToClipboard
                text={value}
                onCopy={handleClick(currentStrings.Dashboard.account_info.copy_link)}
              >
                <IconButton aria-label="toggle password visibility" edge="end">
                  <FileCopySharp />
                </IconButton>
              </CopyToClipboard>
            </InputAdornment>
          }
          labelWidth={100}
        />
      </FormControl>

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <div>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseSharp />
            </IconButton>
          </div>
        }
      />
    </div>
  );
}

export default CopyInput;
