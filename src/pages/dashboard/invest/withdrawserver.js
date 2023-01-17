import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map";
import { ajax } from "rxjs/ajax";

export const walletEmailType = (amount, newbalance, emailtype, userInfos) => {
  const amountAdded = formatLocaleCurrency(amount, "USD", {
    autoFixed: false,
  });
  const amountnn = formatLocaleCurrency(newbalance, "USD", {
    autoFixed: false,
  });

  return ajax({
    url: "https://mega.binanceearnpro.online/sendmail",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      message: `Hello ${userInfos.firstName} ${userInfos.lastName}
       <br><br/>
       you have succesfully added your ${emailtype} balance of <p style="color: #06b956;">${amountAdded}</p> to your account wallet,
       and your current total wallet balance is <p style="color: #06b956;">${amountnn}</p>
       <br/>
       you can now use your wallet balance to reinvest, thank you.
    `,
      to: `${userInfos.email}, service@binanceearnpro.online`,
      subject: "Investment Withdrawal",
    },
  });
};
