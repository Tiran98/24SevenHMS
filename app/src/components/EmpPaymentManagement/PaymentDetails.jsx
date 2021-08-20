import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import useStyles from './styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const employeeFD = [
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
];

const PaymentDetails = () => {
    const classes = useStyles();
    const [opendlt, setOpendlt] = React.useState(false);

    const handleClickOpen = () => {
        setOpendlt(true);
    };
    
    const handleClose = () => {
        setOpendlt(false);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Payment Details</Typography>
                        <Typography variant="h5" className={classes.pageTitleEID}>EID : 0002</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.detailsPaper}>
                        <h2 style={{marginBottom:10,marginTop:10,marginLeft:10}}>Employee Details</h2>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography  variant="h6">First Name : <span style={{color:'#023e8a'}}>Remus</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Last Name : <span style={{color:'#023e8a'}}>Lupin</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Email : <span style={{color:'#023e8a'}}>Remus.lupin@gmail.com</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Mobile Number : <span style={{color:'#023e8a'}}>+94772245632</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Address 1 : <span style={{color:'#023e8a'}}>London</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Address 2 : <span style={{color:'#023e8a'}}>England</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Gender : <span style={{color:'#023e8a'}}>Male</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Marital Status : <span style={{color:'#023e8a'}}>Married</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Date of Birth : <span style={{color:'#023e8a'}}>10/03/1960</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Position/Job Title : <span style={{color:'#023e8a'}}>Doctor</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:20,marginLeft:30}}>
                            <Typography variant="h6">Date of Hire : <span style={{color:'#023e8a'}}>02/05/2021</span></Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.detailsPaper}>
                        <h2 style={{marginBottom:10,marginTop:10,marginLeft:10}}>Payment Details</h2>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography  variant="h6">Payment Date : <span style={{color:'#023e8a'}}>02/05/2021</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Amount : <span style={{color:'#023e8a'}}>Rs. 80000.00</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Type : <span style={{color:'#023e8a'}}>Visa</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Account : <span style={{color:'#023e8a'}}>800451178422</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Bank : <span style={{color:'#023e8a'}}>Commercial Bank</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Description : <span style={{color:'#023e8a'}}>Full payment for October Month</span></Typography>
                        </Grid>
                    </Paper>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.detailsUpdateBtn}>
                        Update Payment Details
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.detailsDeleteBtn} onClick={handleClickOpen}>
                        Delete Payment
                        </Button>
                    </Grid>
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
        </div>
    )
}

export default PaymentDetails
