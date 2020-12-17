import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppContext } from "../../App";
import { navigate } from "@reach/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SelectLanguage from "../../components/lang_select";
import {
  CssBaseline,
  Container,
  Toolbar,
  Button,
  Box,
  Typography,
  Link,
  AppBar,
  Grid,
  Divider,
  withStyles,
  Menu,
  Fade,
  ListItem,
  ListItemText,
  MenuItem,
  Collapse,
  useScrollTrigger,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { css } from "@emotion/core";
import "./homepage.css";
import { ExpandLessSharp, ExpandMoreSharp } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Loader from "../../components/loader";
import { red } from "@material-ui/core/colors";
import FooterHomepage from "./footer";

var getCountry = require("country-currency-map").getCountry;

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  nav: {
    overflow: "hidden",
    position: "fixed",
    top: 0,
    width: "100%",
    background: theme.palette.secondary.main,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  space: {
    flexGrow: 1,
  },

  intro: {
    paddingTop: "40px",
    zIndex: 1,
    position: "relative",
  },
  mgright: {
    marginLeft: theme.spacing(2),
  },
  link: {
    marginRight: theme.spacing(2),

    cursor: "pointer",
  },
  linkfooter: {
    cursor: "pointer",
  },
  fontsize: {
    fontSize: "large",
  },
  linkcenter: {
    overflowX: "auto",
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  icondarkmode: {
    width: "1em",
  },
  icondarkmodelg: {
    width: "1.5em",
  },
  margintop: {
    marginTop: theme.spacing(4),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const footerLink = [
  {
    title: "Trading",
    links: [
      { name: "invest" },
      { name: "signals" },
      { name: "Trading datas" },
      { name: "Activities" },
    ],
  },
  {
    title: "About us",
    links: [
      { name: "Why Hotblock" },
      { name: "Affiliates" },
      { name: "Blocks" },
      { name: "Home" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact us" },
      { name: "Loctions" },
      { name: "Trusted dealers" },
      { name: "Faq" },
    ],
  },
];

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    PaperProps={{
      style: {
        width: useMediaQuery(useTheme().breakpoints.up("sm"))
          ? "auto"
          : "-webkit-fill-available",
      },
    }}
    {...props}
  />
));

function HomeLayout(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentStrings = useSelector((state) => state.language);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [anchorElMobile, setAnchorElMobile] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMobile = Boolean(anchorElMobile);
  const [submenu, setSubmenus] = useState([]);
  const [collapse, setCollapse] = useState({
    Services: false,
    Security: false,
    Help: false,
    Downloads: false,
    Info: false,
  });
  const { intro, rightoleft, setRightoleft } = useContext(AppContext);

  const theme = createMuiTheme({
    direction: rightoleft.status ? "rtl" : "ltr",
    palette: {
      type: "light",
      primary: {
        // Purple and green play nicely together.
        main: red[900],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#fff",
      },
      /*  background: {
          default: "#fff",
        }, */
      action: {
        selected: "#2196f33d",
      },
    },
  });

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

  const changePage = (link) => {
    navigate(`/${link}`);
    handleClose();
  };

  const openSubmenu = (e, submenlnk) => {
    setAnchorEl(e.currentTarget);
    setSubmenus(submenlnk);
  };

  const changePageFooter = (link) => {
    navigate(`/${link}`);
  };

  const openMobileMenu = (e) => {
    setAnchorElMobile(e.currentTarget);
  };

  const openCollapse = (props, collps) => {
    setCollapse({ ...collapse, [props]: !collps });
  };

  useEffect(() => {}, []);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMobile(null);
  };

  return (
    <React.Fragment>
      {loading.loading ? (
        <Loader />
      ) : (
        <div>
          <Helmet>
            <meta name="viewport" content="user-scalable=no" />
          </Helmet>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ElevationScroll {...props}>
              <AppBar color="primary">
                <Toolbar>
                  <img
                    src={require("../../images/logo.svg")}
                    alt="logo"
                    width="150px"
                  />

                  <div className={classes.mgright}>
                    {arrayDatas.map((link, index) => (
                      <Link
                        key={index}
                        component="button"
                        variant="body1"
                        onClick={(e) => {
                          link.submenus
                            ? openSubmenu(e, link.submenulinks)
                            : changePage(link.link);
                        }}
                        color="inherit"
                        className={classes.link}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <StyledMenu // desktop Submenus
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {submenu.map((sub, index) => (
                      <Fade
                        in={open}
                        key={index}
                        style={{ transitionDelay: index * 200 }}
                      >
                        <MenuItem onClick={() => changePage(sub.link)}>
                          <ListItemText primary={sub.title} />
                        </MenuItem>
                      </Fade>
                    ))}
                  </StyledMenu>

                  <StyledMenu // mobile menu
                    id="fade-menu-mobile"
                    anchorEl={anchorElMobile}
                    keepMounted
                    open={openMobile}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {arrayDatas.map((link, index) => (
                      <div key={index}>
                        <Fade
                          in={openMobile}
                          style={{ transitionDelay: index * 100 }}
                        >
                          <MenuItem
                            onClick={() => {
                              link.submenus
                                ? openCollapse(link.name, link.collapse)
                                : changePage(link.link);
                            }}
                          >
                            <ListItemText primary={link.name} />
                            {link.submenus ? (
                              <span>
                                {link.collapse ? (
                                  <ExpandLessSharp />
                                ) : (
                                  <ExpandMoreSharp />
                                )}
                              </span>
                            ) : null}
                          </MenuItem>
                        </Fade>

                        {link.submenus ? (
                          <Collapse
                            in={link.collapse}
                            timeout="auto"
                            unmountOnExit
                          >
                            {link.submenulinks.map((sub, index) => (
                              <ListItem
                                key={index}
                                className={classes.nested}
                                onClick={() => {
                                  changePage(sub.link);
                                }}
                              >
                                <ListItemText primary={sub.title} />
                              </ListItem>
                            ))}
                          </Collapse>
                        ) : null}
                      </div>
                    ))}
                  </StyledMenu>

                  <span className={classes.space} />

                  <SelectLanguage />

                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => {
                      if (intro.refid) {
                        navigate(`account/register/${intro.refid}`);
                      } else {
                        navigate("/account");
                      }
                    }}
                  >
                    <Typography> Login</Typography>
                  </Button>
                </Toolbar>
              </AppBar>
            </ElevationScroll>

            {intro.layout}

            {props.children}

            <FooterHomepage />
          </ThemeProvider>
        </div>
      )}
    </React.Fragment>
  );
}

export default HomeLayout;
