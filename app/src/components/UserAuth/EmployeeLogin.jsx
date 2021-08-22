import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Radio, RadioGroup, IconButton , TextField, InputAdornment , Paper, Button, Grid, Typography } from '@material-ui/core/';
import { useForm, Controller } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from './styles';
import logo from '../../assets/logoFull.png';

const EmployeeLogin = ({ setPathName, setDrawerState }) => {
    const classes = useStyles();
    const location = useLocation();
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = React.useState(true);

    const CssTextField = withStyles({
        root: {
          '& .MuiInputLabel-root': {
            color: '#cccccc',
          },
          '& .MuiTextField-root': {
            color: '#ffffff',
          },
          '& .MuiFormHelperText-root': {
            color: '#6e6e6e',
          },
          '& label.Mui-focused': {
            color: '#cccccc',
          },
          '& .MuiInputBase-input':{
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#6e6e6e',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#cccccc',
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

    useEffect(() => {
        handleDrawerClose();
    }, []);

    const handleDrawerClose = () => {
        // setPathName(location.pathname);
        setDrawerState(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {

        // if(userType == "attendee") {
      
        //     formDataNew.append('userType', userType);
        // } else {
        //     formDataNew.append('firstName', data.firstName);

        // }

        // submitForm(formDataNew);

        // for(var pair of formDataNew.entries()) {
        //         console.log(pair[0]+', '+pair[1]);
        // }
    }

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                <Paper className={classes.paper}>
                    <img src={logo} className={classes.logo} />
                    <Typography variant="h5" className={classes.pageTitle} gutterBottom>Employee Login</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => 
                                    <CssTextField fullWidth label="Email" variant="outlined" color="primary" {...field} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => 
                                    <CssTextField 
                                        fullWidth 
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password" 
                                        variant="outlined" 
                                        color="primary" 
                                        {...field}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton className={classes.visibilityBtn} aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}/>}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" className={classes.submitbtn}>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default EmployeeLogin
