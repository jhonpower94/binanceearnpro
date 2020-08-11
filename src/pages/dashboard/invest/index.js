import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../../App.css";
import {
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  ListItemAvatar,
  Avatar,
  Fade,
  List,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  FilterListRounded,
  ExpandLess,
  ExpandMore,
  AddCircleSharp,
} from "@material-ui/icons";
import { dataArray } from "../../../service/tradeblocks";
import Pagnition from "../../../components/pagination";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  margin: {
    margin: theme.spacing(1),
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  right: {
    position: "relative",
    top: "6em",
    marginRight: theme.spacing(2),
  },
  space: {
    flexGrow: 1,
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


function Invest() {
  const classes = useStyles();

  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(4);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [arrays, setArrays] = useState(dataArray);
  

  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = arrays.slice(indexofFirstpage, indexofLastpost);

  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortFromHighest = () => {
    dataArray.sort((a, b) => {
      return b.minimum_stake - a.minimum_stake;
    });
    setArrays([...dataArray]);
  };
  const sortFromLowest = () => {
    dataArray.sort((a, b) => {
      return a.minimum_stake - b.minimum_stake;
    });
    setArrays([...dataArray]);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <div className={classes.margin}>
          <Button
            startIcon={<FilterListRounded />}
            endIcon={open ? <ExpandLess /> : <ExpandMore />}
            onClick={handleClick}
          >
            sort by
          </Button>
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
                title: "Highest",
                click: sortFromHighest,
              },
              {
                title: "Lowest",
                click: sortFromLowest,
              },
            ].map((opt, index) => (
              <MenuItem
                onClick={() => {
                  opt.click();
                  handleClose();
                }}
                key={index}
              >
                <ListItemText primary={opt.title} />
              </MenuItem>
            ))}
          </StyledMenu>
          <span className={classes.space} />
          <Pagnition
            postperpage={postperpage}
            totalpost={arrays.length}
            paginate={paginate}
          />
        </div>

        <Grid container spacing={5}>
          {currentPost.map((trade, index) => (
            <Fade
              in={true}
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Grid item xs={12} sm={6}>
                <Paper className={classes.column}>
                  <List dense={true}>
                    <ListItem className={classes.row}>
                      <ListItemAvatar>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          &#128176;
                        </Avatar>
                      </ListItemAvatar>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Return rate" />
                      <Typography variant="h5">{`${trade.return_percentage} %`}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Minimun stake" />
                      <Typography variant="h5">{`$ ${trade.minimum_stake}`}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Investment period" />
                      <Typography variant="h5">
                        {trade.investment_period}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Button
                        startIcon={<AddCircleSharp />}
                        variant="contained"
                        color="primary"
                        className={classes.mgtopx}
                        fullWidth
                      >
                        Add new trade
                      </Button>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Invest;
