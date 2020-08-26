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

const loading = (state = { loading: false }, action) => {
  const newLoadState = { ...state, loading: !state.loading };
  switch (action.type) {
    case "LOADING":
      return newLoadState;
    default:
      return state;
  }
};
const loadingPayment = (state = { loading: false }, action) => {
  const newLoadState = { ...state, loading: !state.loading };
  switch (action.type) {
    case "LOADINGPAYMENT":
      return newLoadState;
    default:
      return state;
  }
};
const blocks = (state = { data: [] }, action) => {
  const newBlock = { ...state, data: action.payload };
  switch (action.type) {
    case "BLOCKS":
      return newBlock;
    default:
      return state;
  }
};

const activities = (
  state = { totlProfit: 6, totalDeposit: 6, totalwithdrawn: 6 },
  action
) => {
  const profits = { ...state, totlProfit: action.payload };
  const totaldeposit = { ...state, totalDeposit: action.payload };
  const totalwithdraw = { ...state, totalwithdrawn: action.payload };
  const totalBonus = { ...state, bonusTotalRecieved: action.payload };
  switch (action.type) {
    case "PROFITS":
      return profits;
    case "DEPOSIT":
      return totaldeposit;
    case "WITHDRAW":
      return totalwithdraw;
    case "BONUSTOTAL":
      return totalBonus;
    default:
      return state;
  }
};

const bonus = (state = { bonus: [] }, action) => {
  const newCollection = { ...state, bonus: action.payload };
  switch (action.type) {
    case "BONUSCOLLECTION":
      return newCollection;
    default:
      return state;
  }
};

const balance = (state = { main_balance: 0, bonus_balance: 0 }, action) => {
  const main = { ...state, main_balance: action.payload };
  const bonus = { ...state, bonus_balance: action.payload };
  switch (action.type) {
    case "MAINBALANCE":
      return main;
    case "BONUSBALANCE":
      return bonus;
    default:
      return state;
  }
};

const investment = (state = { trades: [] }, action) => {
  const newInvest = { ...state, trades: action.payload };
  switch (action.type) {
    case "INVESTMENT":
      return newInvest;
    default:
      return state;
  }
};
const notifications = (state = { notification: [] }, action) => {
  const newNoty = { ...state, notification: action.payload };
  switch (action.type) {
    case "NOTIFICATION":
      return newNoty;
    default:
      return state;
  }
};

const locationinfo = (
  state = { locationinfo: [{ country: "", id: "", wallet_balance: 0 }] },
  action
) => {
  const newlocation = { ...state, locationinfo: action.payload };
  switch (action.type) {
    case "LOCATIONINFO":
      return newlocation;
    default:
      return state;
  }
};

const selectetedmenu = (state = { number: 0 }, action) => {
  const select = { ...state, number: action.payload };
  switch (action.type) {
    case "SELECTED":
      return select;
    default:
      return state;
  }
};

export const allreducer = combineReducers({
  language: languageSelected,
  darkMode: darkMode,
  loading: loading,
  loadingpayment: loadingPayment,
  blocks: blocks,
  balance: balance,
  activities: activities,
  bonus: bonus,
  investment: investment,
  notification: notifications,
  locationinfo: locationinfo,
  selectetedmenu: selectetedmenu,
});
