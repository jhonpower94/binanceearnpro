import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function PositionedSnackbar({ open, setOpen, type }) {
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      key={"top" + "center"}
    >
      <Alert severity="success">
        Your {type} withdrawal has been successfully addeded to your wallet
        balance.
      </Alert>
    </Snackbar>
  );
}

export function SnackbarWallet({ open, setOpen, type }) {
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      key={"top" + "center"}
    >
      <Alert severity="success">
        Your {type} withdrawal was successful, payment will be sent to your
        provided address shortly.
      </Alert>
    </Snackbar>
  );
}
