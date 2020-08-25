import React, { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

const override = css`
  display: block;
  margin: 0 auto;
  top: 15em;
`;

function AccountLayout(props) {
  const { intro } = useContext(AppContext);
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    console.log(loading.loading);
  }, []);

  return (
    <React.Fragment>
      {loading.loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={20}>
          <PulseLoader
            css={override}
            size={30}
            color={"#ef6c00"}
            loading={loading.loading}
          />
        </Box>
      ) : (
        props.children
      )}
    </React.Fragment>
  );
}

export default AccountLayout;
