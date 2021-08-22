import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IconButton , TextField, InputAdornment , Paper, Button, Grid, Typography } from '@material-ui/core/';
import { useForm, Controller } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from './styles';
import logo from '../../assets/logoFull.png';

const AdminLogin = ({ setPathName, setDrawerState }) => {
    const classes = useStyles();
    const location = useLocation();
    const { control, handleSubmit, reset } = useForm();
    const [showPassword, setShowPassword] = React.useState(true);
    const [userProfile, setUserProfile] = useState([]);
    const [formData, setFormData] = useState([]);
    const isFirstRender = useRef(true);
    const history = useHistory();

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

    useEffect(() => {
      console.log(location.pathname);
      if (isFirstRender.current) {
        isFirstRender.current = false // toggle flag after first render/mounting
        return;
      }
    
      submitForm(formData);

    }, [formData]);

    useEffect(() => {
      localStorage.setItem('profile', JSON.stringify(userProfile));
    }, [userProfile])

    const handleDrawerClose = () => {
        setDrawerState(false);
        setPathName(location.pathname);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
      setFormData({
          email : data.email,
          password : data.password
      })
    }

    const submitForm = (data) => {
      // console.log(data);

      axios.post('http://localhost:5000/api/user/login',
      {
        email : data.email,
        password : data.password

      }). then((response) => {
        setUserProfile(response.data);
        history.push('/home');
      }).catch((err) => {
        console.log(err);
      })

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
                    <Typography variant="h5" className={classes.pageTitle} gutterBottom>Admin Login</Typography>
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

export default AdminLogin;
