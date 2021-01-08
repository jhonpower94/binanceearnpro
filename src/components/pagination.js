import React, { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

const Pagnition = ({ postperpage, totalpost, paginate }) => {
  const pageNumber = Math.ceil(totalpost / postperpage);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Pagination
        count={pageNumber}
        variant="outlined"
        color="primary"
        onChange={(e, pageNumber) => {
            console.log(pageNumber)
            paginate(pageNumber)}}
      />
    </React.Fragment>
  );
};

export default Pagnition;
