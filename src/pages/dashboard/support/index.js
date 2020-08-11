import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Box,
  CardContent,
  Avatar,
  ListItem,
  Typography,
  Button,
  CardHeader,
} from "@material-ui/core";
import { SmsRounded } from "@material-ui/icons";
import { deepOrange } from "@material-ui/core/colors";

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
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
         <CardHeader action={
           <img
           src={require("../icons/support.svg")}
           alt="image"
           width="80"
         />
         }
         title="Live Support"
         subheader="chat with our 24/7 customer support service"
         />
          <CardContent>
            <Button variant="contained" color="primary" fullWidth>
              Start Chat
            </Button>
          </CardContent>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Support;
