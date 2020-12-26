import {
  Button,
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { collectionData, firestore } from "../../../config";

const useStyles = makeStyles({});

export default function UpdateCurrency() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [aAllusers, setaAllusers] = React.useState([]);

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

  const convert = (user) => {
    firestore
      .doc(`users/${user.id}`)
      .update({
        currencycode: "USD",
      })
      .then(() => alert("User currency has been updated"))
      .catch((err) => alert("error updating currency"));
  };

  return (
    <Container maxWidth="md">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Users</TableCell>
              <TableCell align="center">currency</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {aAllusers.map((user, index) => (
              <TableRow>
                <TableCell align="left">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell align="center">{user.currencycode}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => convert(user)}
                  >
                    Convert
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
        count={aAllusers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
}
