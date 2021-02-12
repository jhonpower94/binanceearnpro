import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../App";
import { blocks } from "../../../service/tradeblocks";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  List,
  Fade,
  makeStyles,
  Container,
  Divider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import IntroHeaderPages from "../component/introheaderpages";
import { red } from "@material-ui/core/colors";
import { Rating } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Converter } from "easy-currencies";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function InvestBlock(props) {
  const classes = useStyles();
  const { blocksHome, page } = props;
  const [arrays, setArrays] = useState([]);
  const currentStrings = useSelector((state) => state.language);
  const { setIntro } = useContext(AppContext);

  useEffect(() => {
    setIntro({
      layout: (
        <IntroHeaderPages
          title={currentStrings.homepage.pages.investments.title}
          subheader={currentStrings.homepage.pages.investments.subheader}
        />
      ),
    });
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
    <Container maxWidth="md" className={classes.margintop}>
      <Grid container spacing={8} justify="center">
        {blocks.map((trade, index) => (
          <Fade
            in={true}
            key={index}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <Grid item xs={6} sm={4}>
              <Card>
                <CardHeader
                  title={`${
                    currentStrings.Dashboard.account.plan_titles.title
                  } ${index + 1}`}
                  subheader={
                    <Rating
                      name="read-only"
                      value={index + 3}
                      readOnly
                      size="small"
                    />
                  }
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                    variant: "body1",
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="baseline"
                >
                  <Typography component="h2" variant="h3">
                    {`${trade.rate}%`}
                  </Typography>
                </Box>
                <List dense={true}>
                  <Divider variant="inset" component="li" />

                  <ListItem>
                    <ListItemText
                      primary={currentStrings.Dashboard.invest.Minimun_stake}
                      secondary={trade.lot}
                      primaryTypographyProps={{
                        align: "center",
                        variant: "h6",
                      }}
                      secondaryTypographyProps={{
                        align: "center",
                        variant: "h5",
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary={currentStrings.Dashboard.invest.Maximun_stake}
                      secondary={trade.max}
                      primaryTypographyProps={{
                        align: "center",
                        variant: "h6",
                      }}
                      secondaryTypographyProps={{
                        align: "center",
                        variant: "h5",
                      }}
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

/*
 <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {currentStrings.Dashboard.invest.duration}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1">{`24 hrs`}</Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
*/
