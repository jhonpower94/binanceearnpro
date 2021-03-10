import { Converter } from "easy-currencies";
import React, { useEffect, useState, useContext } from "react";

let converter = new Converter(
  "OpenExchangeRates",
  "236dd075cd5245eea8b196f1dd855fff"
);

export const convertCurrency = (amount, currency) => {
  converter.convert(amount, "USD", currency).then((data) => {
    return data;
  });
};
