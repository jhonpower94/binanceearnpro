import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../App";
import { navigate } from "@reach/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SelectLanguage from "../../components/lang_select";

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
} from "@material-ui/core";
import { css } from "@emotion/core";
import "./homepage.css";

import { ExpandLessSharp, ExpandMoreSharp } from "@material-ui/icons";

import { useSelector } from "react-redux";
import FooterHomepage from "./footer";
import Loader from "../../components/loader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
  },
  rootmobile: {
    display: "block",
  },
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
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  intro: {
    paddingTop: "80px",
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
      { name: "Faqs" },
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
      <CssBaseline />
      <div
        className={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? classes.root
            : classes.rootmobile
        }
      >
        <AppBar style={{ background: "#09132e" }} position="fixed">
          <Toolbar>
            {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
              <img
                src={require("../../images/logomobile.svg")}
                alt="logo"
                width="80px"
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
                  src={require("../../images/logomobile.svg")}
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
                    <Collapse in={link.collapse} timeout="auto" unmountOnExit>
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
              variant="contained"
              color="primary"
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
        {loading.loading ? (
          <Loader />
        ) : (
          <div>
            <div>{intro.layout}</div>

            {props.children}
            <div
              id="footer"
              style={{ position: "relative", background: "#09132e" }}
            >
              <FooterHomepage />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default HomeLayout;
