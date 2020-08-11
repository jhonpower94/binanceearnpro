import React, { useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import { AppContext } from "../../../App";
import IntroHeaderPages from "../component/introheaderpages";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  Button,
  CardContent,
  Menu,
  MenuItem,
  ListItemText,
  Fade,
} from "@material-ui/core";
import { ExpandMore, FilterListRounded } from "@material-ui/icons";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size };
}

const rows = [
  createData("Deposit", "IN", 1324171354, 3287263),
  createData("Withdrawal", "CN", 1403500365, 9596961),
  createData("Withdrawal", "IT", 60483973, 301340),
  createData("Deposit", "IN", 1324171354, 3287263),
  createData("Withdrawal", "CN", 1403500365, 9596961),
  createData("Withdrawal", "IT", 60483973, 301340),
  createData("Deposit", "IN", 1324171354, 3287263),
  createData("Withdrawal", "CN", 1403500365, 9596961),
  createData("Withdrawal", "IT", 60483973, 301340),
  createData("Deposit", "IN", 1324171354, 3287263),
  createData("Withdrawal", "CN", 1403500365, 9596961),
  createData("Withdrawal", "IT", 60483973, 301340),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function BlocDatas(props) {
  const classes = useStyles();
  const { frontView } = props;
  const { setIntro } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [arrays, setArrays] = React.useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  useEffect(() => {
    setIntro({
      layout: <IntroHeaderPages title="bloclkdata Title" image="blockdatawhite.svg" />,
    });
    window.scrollTo(0, 0);
    const sliceData = rows.slice(0, 5);
    frontView ? setArrays(sliceData) : setArrays(rows);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterArray = (title) => {
    let filtered = rows.filter((name) => name.name === title);
    setArrays([...filtered]);
    console.log(filtered);
  };

  return (
    <Container className={classes.margintop}>
      {frontView ? null : (
        <CardContent>
          <Button
            startIcon={<FilterListRounded />}
            endIcon={<ExpandMore />}
            onClick={handleClick}
          >
            Select type
          </Button>
          <StyledMenu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {[
              {
                title: "Deposit",
              },
              {
                title: "Withdrawal",
              },
            ].map((opt, index) => (
              <MenuItem
                onClick={() => {
                  filterArray(opt.title);
                  handleClose();
                }}
                key={index}
              >
                <ListItemText primary={opt.title} />
              </MenuItem>
            ))}
          </StyledMenu>
        </CardContent>
      )}

      <TableContainer className={classes.container}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrays
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {frontView ? null : (
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Container>
  );
}
