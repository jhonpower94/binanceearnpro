import {
  Badge, Box, Button, ButtonGroup, Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  CheckSharp, ClearSharp
} from "@material-ui/icons";
import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import React, { useContext, useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { AppContext } from "../../../App";
import { collectionData, docData, firestore } from "../../../config";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function TransactionsAdmin() {
  const classes = useStyles();
  const { updateWalletBalance, setupdateWalletBalance } = useContext(
    AppContext
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTranactions] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const alltransactions = firestore
      .collection("transactions")
      .orderBy("timestamp", "desc");
    collectionData(alltransactions, "id").subscribe((data) => {
      setTranactions(data);
    });
  }, []);

  // withdrawal
  const setTransactionComplete = (trans, val, del) => {
    firestore
      .doc(`transactions/${trans.id}`)
      .update({
        pending: !val,
        complete: val,
      })
      .then(() => {
        const amountnn = formatLocaleCurrency(trans.return_amount, "USD", {
          autoFixed: false,
        });
        if (!val) {
          console.log("delete me");
        }

        ajax({
          url: "https://mega.binanceearnpro.online/sendmail",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `your ${trans.type} transaction has been ${
              val ? "sucessfully updated" : "canceled"
            } <br/>
           Amount: ${amountnn} <br/>
           Status ${
             val
               ? "<p style='color: #06b956;'>successful</p></p>"
               : "<p style='color: #f44336;'>Canceled</p></p>"
           } `,
            to: `${trans.email}, service@binanceearnpro.online`,
            subject: "Withdrawal",
          },
        }).subscribe(() => {
          if (del) {
            firestore.doc(`transactions/${trans.id}`).delete();
          }
          console.log("user message sent");
        });
      });
  };

  const setWalets = (trans) => {
    const query = firestore.doc(`users/${trans.userid}`);
    docData(query, "id").subscribe((data) => {
      const oldamount = data.wallet_balance;
      const newamount = oldamount + trans.return_amount;
      setupdateWalletBalance({
        ...updateWalletBalance,
        userid: trans.userid,
        transid: trans.id,
        newamount: trans.return_amount,
        currentAmount: isNaN(oldamount) ? trans.return_amount : newamount,
        email: trans.email,
        pending: false,
      });
      navigate("../manager/updatewallet");
    });
  };

  const cancelWalletDeposit = (trans) => {
    const query = firestore.doc(`users/${trans.userid}`);
    docData(query, "id").subscribe((data) => {
      const oldamount = data.wallet_balance;
      const newamount = oldamount + 0;
      setupdateWalletBalance({
        ...updateWalletBalance,
        userid: trans.userid,
        transid: trans.id,
        newamount: trans.return_amount,
        currentAmount: isNaN(oldamount) ? 0 : newamount,
        email: trans.email,
        pending: true,
        delete: true,
      });
      navigate("../manager/updatewallet");
    });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center" colSpan={2}>
                Status
              </TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((trans, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                <TableCell align="left">
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1">{trans.type}</Typography>
                    <Typography variant="caption">{`${trans.name} ${trans.firstname}  ${trans.lastname}`}</Typography>
                  </Box>
                </TableCell>

                <TableCell align="center" colSpan={2}>
                  {trans.pending ? (
                    <Badge badgeContent="pending" color="error" />
                  ) : (
                    <Badge badgeContent="successful" color="primary" />
                  )}
                </TableCell>
                <TableCell align="right">
                  {formatLocaleCurrency(trans.return_amount, trans.currency, {
                    autoFixed: false,
                  })}
                </TableCell>
                <TableCell align="left">{trans.date}</TableCell>
                <TableCell align="left">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    <Button
                      onClick={() => {
                        trans.type === "wallet deposit"
                          ? setWalets(trans)
                          : setTransactionComplete(trans, true, false);
                      }}
                    >
                      <CheckSharp />
                    </Button>
                    <Button
                      onClick={() => {
                        if (trans.type != "wallet deposit") {
                          setTransactionComplete(trans, false, true);
                        } else {
                          cancelWalletDeposit(trans);
                        }
                      }}
                    >
                      <ClearSharp />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
