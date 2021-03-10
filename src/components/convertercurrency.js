import { Converter } from "easy-currencies";
import React, { useEffect, useState, useContext } from "react";

let converter = new Converter(
  "OpenExchangeRates",
  "fb74edb0a937e39c966d"
);

export const convertCurrency = (amount, currency) => {
  converter.convert(amount, "USD", currency).then((data) => {
    return data;
  });
};
