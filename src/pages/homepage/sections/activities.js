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
  ListItemAvatar,
} from "@material-ui/core";
import { ArrowUpwardSharp, VerifiedUserSharp } from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import WithdrawTable from "../component/trnanstble/withdrawtable";
import DepositTable from "../component/trnanstble/depositable";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const TransactionAray = [
  {
    name: "DEPOSITS",
    datas: <DepositTable />,
  },
  {
    name: "WITHDRAWALS",
    datas: <WithdrawTable />,
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
            <Card variant="outlined">
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

              <CardContent>{trans.datas}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Activities;

/* 
{trans.datas.map((data, index) => (
              <ListItem key={index}>
                <ListItemText primary={data.name} />
                <Typography variant="h5">{`$ ${data.amount}`}</Typography>
              </ListItem>
            ))}

               
              */
