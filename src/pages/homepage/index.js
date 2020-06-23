import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagnition from "../../components/pagination";
import { HomePageStrings } from "../../lang/langhomepage";
import ReactPaginate from "react-paginate";

const arrayDatas = [
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
  { name: "bruce" },
];

function HomeLayout() {
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(5);

  useEffect(() => {}, []);

  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = arrayDatas.slice(indexofFirstpage, indexofLastpost);

  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  return (
    <React.Fragment>
      <List dense={true}>
        {currentPost.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary="Secondary text" />
          </ListItem>
        ))}
      </List>
      <Pagnition
        postperpage={postperpage}
        totalpost={arrayDatas.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
}

export default HomeLayout;
