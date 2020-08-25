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
} from "@material-ui/core";
import IntroHeaderPages from "../component/introheaderpages";
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
      layout: <IntroHeaderPages title="Invest Title" image="copytradewhite.svg" />,
    });
    window.scrollTo(0, 0);
    const newBlock = blocks.slice(0, 3);
    blocksHome ? setArrays(newBlock) : setArrays(blocks);
  }, []);

  return (
    <Container id="investblock" maxWidth="lg" className={classes.margintop}>
      <Grid container spacing={3}>
        {arrays.map((trade, index) => (
          <Fade
            in={true}
            key={index}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardHeader avatar={<Avatar>&#128176;</Avatar>} />
                <List dense={true}>
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
                </List>
                <ListItem>
                  <Button
                    startIcon={<AddCircleSharp />}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add new trade
                  </Button>
                </ListItem>
              </Card>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default InvestBlock;
