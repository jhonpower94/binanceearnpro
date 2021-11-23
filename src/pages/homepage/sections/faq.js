import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container, Grid, CardHeader } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function Faqs() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.faq.title}
          subheader={currentStrings.homepage.pages.faq.subheader}
        />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      title: currentStrings.homepage.pages.faq.questions.a.title,
      subheader: `unchainedtrade ${currentStrings.homepage.pages.faq.questions.a.subheader}`,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.b.title,
      subheader: currentStrings.homepage.pages.faq.questions.b.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.c.title,
      subheader: currentStrings.homepage.pages.faq.questions.c.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.d.title,
      subheader: currentStrings.homepage.pages.faq.questions.d.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.e.title,
      subheader: currentStrings.homepage.pages.faq.questions.e.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.f.title,
      subheader: currentStrings.homepage.pages.faq.questions.f.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.g.title,
      subheader: currentStrings.homepage.pages.faq.questions.g.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.h.title,
      subheader: currentStrings.homepage.pages.faq.questions.h.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.i.title,
      subheader: currentStrings.homepage.pages.faq.questions.i.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.j.title,
      subheader: currentStrings.homepage.pages.faq.questions.j.subheader,
    },
    {
      title: currentStrings.homepage.pages.faq.questions.k.title,
      subheader: currentStrings.homepage.pages.faq.questions.k.subheader,
    },
  ];

  return (
    <Container className={classes.margintop}>
      <Grid container spacing={4} justify="center">
        {faqs.map((faq, index) => (
          <Grid key={index} item xs={12} sm={12}>
            <CardHeader
              title={`${faq.title}?`}
              subheader={`${faq.subheader}.`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Faqs;
