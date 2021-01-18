import { Converter } from "easy-currencies";
import React, { useEffect, useState, useContext } from "react";

let converter = new Converter(
  "OpenExchangeRates",
  "b0e02e52f17b4f2a874d46b3deae060a"
);

export const convertCurrency = (amount, currency) => {
  converter.convert(amount, "USD", currency).then((data) => {
    return data;
  });
};
