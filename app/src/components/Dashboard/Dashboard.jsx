import React, { useState, useEffect, useRef } from 'react';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, IconButton } from '@material-ui/core/';
import ReactFitText from 'react-fittext';
import Clock from 'react-live-clock';
import "moment-timezone";
import '@natscale/react-calendar/dist/main.css';
import { Calendar } from '@natscale/react-calendar';

import useStyles from './styles';
import logo from '../../assets/logo.png';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid 
                container 
                spacing={3} 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} justifyContent="center" alignItems="center" >
                    <Paper className={classes.paper} style={{ backgroundColor: "#023E8A", color: "#ffffff" }}>
                        <Grid container  direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <img src={logo} className={classes.logo} />
                            <Typography variant="h2" className={classes.pageTitle}>24Seven hospital management system</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} justifyContent="center" alignItems="center">
                    <Paper className={classes.paper}>
                        <Grid container  direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <ReactFitText compressor={1.8} >
                                    <div className={classes.clock}>
                                        <Clock interval={1000} ticking={true} format={'dddd, MMMM Mo, YYYY'} timezone={"Australia/Sydney"} />
                                    </div>
                                </ReactFitText>
                            </Grid>
                            <Grid item xs={12}>
                                <ReactFitText compressor={0.7} >
                                    <div className={classes.clock}>
                                        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                                    </div>
                                </ReactFitText>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} justifyContent="center" alignItems="center">
                    <Paper className={classes.paper} >
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<LibraryAddIcon />}
                                >
                                    Channeling Management
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<MonetizationOnIcon />}
                                >
                                    Finance Management
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<YoutubeSearchedForIcon />}
                                >
                                    Laboratory Management
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<LocalHospitalIcon />}
                                >
                                    Inventory Management
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* <Grid item xs>
                    <Paper className={classes.paper} style={{ backgroundColor: "#023E8A", color: "#ffffff" }}>
                        <ReactFitText compressor={0.7} >
                            <div className={classes.clock} style={{ color: "#ffffff" }}>
                                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                            </div>
                        </ReactFitText>
                    </Paper>
                </Grid> */}
                
            </Grid>
            
        </div>
    )
}

export default Dashboard;
