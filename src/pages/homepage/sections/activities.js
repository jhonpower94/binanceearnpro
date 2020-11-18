import React, { useEffect } from "react";
import {
  Card,
  Grid,
  ListItem,
  CardHeader,
  Avatar,
  Paper,
  Typography,
  Box,
  ListItemText,
  Container,
  makeStyles,
  Divider,
  CardContent,
} from "@material-ui/core";
import { ArrowUpwardSharp, VerifiedUserSharp } from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import WithdrawTable from "../component/trnanstble/withdrawtable";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.secondary.main,
  },
}));

const TransactionAray = [
  {
    name: "DEPOSITS",
    datas: [
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
    ],
  },
  {
    name: "WITHDRAWALS",
    datas: [
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
      {
        name: "jhon Snow",
        amount: 50000,
      },
    ],
  },
];

function Activities() {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={10}>
        {TransactionAray.map((trans, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <CardHeader
              title={trans.name}
              subheader="Last 5 operations"
              titleTypographyProps={{
                align: "center",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
            />

            {trans.datas.map((data, index) => (
              <ListItem key={index}>
                <ListItemText primary={data.name} />
                <Typography variant="h5">{`$ ${data.amount}`}</Typography>
              </ListItem>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Activities;

/* 


               <CardContent>
                <WithdrawTable />
              </CardContent>
              */
