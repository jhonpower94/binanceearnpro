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
import BounceLoader from "react-spinners/BounceLoader";
import { ExpandLessSharp, ExpandMoreSharp } from "@material-ui/icons";
import { dataArray } from "../../service/tradeblocks";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
      name: "Services",
      submenus: true,
      collapse: collapse.Services,
      submenulinks: [
        { title: "Invest", link: "invest" },
        { title: "Forex Signals", link: "signals" },
      ],
    },
    {
      name: "Info",
      submenus: true,
      collapse: collapse.Info,
      submenulinks: [
        { title: "About Us", link: "about" },
        { title: "Trade Block Datas", link: "tradedatas" },
        { title: "Office Locations", link: "locations" },
      ],
    },
    {
      name: "Downloads",
      submenus: true,
      collapse: collapse.Downloads,
      submenulinks: [
        { title: "Ios Web App", link: "downloads/ios" },
        { title: "Android Web App", link: "downloads/android" },
        { title: "Windows Web App", link: "downloads/windows" },
      ],
    },
    {
      name: "Help",
      submenus: true,
      collapse: collapse.Help,
      submenulinks: [
        { title: "Contact Us", link: "contact" },
        { title: "Investment Guide", link: "guide" },
      ],
    },
    {
      name: "Security",
      submenus: true,
      collapse: collapse.Security,
      submenulinks: [
        { title: "Privacy Policy", link: "security/privacy" },
        { title: "Terms of Service", link: "security/terms" },
        { title: "EU Data Protection", link: "security/eu" },
      ],
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
      <CssBaseline>
        <AppBar color="secondary" position="fixed">
          <Toolbar>
            {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
              <img
                src={require("../../images/logodesktop.svg")}
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
                  src={require("../../images/logodesktop.svg")}
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

            <Button variant="outlined" color="inherit">
              <Typography> Login</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.header}>
          <div className={classes.toolbar} />
          {intro.layout}
        </div>

        {props.children}
        <Container maxWidth="md" className={classes.margintop}>
          <Grid container spacing={3}>
            {footerLink.map((link, index) => (
              <Grid key={index} item xs={12} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="h5">{link.title}</Typography>
                  {link.links.map((lnk, index) => (
                    <Link
                      key={index}
                      component="button"
                      variant="body1"
                      onClick={() => {
                        changePageFooter(lnk.name);
                      }}
                      color="inherit"
                      className={classes.linkfooter}
                    >
                      {lnk.name}
                    </Link>
                  ))}
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
            <img src={require("../../images/mobile.svg")} width="30" />
            <Typography variant="caption">
              &copy; Hotbloq, LLC, {new Date().toLocaleDateString()}.
            </Typography>
          </Box>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
}

export default HomeLayout;
