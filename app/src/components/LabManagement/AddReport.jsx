import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, Divider } from '@material-ui/core/';
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

const AddReport = () => {
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
        //  
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
                        <Typography variant="h4" className={classes.pageTitle}>Add New Blood Report</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>
                            
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="fullname"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Patient Name" variant="outlined" color="primary" {...field} />}
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
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Patient Email" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Patient Mobile Number" variant="outlined" color="primary" {...field} />}
                                        />
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
                                            name="datecollected"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date Collected"
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
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        className={classes.sectionHeader}
                                    >
                                        <Grid item xs={12} sm={2}>
                                            <Typography variant="body1" className={classes.note} >Complete Blood Count</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={10}>
                                            <Divider style={{ backgroundColor: '#6e6e6e' , height: "3px" }}  />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="hemoglobin"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Hemoglobin" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rbc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RBC" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="hct"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="HCT" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mcv"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCV" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mch"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCH" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mchc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCHC" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rdwcv"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RDW-CV" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rdwsd"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RDW-SD" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="wbc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="WBC" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="neu"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="NEU%" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="lym"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="LYM%" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mon"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MON%" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="eos"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="EOS%" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="bas"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="BAS%" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="lym2"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="LYM#" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="gra"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="GRA#" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="plt"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="PLT" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="esr"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="ESR" variant="outlined" color="primary" {...field} />}
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

export default AddReport;
