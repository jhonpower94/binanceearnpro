import { firestore, collectionData } from "./index";
import Coinpayments from "coinpayments";

const CoinpaymentsCredentials = {
  key: "1f6d19f8eaf333cbd4812f313f6c489dd7d8a86480c7726e4f167952c445b20c",
  secret: "62CE5e3315CbF56aB29DD03d7549DE2414E4C2b1d953eeE1e7e8FfC970E18465",
};
export const client = new Coinpayments(CoinpaymentsCredentials);

export const addUsers = (users, id) =>
  firestore.collection("users").doc(id).set(users);
