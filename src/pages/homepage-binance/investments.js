import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map";
import humanizeDuration from "humanize-duration";
import React from "react";
import { investmentplans } from "../../service/plansashboard";
import "./styles.scoped.css";

function Investments() {
  const getDays = (hrs, unit) => {
    let milliseconds = hrs * 60 * 60 * 1000;
    let time = humanizeDuration(milliseconds, { units: unit, round: true });
    console.log(time);
    return time;
  };

  return (
    <Grid container spacing={5}>
      {investmentplans.map((plan, index) => (
        <Grid key={index} item xs={12} sm={3}>
          <Card variant="outlined">
            <CardHeader
              title={`${plan.name} plan`}
              subheader={
                <Rating
                  name="read-only"
                  value={index + 2}
                  readOnly
                  size="small"
                />
              }
            />
            <CardContent>
              <div className="data">
                <p>Duration of the contract</p>
                <span className="itemtext">{getDays(plan.hrs, plan.unit)}</span>
              </div>
              <div className="data">
                <p>Return profit</p>
                <span className="itemtext">
                  {plan.rate}% {plan.hrs == 24 ? "" : "daily"}
                </span>
              </div>
              <div className="data">
                <p>Minimum stake</p>
                <span className="itemtext">
                  {formatLocaleCurrency(plan.lot, "USD", {
                    autoFixed: false,
                  })}
                </span>
              </div>
              <CardActions>
                <a
                  style={{ width: "100%" }}
                  data-bn-type="button"
                  id="buttom_cta_trade_now"
                  className="css-14p7txk"
                  onClick={() => navigate("account/register")}
                >
                  Invest now
                </a>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Investments;
