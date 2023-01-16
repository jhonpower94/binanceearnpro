import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loading$, selectedmenuItem$ } from "../../../redux/action";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

import { firestore } from "../../../config";
import { walletEmailType } from "./withdrawserver";
import PositionedSnackbar from "../../../components/snackbar";
const { Converter } = require("easy-currencies");

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  mgleft: {
    marginleft: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
  bgheader: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#000000"),
  },
}));

function Investment() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const investments = useSelector((state) => state.investment.trades);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  // table data
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(2));
    console.log(investments);
    // converter.convert("500", userInfos.currencycode, "EUR").then((v) => console.log(v));
  }, []);

  const addToWallet = (data) => {
    dispatch(loading$());
    const new_Balance = userInfos.wallet_balance + data.return_amount;
    firestore
      .doc(`users/${userInfos.id}`)
      .update({
        wallet_balance: new_Balance,
      })
      .then(() => {
        firestore
          .doc(`users/${userInfos.id}`)
          .collection("deposits")
          .doc(data.id)
          .update({
            return_amount: 0,
            withdrawn: true,
          });
        // run email code here
        walletEmailType(
          data.return_amount,
          new_Balance,
          "investment",
          userInfos
        ).subscribe(() => {
          dispatch(loading$());
          // for snackbar
          setOpen(true);
        });
      });
  };

  return (
    <React.Fragment>
      <div>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {currentStrings.Dashboard.investments.amount}
                </TableCell>
                <TableCell align="left">
                  {currentStrings.Dashboard.investments.return}
                </TableCell>
                <TableCell align="left">
                  {currentStrings.Dashboard.investments.confirm}
                </TableCell>
                <TableCell align="left">
                  {currentStrings.Dashboard.investments.investment}
                </TableCell>
                <TableCell align="left">
                  {currentStrings.Dashboard.investments.date}
                </TableCell>
                <TableCell align="center">
                  {currentStrings.Dashboard.investments.status}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {investments.map((dep, index) => (
                <TableRow tabIndex={-1} key={index}>
                  <TableCell align="left">
                    {formatLocaleCurrency(
                      dep.deposit_amount,
                      userInfos.currencycode,
                      {
                        autoFixed: false,
                      }
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {isNaN(dep.return_amount)
                      ? formatLocaleCurrency(0, userInfos.currencycode, {
                          autoFixed: false,
                        })
                      : formatLocaleCurrency(
                          dep.total_return,
                          userInfos.currencycode,
                          {
                            autoFixed: false,
                          }
                        )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disabled={!dep.complete || dep.withdrawn}
                      onClick={() => {
                        addToWallet(dep);
                      }}
                    >
                      {currentStrings.Dashboard.investments.confirm}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{dep.block_name}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {new Date(
                      dep.created_at.seconds * 1000
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {dep.complete
                      ? currentStrings.Dashboard.investments.complete
                      : currentStrings.Dashboard.investments.pending}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={15}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <PositionedSnackbar open={open} setOpen={setOpen} type="Investment" />
    </React.Fragment>
  );
}

export default Investment;
