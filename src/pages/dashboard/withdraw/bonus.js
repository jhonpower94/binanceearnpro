import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagnition from "../../../components/pagination";
import {
  ListItem,
  ListItemText,
  Typography,
  Card,
  Button,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  CardHeader,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { loading$, selectedmenuItem$ } from "../../../redux/action";
import firebase, { firestore } from "../../../config";
import { navigate } from "@reach/router";
import { GetAppSharp } from "@material-ui/icons";
import { ajax } from "rxjs/ajax";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import BtcAddressInput from "../invest/adress";

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

  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const bonus = useSelector((state) => state.bonus.bonus);
  const [value, setValue] = useState({
    data: {},
    selected: false,
  });
  // table data
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const CancelWithdraw = () => {
    setValue({
      ...value,
      selected: false,
    });
  };

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

  return (
    <React.Fragment>
      {value.selected ? (
        <BtcAddressInput
          data={value.data}
          selected={CancelWithdraw}
          type="bonus"
        />
      ) : (
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
                {[
                  {
                    from: "Jhon snow",
                    description: "Referral Bonus",
                    deposit_amount: 500,
                    date: 1324353,
                    withdrawn: false,
                  },
                  {
                    from: "Jhon snow",
                    description: "Referral Bonus",
                    deposit_amount: 500,
                    date: 1324353,
                  },
                ].map((data, index) => (
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
                          setValue({
                            ...value,
                            data: data,
                            selected: !value.selected,
                          });
                        }}
                      >
                        {currentStrings.Dashboard.bonus.confirm}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {new Date(data.date * 1000).toLocaleDateString()}
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
      )}
    </React.Fragment>
  );
}

export default WithdrawBonus;
