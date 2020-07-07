import { combineReducers } from "redux";
import { Strings } from "../../lang/language";

const languageSelected = (state = Strings, action) => {
  const newState = { ...action.payload };
  switch (action.type) {
    case "LANGUAGE":
      return newState;
    default:
      return state;
  }
};
const darkMode = (state = true, action) => {
  switch (action.type) {
    case "DARKMODE":
      return !state;
    default:
      return state;
  }
};

export const allreducer = combineReducers({
  language: languageSelected,
  darkMode: darkMode,
});
