import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Box, Typography, Badge } from "@material-ui/core";
import firebase, { firestore, collectionData } from "../../../config";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { DoneSharp } from "@material-ui/icons";
import { ajax } from "rxjs/ajax";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Investments() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deposits, setDeposits] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const alldeposits = firestore
      .collection("alldeposits")
      .where("type", "==", "investment")
      .orderBy("created_at", "desc");
    collectionData(alldeposits, "id").subscribe((data) => {
      setDeposits(data);
    });
  }, []);

  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const updateInvestment = (data) => {
    console.log(data);
    firestore
      .doc(`users/${data.userid}`)
      .collection("deposits")
      .add({
        block_name: data.block_name,
        block_title: data.block_title,
        deposit_amount: parseInt(data.deposit_amount),
        amount: parseInt(data.amount),
        userid: data.userid,
        complete: false,
        date: new Date().toLocaleDateString(),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((tr) => {
        console.log("transaction added");
        const depositid = tr.id;

        const date = new Date();

        const newDate = addDays(date, data.duration);

        ajax({
          url: `https://binanceearnpro.online/plans`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            blockindex: 1,
            deposit_amount: data.deposit_amount,
            userid: data.userid,
            depositid: depositid,
            duration: data.duration,
            currency: "USD",
            rate: data.rate,
          },
        }).subscribe(() => {
          console.log("started cron");
          firestore
            .doc(`alldeposits/${data.id}`)
            .update({
              pending: false,
            })
            .then(() => {
              ajax({
                url: "https://binanceearnpro.online/sendmail",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: {
                  message: `your Investment transaction has been successfully updated <br/><br/>
                Description: Account Wallet Deposit <br/>
                Amount: ${data.deposit_amount} <br/>
                Status <p style="color: #06b956;">successful</p></p>`,
                  to: `${data.email}, support@binanceearnpro.online`,
                  subject: "Transaction update",
                },
              }).subscribe(() => console.log("user message sent"));
            });
          if (data.referrer) {
            //add referrer bonus is true
            firestore
              .doc(`users/${data.referrerid}`)
              .collection("bonus")
              .add({
                amount: 5,
                deposit_amount: 5,
                from: `${data.firstname} ${data.lastname}`,
                description: "Referral bonus",
                date: new Date().toLocaleDateString(),
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                console.log(`referral added`);
                firestore
                  .doc(`users/${data.referrerId}`)
                  .collection("notification")
                  .add({
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    amount: 5,
                    type: "Bonus",
                  });

                firestore.doc(`users/${data.userid}`).update({
                  referrer: false,
                });
              });
          } else {
            return null;
          }
        });
      });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Deposit Amount</TableCell>
              <TableCell align="right">Deposit Date</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">userid</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deposits.map((dep, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                <TableCell align="left">
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1">{dep.block_name}</Typography>
                    <Typography variant="caption">{`${dep.firstname} ${
                      dep.lastname
                    } ${dep.email}`}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {dep.pending ? (
                    <Badge badgeContent="pending" color="error" />
                  ) : (
                    <Badge badgeContent="successful" color="primary" />
                  )}
                </TableCell>
                <TableCell align="right">
                  {formatLocaleCurrency(dep.deposit_amount, dep.currency, {
                    autoFixed: false,
                  })}
                </TableCell>
                <TableCell align="right">
                  {new Date(dep.created_at.seconds * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={dep.pending ? false : true}
                    onClick={() => updateInvestment(dep)}
                  >
                    <DoneSharp />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Typography>{dep.userid}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={deposits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
