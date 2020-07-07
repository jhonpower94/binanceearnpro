import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import {ExpandMoreSharp, ExpandLessSharp} from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  ListItemIcon,
  Divider,
  IconButton,
  Collapse
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
  display: {
    display: "block",
  },
  displaynone: {
    display: "none",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

const dataArray = [
  {
    Type: "deposit",
    deposit: true,
    amount: 100,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    trader: "SHY & JGH",
  },
  {
    Type: "Withdrawal",
    amount: 100,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    reciever: "TCSFGC653645GCHCHC5E5CHGCJVHJV5yrututuyt",
  },
];
function Transactions() {
  const classes = useStyles();
  const [selected, setSeleted] = useState(0);
  

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          {dataArray.map((data, index) => (
            <div key={index} className={classes.column}>
              <ListItem className={classes.row}>
                <ListItemText
                  primary={data.Type}
                  secondary={`@ ${data.date} ${data.time}`}
                />
                <ListItemIcon>
                  <IconButton onClick={()=>setSeleted(index)}>
                    <ExpandMoreSharp/>
                  </IconButton>
                </ListItemIcon>
                <Typography>${data.amount}</Typography>
              </ListItem>

              <ListItem alignItems="center"
                className={
                  index == selected ? classes.display : classes.displaynone
                }
              >
                <ListItemText aria-multiline={true}
                  primary={
                    data.deposit ? "Deposit Account" : "Reciever Address"
                  }
                  secondary={data.deposit ? data.trader : data.reciever}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Transactions;
