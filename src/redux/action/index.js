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
