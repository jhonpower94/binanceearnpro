import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Link,
  Card,
  Grid,
  Button,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
  link: {
    cursor: "pointer",
  },
  scroll: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
}));

function About() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages title="About Us" subheader="About Coininvest.net" />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" className={classes.margintop}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={12}>
          <CardContent>
            <Typography align="left" variant="subtitle2">
              coininvest.net investment Limited is ready to propose profitable
              cooperation for all comers. We present a high-tech and modern
              company which is recognized industry leader in the field of
              computer technology, software and innovations. Our technical
              experts are involved in developing new methods and effective
              algorithms of Bitcoin investment. Over last few years
              coininvest.net investment Limited has managed to build a few large
              investment farms in the United Kingdom and Scotland.We have
              equipped them with the most powerful and modern investment
              hardware that around the clock provides excellent results and
              serves as a source for earnings.
            </Typography><br/>
            <Typography align="left" variant="subtitle2">
              coininvest.net investment Limited is ready to propose profitable
              cooperation for all comers. We present a high-tech and modern
              company which is recognized industry leader in the field of
              computer technology, software and innovations. Our technical
              experts are involved in developing new methods and effective
              algorithms of Bitcoin investment. Over last few years coininvest.net
              investment Limited has managed to build a few large investment farms in
              the United Kingdom and Scotland.We have equipped them with the
              most powerful and modern investment hardware that around the clock
              provides excellent results and serves as a source for earnings. In
              the summer of 2016 our team has made a successful attempt to enter
              international investment market with to offer cooperation for
              clients and partners.Currently, our goalis to develop wider
              European network of Bitcoin investment farms to provide everyone.the
              opportunity to participate in processes of investment and earning. If
              you want to make today, we invite you to join our pool of
              investors. Our offer is valid on a permanent basis as well as your
              profits will be always accrued after you make a deposit, from 10%
              to 20% on a daily basis with the possibility to withdraw
              instantly.Many of you have been waiting for such a proposal,and we
              are confident that you will not be disappointed with our service.
              With the advent of cryptocurrency many entrepreneurs have noticed
              that this is not only a convenient payment method but also great
              source of income in the area of online investment. Today, you can
              find dozens of tempting offers, but you should carefully consider
              each of them. First of all, pay attention to the legality of the
              company work as well as the previous experience and their history.
              A reliable partner that offers asset management services never
              hides anything. We sincerely hope that coininvest.net investment
              Limited will become a partner in your life. The main activity of
              the company is professional software developing by experienced
              experts who were directly involved in the development and testing
              of most famous classical investment algorithms for investment. Their
              extensive knowledge and practical skills are a guarantee of
              success of coininvest.net investment Limited. Since the summer of
              2016, we offer high quality investment services. The company's
              profit is the result of close cooperation between the technical
              staff and traders to cryptocurrency exchange. We have our own
              technical base and investment farm on the basis of high-end graphics
              cards and ASIC hardware which is gaining popularity in the sphere
              of Bitcoin investment through optimal power consumption and high
              performance. An investment strategy which we propose is clear
              enough and terms can be acceptable for all. Undoubtedly, the
              company of this level must be registered officially registered to
              meet all the criteria of investors. In July 2016 coininvest.net
              investment Limited passed the incorporation process in the United
              Kingdom and is listed by Companies House.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
