import React, {useState} from 'react'
import { useForm, Controller } from "react-hook-form";
import { FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

const empTypes = [
    {
        value: 'default',
        label: 'Select the Employee Type',
    },
    {
      value: 'Doctor',
      label: 'Doctor',
    },
    {
      value: 'Pharmacist',
      label: 'Pharmacist',
    },
    {
      value: 'Reciptionist',
      label: 'Reciptionist',
    },
    {
      value: 'Lab Assistant',
      label: 'Lab Assistant',
    },
];

const employees = [
    {
        value: 'default',
        label: 'Select the Employee',
    },
    {
      value: 'Tiran',
      label: 'Tiran',
    },
    {
      value: 'Vinuri',
      label: 'Vinuri',
    },
    {
      value: 'Sanda',
      label: 'Sanda',
    },
    {
      value: 'Rikas',
      label: 'Rikas',
    },
];

const payTypes = [
    {
        value: 'default',
        label: 'Select the payment Type',
    },
    {
      value: 'Visa',
      label: 'Visa',
    },
    {
      value: 'MasterCard',
      label: 'MasterCard',
    },
    {
      value: 'Paypal',
      label: 'Paypal',
    },
];

const AddEmpPayment = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [empType, setEmpType] = React.useState('default');
    const [position, setPosition] = React.useState('default');
    const [employee, setEmployee] = React.useState('default');
    const [payType, setPayType] = React.useState('default');

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

    const onSubmit = (data) => {
    }

    const handleRadioChange = (event) => {
        setGender(event.target.value, console.log(gender));
    };

    const handleEmpType = (event) => {
        setEmpType(event.target.value, console.log(empType));
    };

    const handleEmployee = (event) => {
        setEmployee(event.target.value, console.log(employee));
    };

    const handlePayType = (event) => {
        setPayType(event.target.value, console.log(payType));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Add Employee Payment Details</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.form}>
                        <Paper className={classes.paper}>
                            
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="empType"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Employee Type"
                                                value={empType}
                                                onChange={handleEmpType}
                                                variant="outlined"
                                                >
                                                {empTypes.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="employee"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Select Employee"
                                                value={employee}
                                                onChange={handleEmployee}
                                                variant="outlined"
                                                >
                                                {employees.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payAmount"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Payment Amount" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payType"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Payment Type"
                                                value={payType}
                                                onChange={handlePayType}
                                                variant="outlined"
                                                >
                                                {payTypes.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payDate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Payment Date"
                                                    type="date"
                                                    variant="outlined"
                                                    color="primary"
                                                    {...field}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                          <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                          </InputAdornment>
                                                        ),
                                                    }}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payAccount"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Payment Account" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Description"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                defaultValue="Description"
                                                color="primary"
                                                variant="outlined"
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="bank"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField  fullWidth label="Payment Bank" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>        
                                </Grid>
                        </Paper>
                        <Typography variant="body2" className={classes.note} gutterBottom>
                            Note : Payment Account will be auto-generated from the given details by the Employee
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <Button type="reset" fullWidth variant="contained" className={classes.resetbtn}>
                                    Reset
                                </Button>
                            </Grid>    
                            <Grid item xs={12} sm={9}>
                                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submitbtn}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid> 
                    </form>
                </Grid>
            </Grid>    
        </div>
    )
}

export default AddEmpPayment
