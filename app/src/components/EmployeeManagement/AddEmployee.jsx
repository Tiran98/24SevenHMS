import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

const marital = [
    {
        value: 'default',
        label: 'Select the marital status',
    },
    {
      value: 'single',
      label: 'Single',
    },
    {
      value: 'married',
      label: 'Married',
    },
    {
      value: 'widowed',
      label: 'Widowed',
    },
    {
      value: 'divorced',
      label: 'Divorced',
    },
];

const positions = [
    {
        value: 'default',
        label: 'Select the position/job title',
    },
    {
      value: 'single',
      label: 'Doctor',
    },
    {
      value: 'pharmacist',
      label: 'Pharmacist',
    },
    {
      value: 'accountant',
      label: 'Accountant',
    },
    {
      value: 'labAssistant',
      label: 'Laboratory Assistant',
    },
];

const AddEmployee = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [maritalStatus, setMaritalStatus] = React.useState('default');
    const [position, setPosition] = React.useState('default');

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

        // if(userType == "attendee") {
        //     formDataNew.append('firstName', data.firstName);
        //     formDataNew.append('lastName', data.lastName);
        //     formDataNew.append('email', data.email);
        //     formDataNew.append('password', data.password);
        //     formDataNew.append('userType', userType);
        // } else {
        //     formDataNew.append('firstName', data.firstName);
        //     formDataNew.append('lastName', data.lastName);
        //     formDataNew.append('email', data.email);
        //     formDataNew.append('password', data.password);
        //     formDataNew.append('userType', userType);
        //     formDataNew.append('phone', data.phone);
        //     formDataNew.append('city', data.city);
        //     formDataNew.append('researchTitle', data.researchTitle);
        //     formDataNew.append('workshopTitle', data.workshopTitle);
        //     formDataNew.append('docs', acceptedFiles[0]);
        // }

        // submitForm(formDataNew);

        // for(var pair of formDataNew.entries()) {
        //         console.log(pair[0]+', '+pair[1]);
        // }
    }

    const handleRadioChange = (event) => {
        setGender(event.target.value, console.log(gender));
    };

    const handleMaritalStatus = (event) => {
        setMaritalStatus(event.target.value, console.log(maritalStatus));
    };

    const handlePosition = (event) => {
        setPosition(event.target.value, console.log(position));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Add New Employee</Typography>
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
                                        <Controller
                                            name="address1"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Address 1" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="address2"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Address 2" variant="outlined" color="primary" {...field} />}
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
                                            name="marital"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Marital Status"
                                                value={maritalStatus}
                                                onChange={handleMaritalStatus}
                                                variant="outlined"
                                                >
                                                {marital.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="position"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Position/Job Title"
                                                value={position}
                                                onChange={handlePosition}
                                                variant="outlined"
                                                >
                                                {positions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="hiredate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Hire"
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
                                </Grid>
                        </Paper>
                        <Typography variant="body2" className={classes.note} gutterBottom>
                            Note : Employee ID and a temporary password will be auto-generated and send to the employee's email.
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

export default AddEmployee;
