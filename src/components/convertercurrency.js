import { Converter } from "easy-currencies";
import React, { useEffect, useState, useContext } from "react";

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

export const convertCurrency = (amount, currency) => {
  converter.convert(amount, "USD", currency).then((data) => {
    return data;
  });
};
