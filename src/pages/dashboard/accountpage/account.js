import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  Grid,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import ChartsPage from "./charts";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(1),
  },
}));

function Account() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { tabs, setTabs } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const balanceAmount = [
    {
      title: currentStrings.Dashboard.account.main_balance,
      value: "$779888",
      xs: 12,
      sm: 4,
      subtitle: "h4",
    },
    /*    {
      title: currentStrings.Dashboard.account.earning,
      value: "$77",
      xs: 6,
      sm: 4,
      subtitle: "h5",
    }, */
    {
      title: currentStrings.Dashboard.account.bonus_balance,
      value: "$79789",
      xs: 6,
      sm: 4,
      subtitle: "h5",
    },
    {
      title: currentStrings.Dashboard.account.Wallet_Balance,
      value: "$79749",
      xs: 6,
      sm: 3,
      subtitle: "h5",
    },
  ];
  const profileData = [
    {
      title: currentStrings.Dashboard.account.Total_profit_amount,
      value: "$000",
    },
    {
      title: currentStrings.Dashboard.account.Total_bonus_earned,
      value: "$000",
    },
    {
      title: currentStrings.Dashboard.account.Total_investment_amount,
      value: "$000",
    },
    {
      title: currentStrings.Dashboard.account.Total_withdrawn_amount,
      value: "$000",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justify="flex-start">
        {balanceAmount.map((vl, index) => (
          <Grid key={index} item xs={vl.xs} sm={vl.sm}>
            <ListItemText
              primary={<Typography variant="subtitle2">{vl.title}</Typography>}
              secondary={
                <Typography variant={vl.subtitle}>{vl.value}</Typography>
              }
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={12}>
          <ChartsPage />
        </Grid>

        {profileData.map((data, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <ListItemText
              primary={
                <Typography variant="subtitle2">{data.title}</Typography>
              }
              secondary={<Typography variant="h5">{data.value}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Account;
