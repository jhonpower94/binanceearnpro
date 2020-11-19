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
    marginTop: theme.spacing(5),
  },
}));

function InvestBlock(props) {
  const classes = useStyles();
  const { blocksHome, page } = props;
  const [arrays, setArrays] = useState([]);
  const { intro, setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="INVESTMENTS" subheader="Our Plans" />,
    });
    window.scrollTo(0, 0);
    const newBlock = blocks.slice(0, 3);
    blocksHome ? setArrays(newBlock) : setArrays(blocks);
  }, []);

  return (
    <Container maxWidth="md" className={classes.margintop}>
      <Grid container spacing={8} justify="center">
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
                  title={
                    <Typography variant="h3">{`${trade.rate}%`}</Typography>
                  }
                  subheader={
                    <Typography variant="body1">{`${trade.hrs} hours`}</Typography>
                  }
                />
                <List dense={true}>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={<Typography variant="h6">Duration</Typography>}
                      secondary={
                        <Typography variant="body1">{trade.name}</Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6">Minimun stake</Typography>
                      }
                      secondary={
                        <Typography variant="body1">{`$${trade.lot}`}</Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6">Maximun stake</Typography>
                      }
                      secondary={
                        <Typography variant="body1">{`$${trade.max}`}</Typography>
                      }
                    />
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
