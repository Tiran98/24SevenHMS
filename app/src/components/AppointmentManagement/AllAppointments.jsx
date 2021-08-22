import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

//const appointment = [
//   { "appID" : "0001", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0002", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0003", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0004", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0005", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0006", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0007", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0008", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0009", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0010", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//   { "appID" : "0011", "firstName" : "Vinuri", "lastName" : "Galagoda", "email" : "vinuri@gmail.com", "mobile" : "0771234567", "gender" : "female", "consultant" : "Rikas", "appdate" : "12/02/2021", "apptime" : "4.00 pm - 4.10 pm"},
//];

const AllAppointments = () => {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(true)
    const { control, handleSubmit, reset } = useForm();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [opendlt, setOpendlt] = React.useState(false);
    const [reportData, setReportData] = React.useState([]);
    const [appointment, setAppointment] = React.useState([]);

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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, appointment.length - page * rowsPerPage);

    useEffect(() => {
        fetch("http://localhost:5000/api/appointment").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setAppointment(jsonRes));
    }, [])
    
    const handleClickOpen = () => {
        setOpendlt(true);
    };
    
    const handleClose = () => {
        setOpendlt(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (row) => {
        setOpenModal(true);
        // console.log(row);
        setReportData(row);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const modalBody = (
        <Fade in={openModal}>
            <Grid container spacing={3} className={classes.modelPaper}>
                <Grid item xs={12}>
                    <Typography variant="h6" id="transition-modal-title" style={{ color: '#0077B6', textAlign: 'center', textTransform: 'uppercase', fontWeight: 800, }} gutterBottom>
                        24Seven hospital management system
                    </Typography>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h6" id="transition-modal-title" className={classes.reportTitle}>Appointment Slip</Typography>
                    </Paper>
                    <table className={classes.table}>
                        <tr style={{ fontSize: "18px", color: "#0077B6" }}>
                            <td className={classes.trReport}>Appointment ID</td>
                            <td className={classes.trReport}>{reportData._id}</td>
                        </tr>
                        <tr>
                            <td className={classes.trReport}>Full Name</td>
                            <td>{reportData.firstName} {reportData.lastName}</td>
                            <td className={classes.trReport}>Gender</td>
                            <td>{reportData.gender}</td>
                        </tr>
                        <tr>
                            <td className={classes.trReport}>Email</td>
                            <td>{reportData.email}</td>
                            <td className={classes.trReport}>Mobile Number</td>
                            <td>{reportData.mobile}</td>
                        </tr>
                        <tr>
                            <td className={classes.trReport}>Name of Consultant</td>
                            <td>{reportData.consultant}</td>
                            <td className={classes.trReport}>Date of Appoinment</td>
                            <td>{reportData.appdate}</td>
                        </tr>
                        <tr>
                            <td className={classes.trReport}>Time of Appointment</td>
                            <td>{reportData.apptime}</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
        </Fade>
    );

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>All Appointments</Typography>
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
                        <Button component={Link} to ="/add-appointment" fullWidth variant="contained" startIcon={<AddIcon />} color="secondary" className={classes.submitbtn}>
                            Add New Appointment
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow component={Paper} className={classes.paper}>
                                        <TableCell component="th" className={classes.tableth} style={{ width: 100 }}>
                                            Appointment ID
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Full Name
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Email
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Mobile Number
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Gender
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Consultant Name
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Appointment Date
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Appointment Time
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Actions
                                        </TableCell>
                                    </TableRow> <br />
                                    {(rowsPerPage > 0
                                        ? appointment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : appointment
                                    ).map((row) => (
                                        <>
                                        <TableRow key={row.name} className={classes.tableRow}>
                                            <TableCell component="th" scope="row" style={{ width: 100 }}>
                                                {row._id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.firstName} {row.lastName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.mobile}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.gender}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.consultant}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.appdate}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.apptime}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button variant="contained" color="secondary" className={classes.tableBtn} onClick={() => handleOpenModal(row)}>
                                                    View
                                                </Button>
                                                <Button variant="contained" color="secondary" className={classes.tableBtn}>
                                                    Update
                                                </Button>
                                                <Button variant="contained" className={classes.tableBtnRed} onClick={handleClickOpen}>
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
                                        count={appointment.length}
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
            <Dialog
                open={opendlt}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Paper className={classes.dialogBox}>
                    <DialogTitle id="alert-dialog-title" style={{ textAlign:"center" }}><DeleteForeverIcon style={{ fontSize: "100px", color: "#ff4040" }} /></DialogTitle>
                    <DialogContent style={{ textAlign:"center" }}> 
                        <DialogContentText id="alert-dialog-description" className={classes.dialogContent}>
                            Are you sure you want to<br /> permanetly delete this record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent:"center" }}>
                        <Button onClick={handleClose} variant="contained"color="secondary" className={classes.dialogBtn}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" className={classes.dialogBtnRed} autoFocus>
                            Yes, Delete it
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
               {modalBody}
            </Modal>
            <Grid item xs={12} sm={2}>
                <Button component={Link} to ="/" fullWidth variant="contained" color="secondary" className={classes.submitbtn}>
                            Generate Report
                </Button>
            </Grid>
        </div>
    )
}

export default AllAppointments;
