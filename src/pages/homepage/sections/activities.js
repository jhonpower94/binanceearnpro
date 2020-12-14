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
import { useSelector } from "react-redux";

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

function Activities() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  useEffect(() => {}, []);

  const TransactionAray = [
    {
      name: currentStrings.homepage.activities.deposit,
      datas: <DepositTable />,
    },
    {
      name: currentStrings.homepage.activities.withdrawal,
      datas: <WithdrawTable />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={10}>
        {TransactionAray.map((trans, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <CardHeader
              title={trans.name}
              subheader={currentStrings.homepage.activities.subheader}
              titleTypographyProps={{
                align: "center",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
            />

            {trans.datas}
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
