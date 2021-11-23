import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { formatLocaleCurrency } from "country-currency-map";
import React, { useContext, useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useSelector } from "react-redux";
import { AppContext } from "../../../App";
import { blocks } from "../../../service/tradeblocks";
import IntroHeaderPages from "../component/introheaderpages";

const humanizeDuration = require("humanize-duration");

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function InvestBlock(props) {
  const classes = useStyles();
  const { blocksHome, page } = props;
  const [arrays, setArrays] = useState([]);
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.investments.title}
          subheader={currentStrings.homepage.pages.investments.subheader}
        />
      ),
    });
  }, []);

  const getDays = (hrs, unit) => {
    let milliseconds = hrs * 60 * 60 * 1000;
    let time = humanizeDuration(milliseconds, { units: unit, round: true });
    console.log(time);
    return time;
  };

  return (
    <Container maxWidth="md" className={classes.margintop}>
      <Box display="flex" justifyContent="center" mt={5} mb={5}>
        <Typography variant="h4" align="center">
          Investment Plans
        </Typography>
      </Box>
      <Grid
        container
        spacing={useMediaQuery(useTheme().breakpoints.up("sm")) ? 8 : 4}
        justify="center"
      >
        {blocks.map((trade, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <AnimationOnScroll
              delay={index}
              animateIn="animate__fadeInUp"
              animateOnce={true}
            >
              <Card variant="outlined">
                <CardHeader
                  title={`${
                    currentStrings.Dashboard.account.plan_titles.title
                  } ${index + 1}`}
                  subheader={
                    <Rating
                      name="read-only"
                      value={index + 3}
                      readOnly
                      size="small"
                    />
                  }
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                    variant: "body1",
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="baseline"
                >
                  <Typography component="h2" variant="h3">
                    {`${trade.rate}%`}
                  </Typography>
                </Box>
                <List dense={true}>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={currentStrings.Dashboard.invest.duration}
                      secondary={getDays(trade.hrs, trade.unit)}
                      primaryTypographyProps={{ align: "center" }}
                      secondaryTypographyProps={{
                        variant: "h5",
                        align: "center",
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={currentStrings.Dashboard.invest.Minimun_stake}
                      secondary={formatLocaleCurrency(trade.lot, "USD")}
                      primaryTypographyProps={{
                        align: "center",
                        variant: "h6",
                      }}
                      secondaryTypographyProps={{
                        align: "center",
                        variant: "h5",
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={currentStrings.Dashboard.invest.Maximun_stake}
                      secondary={
                        trade.max == 0
                          ? "Unlimited"
                          : formatLocaleCurrency(trade.max, "USD")
                      }
                      primaryTypographyProps={{
                        align: "center",
                        variant: "h6",
                      }}
                      secondaryTypographyProps={{
                        align: "center",
                        variant: "h5",
                      }}
                    />
                  </ListItem>
                </List>
              </Card>
            </AnimationOnScroll>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default InvestBlock;

/*
 <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {currentStrings.Dashboard.invest.duration}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1">{`24 hrs`}</Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
*/
