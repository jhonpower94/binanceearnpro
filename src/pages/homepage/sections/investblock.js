import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../App";
import { blocks } from "../../../service/tradeblocks";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  Avatar,
  ListItem,
  ListItemText,
  List,
  Button,
  Fade,
  makeStyles,
  Container,
  Divider,
} from "@material-ui/core";
import IntroHeaderPages from "../component/introheaderpages";
import Background from "../images/baprice.svg";
import { VerifiedUserSharp, AddCircleSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(4),
  },
}));

function InvestBlock(props) {
  const classes = useStyles();
  const { blocksHome, page } = props;
  const [arrays, setArrays] = useState([]);
  const { intro, setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="Invest Title" />,
    });
    window.scrollTo(0, 0);
    const newBlock = blocks.slice(0, 3);
    blocksHome ? setArrays(newBlock) : setArrays(blocks);
  }, []);

  return (
    <Container id="investblock" maxWidth="lg" className={classes.margintop}>
      <Grid container spacing={10} justify="center">
        {arrays.map((trade, index) => (
          <Fade
            in={true}
            key={index}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <Grid item xs={6} sm={4}>
              <Card
                style={{
                  background: `url(${Background}) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <CardHeader
                  title={<Typography variant="h4">50%</Typography>}
                  subheader="Daily"
                />
                <List dense={true}>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText primary="Minimun stake" secondary="$1000" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText primary="Return rate" secondary="50%" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText primary="Period" secondary="3 Days" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default InvestBlock;
