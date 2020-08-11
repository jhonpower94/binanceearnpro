import React, { useEffect } from "react";
import "./component.css";
import { Strings } from "../lang/language";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TranslateSharpIcon from "@material-ui/icons/TranslateSharp";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ReactCountryFlag from "react-country-flag";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import { useDispatch, useSelector } from "react-redux";
import { language$ } from "../redux/action";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    display: "flex",
  },
  space: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  flag: {
    margin: theme.spacing(2),
  },
}));

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
    {...props}
  />
));

function SelectLanguage() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLanguage = (lang) => {
    Strings.setLanguage(lang);
    dispatch(language$(Strings));
    setAnchorEl(null);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Grow in={true} style={{ transitionDelay: "500ms" }}>
        <Button
          color="inherit"
          variant={
            useMediaQuery(useTheme().breakpoints.up("sm")) ? "outlined" : "text"
          }
          className={classes.button}
          onClick={handleClick}
        >
          <TranslateSharpIcon />

          {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
            <Typography className={classes.space}>
              {currentStrings.language}
            </Typography>
          ) : null}

          <ExpandMoreSharpIcon className={open ? "rotate" : ""} />
        </Button>
      </Grow>

      <StyledMenu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {[
          {
            title: "DE",
            countrycode: "DE",
            duration: "100ms",
            languagecode: "de",
          },
          {
            title: "EN",
            countrycode: "US",
            duration: "200ms",
            languagecode: "en",
          },
          {
            title: "ES",
            countrycode: "ES",
            duration: "300ms",
            languagecode: "es",
          },
          {
            title: "FR",
            countrycode: "FR",
            duration: "400ms",
            languagecode: "fr",
          },
          {
            title: "IT",
            countrycode: "IT",
            duration: "500ms",
            languagecode: "it",
          },
          {
            title: "PT",
            countrycode: "BR",
            duration: "600ms",
            languagecode: "pt",
          },
          {
            title: "RU",
            countrycode: "RU",
            duration: "700ms",
            languagecode: "ru",
          },
        ].map((lnk, index) => (
          <Fade in={open} key={index} style={{ transitionDelay: lnk.duration }}>
            <MenuItem onClick={() => setLanguage(lnk.languagecode)}>
              <ReactCountryFlag
                countryCode={lnk.countrycode}
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
                title={lnk.title}
              />
              <Typography className={classes.flag}>{lnk.title}</Typography>
            </MenuItem>
          </Fade>
        ))}
      </StyledMenu>
    </React.Fragment>
  );
}

export default SelectLanguage;
