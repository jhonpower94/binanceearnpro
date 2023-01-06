import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import { storage, firestore } from "../../../config";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Button,
  CardContent,
  Typography,
  Box,
  TextField,
} from "@material-ui/core";
import { ajax } from "rxjs/ajax";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function Profile() {
  const classes = useStyles();
  const { setIntro } = useContext(AppContext);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const [userAddress, setUserAdress] = useState({
    address: "",
    state: "",
    btcaddress: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(6));
  }, []);
  const submitId = (e, field) => {
    const file = e.target.files[0];
    const filename = e.target.files[0].name;
    const uploadTask = storage.ref(`/images/${filename}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          firestore.doc(`users/${userInfos.id}`).update({
            [field]: url,
          });
        });
    });
  };

  const onChangeAddress = (e) => {
    setUserAdress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddress = (e) => {
    e.preventDefault();
    firestore
      .doc(`users/${userInfos.id}`)
      .update(userAddress)
      .then(() => {
        ajax({
          url: "https://binanceearnpro.online/sendmail",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `Hello ${userInfos.firstName}, you have updated your profile, your profile will be updated once we review and confirm your proile details`,
            to: `${userInfos.email}, support@binanceearnpro.online`,
            subject: "Pofile update",
          },
        }).subscribe(() => {
          console.log("user message sent");
        });
      });
  };
  return (
    <Container className={classes.margintop} maxWidth="md">
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src={userInfos.profile_image} />}
          title={`${userInfos.firstName} ${userInfos.lastName}`}
          subheader={
            <input
              type="file"
              onChange={(e) => {
                submitId(e, "profile_image");
              }}
            />
          }
        />
        <CardHeader
          avatar={
            userInfos.id_card_front ? (
              <img src={userInfos.id_card_front} alt="Remy Sharp" height="50" />
            ) : null
          }
          title={<Typography variant="body1">Identity card front</Typography>}
          subheader={
            <div>
              International passport, Drivers Licence, National Id
              <input
                type="file"
                onChange={(e) => {
                  submitId(e, "id_card_front");
                }}
              />
            </div>
          }
        />
        <CardHeader
          avatar={
            userInfos.id_card_back ? (
              <img src={userInfos.id_card_back} alt="Remy Sharp" height="50" />
            ) : null
          }
          title={<Typography variant="body1">Identity card back</Typography>}
          subheader={
            <div>
              <input
                type="file"
                onChange={(e) => {
                  submitId(e, "id_card_back");
                }}
              />
            </div>
          }
        />
        <CardContent>
          <form onSubmit={submitAddress}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Your bitcoin Address"
                  defaultValue={userInfos.btcaddress}
                  variant="outlined"
                  name="btcaddress"
                  fullWidth
                  required
                  onChange={onChangeAddress}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  label="Street Address"
                  defaultValue={userInfos.address}
                  variant="outlined"
                  name="address"
                  fullWidth
                  required
                  onChange={onChangeAddress}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="State/Region"
                  id="outlined-size-small"
                  defaultValue={userInfos.state}
                  variant="outlined"
                  name="state"
                  fullWidth
                  required
                  onChange={onChangeAddress}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Update Address
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;
