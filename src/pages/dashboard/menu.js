import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NotificationsSharpIcon from "@material-ui/icons/NotificationsSharp";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "flex",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  space: {
    marginTop: theme.spacing(1),
  },
  flexcolumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginTop: theme.spacing(2),
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

function DasboardMenu() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElUser(null);
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.sectionDesktop}>
      <Button variant="text" onClick={handleClick}>
        <Badge variant="dot" color="primary">
          <NotificationsSharpIcon />
        </Badge>
      </Button>

      <IconButton edge="end" color="primary" onClick={handleClickUser}>
        <Avatar className={classes.orange}>J</Avatar>
      </IconButton>

      <StyledMenu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {[
          { name: "profie", duration: "100ms" },
          { name: "profie", duration: "200ms" },
          { name: "profie", duration: "300ms" },
          { name: "profie", duration: "400ms" },
          { name: "profie", duration: "500ms" },
        ].map((lnk, index) => (
          <Fade in={open} key={index} style={{ transitionDelay: lnk.duration }}>
            <MenuItem onClick={handleClose} className={classes.flexcolumn}>
              <Typography variant="subtitle2">
                {new Date().toLocaleDateString()}
              </Typography>
              <Typography variant="body1" className={classes.space}>
                &#128176; Header
              </Typography>
              <Typography variant="subtitle2">
                {" "}
                this is the notification discription
              </Typography>
            </MenuItem>
          </Fade>
        ))}
      </StyledMenu>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleClose}
      >
        <Fade in={Boolean(anchorElUser)} style={{ transitionDelay: "100ms" }}>
          <MenuItem>
            <ListItemText primary="Jhon snow" secondary="jhon@gmail.com" />
          </MenuItem>
        </Fade>

        <Divider />
        {[
          { title: currentStrings.usermenu.settings, duration: "200ms" },
          { title: currentStrings.usermenu.logout, duration: "300ms" },
        ].map((link, index) => (
          <Fade
            in={Boolean(anchorElUser)}
            key={index}
            style={{ transitionDelay: link.duration }}
          >
            <MenuItem>
              <ListItemText primary={link.title} />
            </MenuItem>
          </Fade>
        ))}
      </StyledMenu>
    </div>
  );
}

export default DasboardMenu;
