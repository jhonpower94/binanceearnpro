import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Box, Typography } from "@material-ui/core";
import { firestore, collectionData } from "../../../../config";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { AppContext } from "../../../../App";
import { reactLocalStorage } from "reactjs-localstorage";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 200,
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
    <TableContainer>
      <Table aria-label="sticky table" className={classes.container}>
        <TableBody>
          {withdrawal.slice(0, 5).map((trans, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index}>
              <TableCell align="left" colSpan={2}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">{`${trans.name}`}</Typography>
                </Box>
              </TableCell>

              <TableCell align="right">
                <Typography variant="h5">
                  {formatLocaleCurrency(trans.amount, currency, {
                    autoFixed: false,
                  })}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
