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
import { makeStyles } from "@material-ui/core/styles";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PositionedSnackbar from "../../../components/snackbar";
import { firestore } from "../../../config";
import { loading$, selectedmenuItem$ } from "../../../redux/action";
import { walletEmailType } from "../invest/withdrawserver";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
  bgheader: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#000000"),
  },
}));

function WithdrawBonus() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const bonus = useSelector((state) => state.bonus.bonus);

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
    dispatch(selectedmenuItem$(3));
  }, []);

  const addToWallet = (data) => {
    dispatch(loading$());
    const new_Balance = userInfos.wallet_balance + data.deposit_amount;
    firestore
      .doc(`users/${userInfos.id}`)
      .update({
        wallet_balance: new_Balance,
      })
      .then(() => {
        firestore
          .doc(`users/${userInfos.id}`)
          .collection("bonus")
          .doc(data.id)
          .update({
            deposit_amount: 0,
            withdrawn: true,
          });
        walletEmailType(
          data.deposit_amount,
          new_Balance,
          "bonus",
          userInfos
        ).subscribe(() => {
          dispatch(loading$());
          // for snackbar
          setOpen(true);
        });
      });
  };

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {currentStrings.Dashboard.bonus.from}
              </TableCell>

              <TableCell align="left">
                {currentStrings.Dashboard.bonus.description}
              </TableCell>
              <TableCell align="left">
                {currentStrings.Dashboard.bonus.amount}
              </TableCell>
              <TableCell align="left">
                {currentStrings.Dashboard.bonus.confirm}
              </TableCell>
              <TableCell align="left">
                {currentStrings.Dashboard.bonus.date}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bonus.map((data, index) => (
              <TableRow tabIndex={-1} key={index}>
                <TableCell align="left">
                  <Typography>{data.from}</Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography>{data.description}</Typography>
                </TableCell>
                <TableCell align="left">
                  {formatLocaleCurrency(data.deposit_amount, "USD", {
                    autoFixed: false,
                  })}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={data.withdrawn}
                    onClick={() => {
                      addToWallet(data);
                    }}
                  >
                    {currentStrings.Dashboard.bonus.confirm}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  {new Date(
                    data.created_at.seconds * 1000
                  ).toLocaleDateString()}
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

      <PositionedSnackbar open={open} setOpen={setOpen} type="bonus" />
    </div>
  );
}

export default WithdrawBonus;
