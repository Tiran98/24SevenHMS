import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { TextField, Paper,Box,Modal, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

const schema = yup.object().shape({
    productType: yup.string().required("Select Product Type"),
    productName: yup.string().required("Enter the Product Name"),
    quantity: yup.string().required("Enter the Quantity"),
    pricePeritem: yup.string().required("Enter the Price"),
    manfDate: yup.string().required("Manufacture Date is required."),
    expDate: yup.string().required("Expire Date is required."),
    brand: yup.string().required("You must enter the Products brand"),
    description: yup.string().required('You must enter a Description'),
});

const productTypes = [
    {
      value: 'default',
      label: 'Select Product Type',
    },
    {
      value: 'Drug',
      label: 'Drug',
    },
    {
      value: 'Equipment',
      label: 'Equipment',
    },
];

const inventoryFD = [
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "productId" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
];

const InventoryDetails = () => {
        const { invDetails } = useParams();
        const classes = useStyles();
        const { control, handleSubmit, reset, formState: { errors }  } = useForm(
            {
                resolver: yupResolver(schema),
                reValidateMode: 'onSubmit',
            }
        );
        const [productType, setProductType] = React.useState('default');
        const [position, setPosition] = React.useState('default');
        const [successMsg, setSuccessMsg] = useState(true);
    
        const [gender, setGender] = useState("");
    
        const CssTextField = withStyles({
            root: {
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

        const history = useHistory();
        const [opendlt, setOpendlt] = React.useState(false);
        const [Inventory, setInventory] = React.useState([]);
        const [productId, setProductId] = useState("");
        const [formData, setFormData] = useState([]);
        
        const { id } = useParams();

        const handleClickOpen = () => {
            setOpendlt(true);
            setProductId(id);
        };

        const handleClose = () => {
            setOpendlt(false);
            history.push('/all-inventory')
        };

        const [open, setOpen] = React.useState(false);
        const handleOpenUpdate = () => setOpen(true);
        const handleCloseUpdate = () => setOpen(false);

        useEffect(() => {
            fetch("http://localhost:5000/api/invMngmnt/getInvMngmnt/"+id)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            }).then(jsonRes => setInventory(jsonRes));
    
        }, [])

        const deletePayment = () => {
            console.log(setProductId)
            axios
            .delete("http://localhost:5000/api/invMngmnt/deleteInvMngmnt/" + productId)
            .then((res) => {
                if(res.status == 200){
                    console.log("Payment Deleted Successfully");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    
            handleClose();
        }

        const onSubmit = (data) => {
    
            const dataFromForm =  [{
                productId:id,
                productType: data.productType,
                productName: data.productName,
                quantity: data.quantity,
                pricePerItem: data.pricePeritem,
                manufactureDate: data.manfDate,
                expiredDate: data.expDate,
                description: data.description,
                brand: data.brand,
              }]
    
              console.log(dataFromForm)
    
            axios
            .post("http://localhost:5000/api/invMngmnt/updateInvMngmnt", dataFromForm)
            .then((res) => {
                if(res.status == 200){
                    console.log("Item details Updated Successfully");
                    history.push('/all-inventory');
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
        const submitForm = (data) => {
            reset({
                keepErrors: true,
            });
        }

        const handlesetProductType = (event) => {
            setProductType(event.target.value, console.log(productType));
        };

        const handleSuccessMsg = (event, reason) => {

            if (reason === 'clickaway') {
              return;
            }
        
            setSuccessMsg(false);
        };


    return (
        <div>
            <Grid container spacing={3} className={classes.modelPaper} >
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Payment Details</Typography>
                        <Typography variant="h6" id="transition-modal-title" className={classes.reportTitle}>Item ID :{productId}</Typography>
                    </Paper>

                    <table className={classes.table}>
                        <tr style={{ fontSize: "20px" }}>
                            <td className={classes.trINV}>Product Type</td>
                            <td>{formData.productType}</td>
                        </tr>
                        <tr style={{ fontSize: "20px" }}>
                            <td className={classes.trINV}>Product Name</td>
                            <td className={classes.trINV}>Quantity</td>


                        </tr>
                        <tr style={{ fontSize: "20px" }}>
                            <td className={classes.trINV}>Brand</td>
                            <td className={classes.trINV}>Price</td>
                        </tr>
                        <tr style={{ fontSize: "20px" }}>
                            <td className={classes.trINV}>Manufacture Date</td>
                            <td className={classes.trINV}>Expiration Date</td>
                        </tr>
                        <tr style={{ fontSize: "20px" }}>
                            <td className={classes.trINV}>Description</td>
                        </tr>
                    </table>

                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" className={classes.detailsUpdateBtn} onClick={handleOpenUpdate}>
                        Update Item Details
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" className={classes.detailsDeleteBtn} onClick={handleClickOpen}>
                        Delete Item
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
                        <Button onClick={deletePayment} variant="contained" className={classes.dialogBtnRed} autoFocus>
                            Yes, Delete it
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>

        </div>
    )
}

export default InventoryDetails