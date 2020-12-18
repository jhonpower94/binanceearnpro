import React, { useContext } from "react";
import { AppContext } from "../../App";
import { AndroidSharp, Apple, LaptopMac, Telegram, Twitter } from "@material-ui/icons";

import {
  makeStyles,
  Container,
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  CardHeader,
  Icon,
  Avatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import { blue, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(4),
  },
  link: {
    marginRight: theme.spacing(2),

    cursor: "pointer",
  },
}));

const downloads = [
  {
    title: "Facebook",
    image: <Icon className="fa fa-facebook-f" />,
    color: blue[800],
  },
  {
    title: "Twitter",
    image: <Twitter htmlColor={blue[500]} />,
    color: "#fff",
  },
  {
    title: "Telegram",
    image: <Telegram />,
    color: blue[500],
  },
];

function FooterHomepage() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { intro, rightoleft, setRightoleft } = useContext(AppContext);

  const arrayDatas = [
    { name: currentStrings.homepage.menus.home, link: "" },
    {
      name: currentStrings.homepage.menus.investment,
      link: "invest",
    },
    {
      name: currentStrings.homepage.menus.about,
      link: "about",
    },
    {
      name: currentStrings.homepage.menus.get_started,
      link: "guide",
    },
    {
      name: currentStrings.homepage.menus.support,
      link: "contact",
    },
    {
      name: currentStrings.homepage.menus.faq,
      link: "faq",
    },
  ];
  const security = [
    { title: currentStrings.homepage.footer.securities.privacy },
    { title: currentStrings.homepage.footer.securities.terms },
    { title: currentStrings.homepage.footer.securities.Eu },
  ];

  const changePage = (link) => {
    navigate(`/${link}`);
  };

  return (
    <Container maxWidth="md" className={classes.margintop}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={12}>
          <CardHeader
            title="Links and contacts"
            subheader="website menus, socials and email contacts"
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{ align: "center" }}
          />
        </Grid>
        {arrayDatas.map((link, index) => (
          <Grid key={index} item xs={6} sm={2}>
            <Box display="flex" justifyContent="center">
              <Link
                component="button"
                variant="body1"
                onClick={(e) => {
                  changePage(link.link);
                }}
                color="inherit"
                className={classes.link}
              >
                {link.name}
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" />
      <Grid container spacing={3} justify="center">
        {downloads.map((download, index) => (
          <Grid key={index} item xs={6} sm={2}>
            <Box
              className={classes.margintop}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar style={{ background: download.color }}>
                {download.image}
              </Avatar>
              <Typography>{download.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider className={classes.margintop} />

      <Box
        className={classes.margintop}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="body1">
          {`${currentStrings.homepage.footer.made}`} &#10084;&#65039; @ AFX
        </Typography>
      </Box>
      <Box className={classes.margintop} display="flex" justifyContent="center">
        {security.map((links, index) => (
          <Link
            key={index}
            component="button"
            variant="caption"
            color="textSecondary"
            className={classes.link}
          >
            {links.title}
          </Link>
        ))}
      </Box>
      <Box
        className={classes.margintop}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <img src={require("./images/logo.svg")} width="100" />
        <Typography variant="caption">
          &copy; Relianceexchange LLC, {new Date().getFullYear()}.
        </Typography>
      </Box>
    </Container>
  );
}

export default FooterHomepage;