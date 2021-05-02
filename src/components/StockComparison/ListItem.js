import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {TableBody, TableCell,TableRow}  from "@material-ui/core/";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

// styling for table
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 16,
    alignContent:'center',
    color: theme.palette.common.white
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    row: {
    fontSize: 20,
  }
  }
}))(TableRow);

// styling
const useStyles = makeStyles({
  table: {
    margin:'auto',
    minWidth: 700,
    maxWidth: 900
  },
  green:{
    color:'#39FF14',
  },

});

const ListItem = (props) => {
  const classes = useStyles();  
  // displaying table body under the table head created in Compare component.
  return (
        <TableBody >
            <StyledTableRow>
              <StyledTableCell  align="center">{props.name}</StyledTableCell>
              <StyledTableCell  align="center">&#36; {props.openPrice}</StyledTableCell>
              <StyledTableCell align="center">&#36; {props.highPrice}<ArrowDropUpIcon className={classes.green} color="error"/></StyledTableCell>
              <StyledTableCell  align="center">&#36; {props.lowPrice}<ArrowDropDownIcon color="error"  /></StyledTableCell>
            </StyledTableRow>
        </TableBody>
  );
}

export default ListItem;
