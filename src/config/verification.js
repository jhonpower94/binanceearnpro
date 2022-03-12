import { docData } from "rxfire/firestore";
import { firestore } from ".";

export const getVerifiedUsers = (email) => {
  const datas = firestore.doc(`verifiedaccounts/${email}`);
  return docData(datas, "id");
};
