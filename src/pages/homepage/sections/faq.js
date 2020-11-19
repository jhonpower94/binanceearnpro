import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, Container, Grid, CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

const faqs = [
  {
    title: "What is cryptonet.trade Mining Limited",
    subheader:
      "cryptonet.trade Mining Limited is ready to propose profitable cooperation for all comers. We present a high-tech and modern company which is recognized industry leader in the field of computer technology, software and innovations. Our technical experts are involved in developing new methods and effective algorithms of Bitcoin mining.",
  },
  {
    title: "How long do you plan to work",
    subheader: "We plan our activities for the next few years.",
  },
  {
    title: "How safe is my personal data, which I send to this website?",
    subheader: "The site is on a dedicated server with round the clock protection against DDoS attacks, it is scanned daily for malware. In addition, all data is encrypted by SSL certificate",
  },
  {
    title: "Who can join your investment company?",
    subheader: "Anyone can become our client. We offer international investment.",
  },
  {
    title: "How can I become an investor?",
    subheader: "To become a client you have to register account. Enter username, set password, add your email and Bitcoin address to make an account.",
  },
  {
    title: "Where can I register Bitcoin address?",
    subheader: "Visit https://blockchain.info to register unique Bitcoin address.https://blockchain.info",
  },
  {
    title: "How many accounts can I register?",
    subheader: "We suggest to register only one account.",
  },
  {
    title: "Can I register a few accounts even from one IP address?",
    subheader: "Yes, in case these accounts belong your family members of your friends.",
  },
  {
    title: "Will I receive profit every calendar day?",
    subheader: "Yes, correct. Your profit is accrued every 24 hours, 7 days a week.",
  },
  {
    title: "Are you paying even on weekends?",
    subheader: "Yes, of course, we are paying on weekends and holidays.",
  },
  {
    title: "How long does my deposit work?",
    subheader: "Your deposit runs forever. This means that you will never get it back.",
  },
  {
    title: "What currency can I invest?",
    subheader: "We only accept Bitcoins, etherium and litecoin",
  },
];

function Faqs() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages title="Faqs Title" image="tradecopywhite.svg" />
      ),
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={classes.margintop}>
      <Grid container spacing={4} justify="center">
        {faqs.map((faq, index) => (
          <Grid item xs={12} sm={12}>
            <CardHeader title={faq.title} subheader={faq.subheader} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Faqs;
