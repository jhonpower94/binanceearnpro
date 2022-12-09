import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
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
              title={`Plan ${index + 1}`}
              subheader={
                <Rating
                  name="read-only"
                  value={index + 3}
                  readOnly
                  size="small"
                />
              }
            />
            <CardContent>
              <div class="data">
                <p>Duration of the contract</p>
                <span className="itemtext">{getDays(plan.hrs, plan.unit)}</span>
              </div>
              <div class="data">
                <p>Return profit</p>
                <span className="itemtext">{plan.rate} %</span>
              </div>
              <div class="data">
                <p>Minimum stake</p>
                <span className="itemtext">
                  {formatLocaleCurrency(plan.lot, "USD", {
                    autoFixed: false,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Investments;
