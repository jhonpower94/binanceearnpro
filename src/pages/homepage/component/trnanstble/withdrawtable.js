import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { firestore, collectionData } from "../../../../config";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { AppContext } from "../../../../App";
import { reactLocalStorage } from "reactjs-localstorage";
import { red } from "@material-ui/core/colors";
import { AnimationOnScroll } from "react-animation-on-scroll";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 400,
    marginTop: "10px",
  },
});

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // Purple and green play nicely together.
      main: red[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#fff",
    },
    /*  background: {
      default: "#fff",
    }, */
    action: {
      selected: "#2196f33d",
    },
  },
});

export default function WithdrawTable() {
  const classes = useStyles();
  const { transactiondatas } = useContext(AppContext);
  const [withdrawal, setwithdrawal] = React.useState([]);
  const currency = reactLocalStorage.getObject("country").currencycode;
  useEffect(() => {
    /*  const alltransactions = firestore
      .collection("transactions")
      .where("type", "==", "Deposit withdrawal")
      .where("pending", "==", false)
      .orderBy("timestamp", "desc");
    collectionData(alltransactions, "id").subscribe((data) => {
      const newTransactions = data.slice(0, 5);
      setTranactions(newTransactions);
    }); */

    const currentwithdrawal = transactiondatas.filter((el) => {
      return el.type == "Deposit withdrawal";
    });
    setwithdrawal(currentwithdrawal);
  }, []);

  return (
 
    
      <Table aria-label="sticky table">
        <TableBody>
          {withdrawal.slice(0, 5).map((trans, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index}>
              <TableCell align="left" colSpan={2}>
                <AnimationOnScroll
                  animateIn="animate__fadeInUp"
                  animateOnce={true}
                >
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1">{`${trans.name}`}</Typography>
                  </Box>
                </AnimationOnScroll>
              </TableCell>

              <TableCell align="right">
                <AnimationOnScroll
                  animateIn="animate__fadeInUp"
                  animateOnce={true}
                >
                  <Typography variant="body1" color="textSecondary">
                    {formatLocaleCurrency(trans.amount, currency, {
                      autoFixed: false,
                    })}
                  </Typography>
                </AnimationOnScroll>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  );
}
