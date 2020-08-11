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
} from "@material-ui/core";
import { VerifiedUserSharp } from "@material-ui/icons";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  image: {
    height: "3em",
  },
}));

const TransactionAray = [
  {
    name: "Current Deposit",
    icon: require("../../dashboard/icons/balance.svg"),
    color: "#f15a29",
    datas: [
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
    name: "Current Withdrawals",
    icon: require("../../dashboard/icons/withdraw.svg"),
    color: "#098b1ede",
    datas: [
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
      <Grid container spacing={3}>
        {TransactionAray.map((trans, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Card variant="outlined">
              <CardHeader
                avatar={<img src={trans.icon} className={classes.image} />}
                action={
                  <PuffLoader
                    css={override}
                    size={50}
                    color={trans.color}
                    loading={true}
                  />
                }
                title={<Typography variant="h6">{trans.name}</Typography>}
              />
              {trans.datas.map((data, index) => (
                <ListItem key={index}>
                  <ListItemText primary={data.name} />
                  <Typography>{`$ ${data.amount}`}</Typography>
                </ListItem>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Activities;
