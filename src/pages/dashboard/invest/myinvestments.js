import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";

import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
  TablePagination,
} from "@material-ui/core";

import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

import BtcAddressInput from "./adress";
const { Converter } = require("easy-currencies");

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

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
  const currentUserId = userInfos.id;
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    data: {},
    selected: false,
  });

  const changeValue = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const CancelWithdraw = () => {
    setValue({
      ...value,
      selected: false,
    });
  };

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
    // converter.convert("500", "USD", "EUR").then((v) => console.log(v));
  }, []);

  return (
    <React.Fragment>
      {value.selected ? (
        <BtcAddressInput
          data={value.data}
          selected={CancelWithdraw}
          type="investment"
        />
      ) : (
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
                      {formatLocaleCurrency(dep.deposit_amount, "USD", {
                        autoFixed: false,
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {}
                      {isNaN(dep.return_amount)
                        ? formatLocaleCurrency(0, "USD", {
                            autoFixed: false,
                          })
                        : formatLocaleCurrency(dep.return_amount, "USD", {
                            autoFixed: false,
                          })}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={!dep.complete || dep.withdrawn}
                        onClick={() => {
                          setValue({
                            ...value,
                            data: dep,
                            selected: !value.selected,
                          });
                        }}
                      >
                        {currentStrings.Dashboard.investments.confirm}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{dep.block_name}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {new Date(dep.created_at * 1000).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Badge
                        badgeContent={dep.pending ? "PENDING" : "COMPLETE"}
                        color={dep.pending ? "error" : "primary"}
                      />
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

export default Investment;
