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
import {
  Button,
  Box,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Badge,
  ButtonGroup,
} from "@material-ui/core";
import { firestore, collectionData } from "../../../config";
import {
  VisibilitySharp,
  CheckSharp,
  CheckBoxSharp,
  ClearSharp,
} from "@material-ui/icons";
import { navigate } from "@reach/router";
import { ajax } from "rxjs/ajax";

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

export default function Kyc() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const allUsers = firestore.collection("users");
    collectionData(allUsers, "id").subscribe((data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  const approve = (user, val) => {
    firestore
      .doc(`users/${user.id}`)
      .update({
        approved: val,
      })
      .then(() => {
        ajax({
          url: "https://exchangecryptominers.com/unchainedtrade",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `Hello ${user.firstName}, your profile has been successfully updated.`,
            to: `${user.email}, support@unchainedtrade.com`,
            subject: "Pofile update",
          },
        }).subscribe(() => {
          console.log("user message sent");
        });
      });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name/info</TableCell>
              <TableCell align="right">Id Card front</TableCell>
              <TableCell align="right">Id Card back</TableCell>
              <TableCell align="center" colSpan={2}>
                Status
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow hover role="checkbox" key={index}>
                <TableCell align="left">
                  <CardHeader
                    avatar={<Avatar src={user.profile_image} alt="no image" />}
                    title={`${user.firstName} ${user.lastName}`}
                    subheader={`${user.email} member since ${new Date(
                      user.registered.seconds * 1000
                    ).toLocaleDateString()} ${user.email}.`}
                  />
                </TableCell>
                <TableCell align="right">
                  {user.id_card_front ? (
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() =>
                        (window.location.href = `${user.id_card_front}`)
                      }
                    >
                      <VisibilitySharp fontSize="small" />
                    </IconButton>
                  ) : null}
                </TableCell>
                <TableCell align="right">
                  {user.id_card_back ? (
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() =>
                        (window.location.href = `${user.id_card_back}`)
                      }
                    >
                      <VisibilitySharp fontSize="small" />
                    </IconButton>
                  ) : null}
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {user.approved ? (
                    <Badge badgeContent="approved" color="primary" />
                  ) : (
                    <Badge badgeContent="pending" color="error" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    <Button onClick={() => approve(user, true)}>
                      <CheckSharp />
                    </Button>
                    <Button onClick={() => approve(user, false)}>
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
