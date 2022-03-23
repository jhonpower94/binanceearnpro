import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { firestore, collectionData } from "../../../config";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
}));

function Document({ email }) {
  const classes = useStyles();
  const [docs, setDocs] = React.useState([]);
  const [loadingdoc, setLoadingDoc] = React.useState(true);

  useEffect(() => {
    console.log(email);
    const documents = firestore.collection(
      `verifiedaccounts/${email}/documentsphotos`
    );
    collectionData(documents, "id").subscribe((data) => {
      console.log(data);
      setDocs(data);
      setLoadingDoc(false);
      // setUsers(data);
    });
  }, []);

  return (
    <Container className={classes.margintop}>
      {loadingdoc ? (
        "fetching documents please wait..."
      ) : (
        <Grid container spacing={3} justify="center">
          {docs.map((val, index) => (
            <Grid item xs={12} md={12}>
              <Typography gutterBottom>{val.id}</Typography>
              <img src={val.image} alt={val.id} height={200} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Document;
