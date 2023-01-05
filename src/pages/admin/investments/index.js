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
import { useDispatch } from "react-redux";
import { loading$ } from "../../../redux/action";

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
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const alldeposits = firestore
      .collection("investments")
      .orderBy("created_at", "desc");
    collectionData(alldeposits, "id").subscribe((data) => {
      setDeposits(data);
    });
  }, []);

  const updateInvestment = (data) => {
    dispatch(loading$());
    console.log(data);
    const newdp = parseInt(data.deposit_amount);
    const newrate = parseInt(data.rate);
    const rt_amount = (newrate / 100) * newdp + newdp;

    firestore
      .doc(`users/${data.userid}`)
      .collection("deposits")
      .doc(data.depositid)
      .update({
        complete: true,
        return_amount: rt_amount,
      })
      .then(() => {
        firestore
          .doc(`users/${data.userid}`)
          .collection("notification")
          .add({
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            amount: rt_amount,
            type: "investment",
          })
          .catch((err) => {
            console.log(err);
          });

        firestore
          .doc(`investments/${data.id}`)
          .delete()
          .then(() => dispatch(loading$()))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Description</TableCell>

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
                    <Typography variant="caption">{dep.user}</Typography>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  {formatLocaleCurrency(dep.deposit_amount, "USD", {
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
