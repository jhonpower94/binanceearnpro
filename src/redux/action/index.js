export const language$ = (data) => {
  return {
    type: "LANGUAGE",
    payload: data,
  };
};
export const darkmode$ = () => {
  return {
    type: "DARKMODE",
  };
};
export const loading$ = () => {
  return {
    type: "LOADING",
  };
};
export const stopload$ = (data) => {
  return {
    type: "STOPLOADING",
    payload: data,
  };
};
export const loadingpayment$ = () => {
  return {
    type: "LOADINGPAYMENT",
  };
};

export const blocks$ = (data) => {
  return {
    type: "BLOCKS",
    payload: data,
  };
};

export const totalprofit$ = (data) => {
  return {
    type: "PROFITS",
    payload: data,
  };
};
export const totaldeposit$ = (data) => {
  return {
    type: "DEPOSIT",
    payload: data,
  };
};
export const totalwithdrawn$ = (data) => {
  return {
    type: "WITHDRAW",
    payload: data,
  };
};
export const totalbonusearned$ = (data) => {
  return {
    type: "BONUSTOTAL",
    payload: data,
  };
};

export const bonusCollections$ = (data) => {
  return {
    type: "BONUSCOLLECTION",
    payload: data,
  };
};
export const mainbalance$ = (data) => {
  return {
    type: "MAINBALANCE",
    payload: data,
  };
};
export const bonusbalance$ = (data) => {
  return {
    type: "BONUSBALANCE",
    payload: data,
  };
};

export const myinvestment$ = (data) => {
  return {
    type: "INVESTMENT",
    payload: data,
  };
};

export const notification$ = (data) => {
  return {
    type: "NOTIFICATION",
    payload: data,
  };
};

export const locationinfo$ = (data) => {
  return {
    type: "LOCATIONINFO",
    payload: data,
  };
};

export const selectedmenuItem$ = (data) => {
  return {
    type: "SELECTED",
    payload: data,
  };
};

export const transactionInfo$ = (data) => {
  return {
    type: "TRXNS",
    payload: data,
  };
};

export const deposithistory$ = (data) => {
  return {
    type: "DEPOSITS",
    payload: data,
  };
};

export const withdrawhistory$ = (data) => {
  return {
    type: "WITHDRAWHISTORY",
    payload: data,
  };
};



