import { Avatar, Grid, makeStyles } from "@material-ui/core";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./fonts/font.min.scoped.css";
import "./fonts/index.min.scoped.css";
import "./styles.scoped.css";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));

const setImage = (currncy) => {
  switch (currncy) {
    case "BTC":
      return require("./image/cryptos/btc.png");
    case "USDT":
      return require("./image/cryptos/usdt.png");
    case "ETH":
      return require("./image/cryptos/eth.png");
    case "BNB":
      return require("./image/cryptos/bnb.png");
    default:
      return null;
  }
};

function TransactionTable() {
  const classes = useStyles();
  const ENDPOINT = "https://bnbearnpro.vercel.app/";

  const [deposits, setDeposits] = React.useState([]);
  const [withdrawals, setWithdrawals] = React.useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("DepositData", (data) => {
      setDeposits((oldata) => [data, ...oldata]);
    });
    socket.on("WithdrawalData", (data) => {
      setWithdrawals((oldata) => [data, ...oldata]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <Grid container spacing={5}>
      {[
        { title: "withdrawals", users: withdrawals.slice(0, 5) },
        { title: "deposits", users: deposits.slice(0, 5) },
      ].map((table, index) => (
        <Grid key={index} item xs={12} sm={6}>
          <>
            <div data-bn-type="text" className="css-mc306l" data-v-b89db13b="">
              Last 5 investment {table.title}
            </div>

            <div className="css-1jsfmns">
              <div className="css-1mi1v6l">
                <div
                  data-bn-type="text"
                  title="Name"
                  className="css-1i04fkn div_zw9mtm"
                >
                  Name
                </div>
              </div>
              <div className="css-1gf2u02">
                <div
                  data-bn-type="text"
                  title="Last Price"
                  className="css-1i04fkn div_5req8q"
                >
                  Amount
                </div>
              </div>
              <div className="css-1mnwmjc">
                <div
                  data-bn-type="text"
                  title="24h Change"
                  className="css-1i04fkn div_824j9t"
                >
                  Currency
                </div>
              </div>
              <div className="css-m65ilq">
                <div
                  data-bn-type="text"
                  title="24h Volume"
                  className="css-1i04fkn div_luvq45"
                >
                  Currency
                </div>
              </div>
            </div>

            {table.users.map((data, subindex) => (
              <div
                key={subindex}
                id="top_crypto_table-1-BNB_BUSD"
                className="css-1k26pp0"
              >
                <div className="css-1mi1v6l">
                  <div className="css-1avbqo0">
                    <div
                      data-bn-type="text"
                      title="BNB"
                      className="css-101w6jk div_zp9vep"
                    >
                      {`${data.name}`}
                    </div>
                  </div>
                </div>
                <div className="css-1gf2u02">
                  <div className="css-10nf7hq">
                    <div data-bn-type="text" className="css-1dqq3gy">
                      {formatLocaleCurrency(data.amount, "USD", {
                        autoFixed: false,
                      })}
                    </div>
                  </div>
                </div>
                <div className="css-1mnwmjc">
                  <div data-bn-type="text" className="css-139a76i div_hodfb7">
                    <Avatar
                      className={classes.small}
                      alt={data.currency}
                      src={setImage(data.currency)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        </Grid>
      ))}
    </Grid>
  );
}

export default TransactionTable;
