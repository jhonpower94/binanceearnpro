import React, { useEffect } from "react";
import { HomePageStrings } from "../../lang/langhomepage";

function AccountLayout(props) {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default AccountLayout;
