import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import {
  Container,
  Paper,
  Box,
  CardContent,
  Button,
  CardHeader,
} from "@material-ui/core";
import { SmsRounded } from "@material-ui/icons";
import { deepOrange } from "@material-ui/core/colors";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  margins: {
    margin: theme.spacing(2),
  },
}));

function Support() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectedmenuItem$(7));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <CardHeader
            action={
              <img
                src={require("../../homepage/images/message.svg")}
                alt="image"
                width="80"
              />
            }
            title="24 hours Customer Support"
            subheader="chat with our 24/7 customer support service"
          />
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("https://unchainedtrade.com/support")}
            >
              Contact Us
            </Button>
          </CardContent>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Support;
