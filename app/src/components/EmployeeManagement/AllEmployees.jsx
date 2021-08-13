import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import useStyles from './styles';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const classes1 = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page"  className={classes1.paginationBtn}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const employees = [
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "email" : "minerva@gmail.com", "mobile" : "0774584529"},
];

const AllEmployees = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const CssTextField = withStyles({
        root: {
          '& .MuiInputBase-root': { 
            backgroundColor: '#ffffff',
           },
          '& .MuiInputLabel-root': { 
            color: '#6e6e6e',
          },
          '& .MuiTextField-root': {
            color: '#6e6e6e',
          },
          '& .MuiFormHelperText-root': {
            color: '#6e6e6e',
          },
          '& label.Mui-focused': {
            color: '#6e6e6e',
          },
          '& .MuiInputBase-input':{
            color: '#1a1a1a',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#6e6e6e',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#6e6e6e',
            },
            '&:hover fieldset': {
              borderColor: '#0077B6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0077B6',
            },
          },
        },
        input: {
          color: "#1a1a1a"
        }
    })(TextField);

    const TableCell = withStyles({
        root: {
          borderBottom: "none"
        }
    })(MuiTableCell);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>All Employees</Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={3} justifyContent="flex-end" alignItems="center" style={{ padding: "12px" }}>
                    <Grid item xs={12} sm={4}>
                        <CssTextField
                            fullWidth
                            label="Search Records"
                            variant="outlined"
                            color="primary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button component={Link} to ="/add-employee" fullWidth variant="contained" startIcon={<AddIcon />} color="secondary" className={classes.submitbtn}>
                            Add New Employee
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow component={Paper} className={classes.paper}>
                                        <TableCell component="th" className={classes.tableth} style={{ width: 100 }}>
                                            Employee ID
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Full Name
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Position/Job Title
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Email
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Mobile Number
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Actions
                                        </TableCell>
                                    </TableRow> <br />
                                    {(rowsPerPage > 0
                                        ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : employees
                                    ).map((row) => (
                                        <>
                                        <TableRow key={row.name} className={classes.tableRow}>
                                            <TableCell component="th" scope="row" style={{ width: 100 }}>
                                                {row.empID}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.firstName} {row.lastName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.position}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.mobile}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button variant="contained" color="secondary" className={classes.tableBtn}>
                                                    Message
                                                </Button>
                                                <Button variant="contained" color="error" className={classes.tableBtnRed}>
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <br />
                                        </>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={6}
                                        style={{ borderBottom:"none" }}
                                        count={employees.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}

export default AllEmployees;
