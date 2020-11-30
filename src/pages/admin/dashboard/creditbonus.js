import React, { useEffect } from "react";
import firebase, { firestore, collectionData } from "../../../config";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Button } from "@material-ui/core";
import { ajax } from "rxjs/ajax";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

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

export default function CreditBonus() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [aAllusers, setaAllusers] = React.useState([]);
  const [state, setState] = React.useState({
    description: "",
    amount: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getUsers = firestore.collection("users");
    collectionData(getUsers, "id").subscribe((data) => {
      setaAllusers(data);
    });
  }, []);

  const change = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addbonus = (user) => {
    console.log(state);
    firestore
      .doc(`users/${user.id}`)
      .collection("bonus")
      .add({
        amount: parseInt(state.amount),
        deposit_amount: parseInt(state.amount),
        from: "Coinsprimginvest",
        description: state.description,
        date: new Date().toLocaleDateString(),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        firestore.doc(`users/${user.id}`).collection("notification").add({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          amount: state.amount,
          type: "Bonus",
        }).then(()=>{
          const amountnn = formatLocaleCurrency(
            state.amount,
            "USD",
            {
              autoFixed: false,
            }
          );
          ajax({
            url: "https://coininvest.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Hello ${user.firstName} ${user.lastName}, <br/><br/> 
              You have recieved a new bonus. <br/><br/>
              Amount:  ${amountnn}`,
              to: `${user.email}, support@coininvest.net`,
              subject: "Bonus Deposit"
            },
          }).subscribe(() => console.log("user message sent"));
        });
      });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Users</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">add bonus</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aAllusers.map((user, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                <TableCell align="left">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell align="center">
                  <TextField
                    label="description"
                    variant="outlined"
                    size="small"
                    helperText="e.g bonus from admin"
                    name="description"
                    onChange={(e) => change(e)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    label="amount"
                    variant="outlined"
                    size="small"
                    name="amount"
                    onChange={(e) => change(e)}
                  />
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => addbonus(user)}
                  >
                    add
                  </Button>
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
