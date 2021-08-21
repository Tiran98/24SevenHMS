import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert from '@material-ui/lab/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const consultants = [
    {
        value: 'default',
        label: 'Select the name of the Consultant',
    },
    {
      value: 'vinuri',
      label: 'Vinuri',
    },
    {
      value: 'rikas',
      label: 'Rikas',
    },
    {
      value: 'tiran',
      label: 'Tiran',
    },
    {
      value: 'sanda',
      label: 'Sanda',
    },
];

const apptime = [
    {
        value: 'default',
        label: 'Select time',
    },
    {
      value: 'time1',
      label: '4.00 pm - 4.10 pm',
    },
    {
      value: 'time2',
      label: '4.10 pm - 4.20 pm',
    },
    {
      value: 'time3',
      label: '4.20 pm - 4.30 pm',
    },
    {
      value: 'time4',
      label: '4.30 pm - 4.40 pm',
    },
    {
        value: 'time5',
        label: '4.40 pm - 4.50 pm',
    },
    {
      value: 'time6',
      label: '4.50 pm - 5.00 pm',
    },
];

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    email: yup.string().required("Email is required.").email("Enter a valid Email."),
    mobile: yup.string().required("Mobile Number is required.").max(10, "Mobile Number cannot exceed 10 characters."),
    dob: yup.string().required("Date of Birth is required."),
    consultant: yup.string().required("Consultant is required."),
    appdate: yup.string().required("Appointment Date is required."),
    apptime: yup.string().required("Appointment Time is required."),
});

const AddAppointment = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { error } } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }

    );
    const [consultant, setConsultant] = React.useState('default');
    const [time, setTime] = React.useState('default');
    
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

    const handleConsultant = (event) => {
        setConsultant(event.target.value, console.log(consultant));
    };

    const handleTime = (event) => {
        setTime(event.target.value, console.log(time));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Add New Appointment </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>
                            
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="First Name" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Last Name" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Email" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Mobile Number" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel component="legend" className={classes.radioGoupLabel}>Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" row value={gender} onChange={handleRadioChange}>
                                            <FormControlLabel value="male" control={<Radio className={classes.radioGoup} />} label="Male" className={classes.radioGoup} />
                                            <FormControlLabel value="female" control={<Radio className={classes.radioGoup} />} label="Female" className={classes.radioGoup} />
                                            <FormControlLabel value="other" control={<Radio className={classes.radioGoup} />} label="Other" className={classes.radioGoup} />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="dob"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Birth"
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
                                            name="consultant"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Consultant Name"
                                                value={consultant}
                                                onChange={handleConsultant}
                                                variant="outlined"
                                                >
                                                {consultants.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="appointmentdate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="appointmentdate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Appointment"
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
                                    }
                                        />
                                    </Grid>    
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="time"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Appointment Time"
                                                value={time}
                                                onChange={handleTime}
                                                variant="outlined"
                                                >
                                                {apptime.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                </Grid>
                        </Paper>
                        
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


export default AddAppointment
