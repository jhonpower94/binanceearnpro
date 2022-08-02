import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CardHeader } from "@material-ui/core";
import { HistoryRounded } from "@material-ui/icons";
import { formatLocaleCurrency } from "country-currency-map";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function TransactionHistory({ type, data, currencycode }) {
  const classes = useStyles();

  return (
    <>
      <CardHeader avatar={<HistoryRounded />} title={type} />
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th">
                    {formatLocaleCurrency(
                        row.return_amount,
                        currencycode,
                        {
                          autoFixed: false,
                        }
                      )}
            
                </TableCell>
                <TableCell align="left">
                  {row.pending ? "Pending" : "Complete"}
                </TableCell>
                <TableCell align="left">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
