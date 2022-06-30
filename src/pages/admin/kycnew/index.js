import { Badge, Button, ButtonGroup, CardHeader } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { CheckSharp, ClearSharp } from "@material-ui/icons";
import { navigate } from "@reach/router";
import React, { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { collectionData, firestore } from "../../../config";

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
    const allUsers = firestore.collection("verifiedaccounts");
    collectionData(allUsers, "id").subscribe((data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  const approve = (user, val) => {
    firestore
      .doc(`verifiedaccounts/${user.email}`)
      .update({
        verified: val,
      })
      .then(() => {
        ajax({
          url: "https://reinvented-natural-catshark.glitch.me/unchainedtrade",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `Hello ${user.firstName}, your profile has been successfully updated.`,
            to: `${user.email}, support@unchainedtrader.com`,
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
              <TableCell align="center" colSpan={2}>
                Documents
              </TableCell>
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
                    //  avatar={<Avatar src={user.profile_image} alt="no image" />}
                    title={`${user.firstname} ${user.lastname}`}
                    subheader={user.email}
                  />
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      navigate(`document/${user.email}`);
                    }}
                  >
                    View document
                  </Button>
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {user.verified ? (
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
