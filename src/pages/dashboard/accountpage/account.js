import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../../App";

const CustomButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: 20,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})(Button);

const CustomButtonSmall = withStyles({
  root: {
    textTransform: "none",
    fontSize: 16,
  },
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
})(Button);

const CustomCardContent = withStyles({
  root: {
    paddingBottom: 0,
  },
})(CardContent);

function Account() {
  const mainbalance = useSelector((state) => state.balance);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const activities = useSelector((state) => state.activities);
  const currentStrings = useSelector((state) => state.language);
  const { setCurrentab } = useContext(AppContext);

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
      title: "Wallet balance",
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
      tab: "/dashboard/wallet"
    },
    {
      title: "Bonus balance",
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
      tab: "/dashboard/withdraw"
    },
  ];
  const profileData = [
    {
      title: "Total profit amount",
      value: formatLocaleCurrency(
        Math.floor(activities.totlProfit),
        userInfos.currencycode
      ),
    },
    {
      title: "Total bonus amount",
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
                secondary="Portfolio balance"
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
              <CustomCardContent>
                <ListItemText
                  primary={vl.value}
                  secondary={vl.title}
                  primaryTypographyProps={{ variant: "h6", align: "center" }}
                  secondaryTypographyProps={{
                    align: "center",
                  }}
                />
              </CustomCardContent>
              <CardActions>
                <CustomButtonSmall
                  size="small"
                  onClick={() => {
                    setCurrentab(1);
                    navigate(vl.tab);
                  }}
                >
                  Withdraw
                </CustomButtonSmall>
              </CardActions>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={12}>
          <Grid container spacing={3} justify="center">
            {[
              {
                title: currentStrings.Dashboard.titles.invest,
                icon: "",
                color: "default",
                action: "invest",
              },
              {
                title: "Withdraw investments",
                icon: "",
                color: "primary",
                action: "withdraw",
              },
            ].map((btn, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <CustomButton
                  variant="contained"
                  disableElevation
                  color={btn.color}
                  fullWidth
                  onClick={() => navigate(`dashboard/${btn.action}`)}
                >
                  {btn.title}
                </CustomButton>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
          <coingecko-coin-compare-chart-widget
            coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
            currency="usd"
            locale="en"
          />
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
