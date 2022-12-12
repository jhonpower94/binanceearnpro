import {
  Button, Card,
  CardContent, Container,
  Grid,
  ListItemText, makeStyles, useMediaQuery,
  useTheme
} from "@material-ui/core";
import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../../App";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(1),
  },
}));

function Account() {
  const classes = useStyles();
  const mainbalance = useSelector((state) => state.balance);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const activities = useSelector((state) => state.activities);
  const currentStrings = useSelector((state) => state.language);
  const { tabs, setTabs } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const balanceAmount = [
    /* {
      title: currentStrings.Dashboard.account.main_balance,
      value: formatLocaleCurrency(Math.floor(mainbalance.main_balance), userInfos.currencycode, {
        autoFixed: false,
      }),
      xs: 12,
      sm: 4,
      subtitle: "h4",
    },
     {
      title: currentStrings.Dashboard.account.earning,
      value: "$77",
      xs: 6,
      sm: 4,
      subtitle: "h5",
    }, */
    {
      title: currentStrings.Dashboard.account.Wallet_Balance,
      value: isNaN(userInfos.wallet_balance)
        ? formatLocaleCurrency(0, userInfos.currencycode, {
            autoFixed: false,
          })
        : formatLocaleCurrency(
            userInfos.wallet_balance,
            userInfos.currencycode,
            {
              autoFixed: false,
            }
          ),
      xs: 6,
      sm: 4,
      subtitle: "h5",
    },
    {
      title: currentStrings.Dashboard.account.bonus_balance,
      value: formatLocaleCurrency(
        mainbalance.bonus_balance,
        userInfos.currencycode,
        {
          autoFixed: false,
        }
      ),
      xs: 6,
      sm: 4,
      subtitle: "h5",
    },
  ];
  const profileData = [
    {
      title: currentStrings.Dashboard.account.Total_profit_amount,
      value: formatLocaleCurrency(
        Math.floor(activities.totlProfit),
        userInfos.currencycode
      ),
    },
    {
      title: currentStrings.Dashboard.account.Total_bonus_earned,
      value: formatLocaleCurrency(
        Math.floor(activities.bonusTotalRecieved),
        userInfos.currencycode
      ),
    },
    {
      title: currentStrings.Dashboard.account.Total_investment_amount,
      value: formatLocaleCurrency(
        Math.floor(activities.totalDeposit),
        userInfos.currencycode
      ),
    },
    {
      title: currentStrings.Dashboard.account.Total_withdrawn_amount,
      value: formatLocaleCurrency(
        Math.floor(activities.totalwithdrawn),
        userInfos.currencycode
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} justify="flex-start">
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <ListItemText
                primary={formatLocaleCurrency(
                  Math.floor(mainbalance.main_balance),
                  userInfos.currencycode,
                  {
                    autoFixed: false,
                  }
                )}
                secondary={currentStrings.Dashboard.account.main_balance}
                primaryTypographyProps={{
                  variant: "h4",
                  align: useMediaQuery(useTheme().breakpoints.up("sm"))
                    ? "left"
                    : "center",
                }}
                secondaryTypographyProps={{
                  //  variant: "h4",
                  align: useMediaQuery(useTheme().breakpoints.up("sm"))
                    ? "left"
                    : "center",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {balanceAmount.map((vl, index) => (
          <Grid key={index} item xs={vl.xs} sm={vl.sm}>
            <Card variant="outlined">
              <CardContent>
                <ListItemText
                  primary={vl.value}
                  secondary={vl.title}
                  primaryTypographyProps={{ variant: "h6", align: "center" }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={12}>
          <Grid container spacing={4} justify="center">
            {[
              {
                title: currentStrings.Dashboard.titles.invest,
                icon: "",
                color: "default",
                action: "invest",
              },
              {
                title: currentStrings.Dashboard.titles.withdraw,
                icon: "",
                color: "primary",
                action: "withdraw",
              },
            ].map((btn, index) => (
              <Grid item key={index} xs={6} sm={3}>
                <Button
                  variant="contained"
                  disableElevation
                  color={btn.color}
                  fullWidth
                  onClick={() => navigate(`dashboard/${btn.action}`)}
                >
                  {btn.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
          <coingecko-coin-compare-chart-widget
            coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
            currency="usd"
            locale="en"
          ></coingecko-coin-compare-chart-widget>
        </Grid>

        {profileData.map((data, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <Card variant="outlined">
              <CardContent>
                <ListItemText primary={data.value} secondary={data.title} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Account;
