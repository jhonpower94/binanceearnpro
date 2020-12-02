import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppContext } from "../../App";
import { navigate } from "@reach/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SelectLanguage from "../../components/lang_select";
import Particles from "react-tsparticles";

import MenuIcon from "@material-ui/icons/Menu";
import {
  CssBaseline,
  Container,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
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
  List,
  useScrollTrigger,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { css } from "@emotion/core";
import "./homepage.css";
import BounceLoader from "react-spinners/BounceLoader";
import { ExpandLessSharp, ExpandMoreSharp } from "@material-ui/icons";
import { dataArray } from "../../service/tradeblocks";
import { blue, red } from "@material-ui/core/colors";
import Background from "../../pages/homepage/images/header-middle-bg.png";
import Backgroundsecond from "../../pages/homepage/images/header-middle-bg1.png";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

const security = [
  { title: "Privacy Policy" },
  { title: "Terms of Service" },
  { title: "EU Data Protection" },
];

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
  const { intro, darktheme, setDarktheme } = useContext(AppContext);

  const arrayDatas = [
    { name: "Home", link: "" },
    {
      name: "Investment",
      link: "invest",
    },
    {
      name: "About Us",
      link: "about",
    },
    {
      name: "Get Started",
      link: "guide",
    },
    {
      name: "Support",
      link: "contact",
    },
    {
      name: "Faq",
      link: "faq",
    },
    /*  {
      name: "Security",
      submenus: true,
      collapse: collapse.Security,
      submenulinks: [
        { title: "Privacy Policy", link: "security/privacy" },
        { title: "Terms of Service", link: "security/terms" },
        { title: "EU Data Protection", link: "security/eu" },
      ],
    }, */
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

  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        // Purple and green play nicely together.
        main: red[900],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#fafafa",
      },
      /*  background: {
        default: "#fff",
      }, */
      action: {
        selected: "#2196f33d",
      },
    },
  });

  useEffect(() => {}, []);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMobile(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline>
          <ElevationScroll {...props}>
            <AppBar color="primary">
              <Toolbar>
                {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
                  <img
                    src={require("../../images/logo.svg")}
                    alt="logo"
                    width="150px"
                  />
                ) : (
                  <Box display="flex">
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      className={classes.menuButton}
                      onClick={openMobileMenu}
                    >
                      <MenuIcon />
                    </IconButton>
                    <img
                      src={require("../../images/logo.svg")}
                      alt="logo"
                      height="50px"
                    />
                  </Box>
                )}

                {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
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
                ) : null}

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

          <div style={{ position: "relative" }}>{props.children}</div>

          <Container maxWidth="md" className={classes.margintop}>
            <Grid container spacing={3} justify="center">
              {arrayDatas.map((link, index) => (
                <Grid key={index} item xs={6} sm={2}>
                  <Box display="flex" justifyContent="center">
                    <Link
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
                Made with &#10084;&#65039; at AFX
              </Typography>
            </Box>
            <Box
              className={classes.margintop}
              display="flex"
              justifyContent="center"
            >
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
              <img src={require("../../images/logosmall.svg")} width="30" />
              <Typography variant="caption">
                &copy; Hotbloq, LLC, {new Date().toLocaleDateString()}.
              </Typography>
            </Box>
          </Container>
        </CssBaseline>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default HomeLayout;
