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
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import IntroHeaderPages from "../component/introheaderpages";
import Background from "../images/baprice.svg";
import { VerifiedUserSharp, AddCircleSharp } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { Rating } from "@material-ui/lab";

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

  const theme = createMuiTheme({
    palette: {
      type: "dark",
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

  return (
    <ThemeProvider theme={theme}>
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
                    background: "#b71c1c",
                    //  backgroundSize: "cover",
                  }}
                >
                  <CardHeader
                    title={`${trade.min_rate} - ${trade.max_rate}%`}
                    subheader={
                      <Rating
                        name="read-only"
                        value={index + 3}
                        readOnly
                        size="small"
                      />
                    }
                    titleTypographyProps={{ align: "center", variant: "h3" }}
                    subheaderTypographyProps={{
                      align: "center",
                      variant: "body1",
                    }}
                  />
                  <List dense={true}>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={<Typography variant="h6">Duration</Typography>}
                        secondary={
                          <Typography variant="body1">{`24 hrs`}</Typography>
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
    </ThemeProvider>
  );
}

export default InvestBlock;
