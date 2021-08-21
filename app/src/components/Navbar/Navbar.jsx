import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import HelpIcon from '@material-ui/icons/Help';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import DashboardIcon from '@material-ui/icons/Dashboard';

import useStyles from './styles';
import logo from '../../assets/logo.png';

const Navbar = ({ setDrawerState, drawerState }) => {
    const classes = useStyles();
    // const location = useLocation();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = useState(["hi"]);
    const totalItems = notifications.length;
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const [userToken, setUserToken] = useState(JSON.stringify(localStorage.getItem('userToken')));
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userType, setUserType] = useState("admin");

    const handleDrawer = () => {
        if (drawerState == false) setDrawerState(true);
        else setDrawerState(false);
    };

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {drawerState ? 
                        <IconButton
                            color="primary"
                            onClick={handleDrawer}
                        >
                            <CloseIcon />
                        </IconButton> :
                        <IconButton
                            color="primary"
                            onClick={handleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        }
                    <Typography variant="h6" className={classes.title} color="primary">
                       <img src={logo} className={classes.logo} />24Seven HMS
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.profile}>
                        <div className={classes.profileType}>
                            <Typography className={classes.userName} variant="h6">Harry Potter</Typography>
                            {userType == "attendee" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Attendee</Typography>: 
                            userType == "researcher" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Researcher</Typography>:
                            userType == "workshop_presenter" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Workshop Presenter</Typography>:
                            userType == "admin" ?
                                <Typography className={classes.userType} variant="caption" color="primary">Admin</Typography>: null
                            }
                                    
                        </div>
                        <Button variant="contained" className={classes.logout}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={drawerState} className={classes.drawer} classes={{paper: classes.drawerPaper,}}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem component={Link} to="/" button >
                            <ListItemIcon className={classes.navIcon}><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-appointments" button>
                            <ListItemIcon className={classes.navIcon}><LibraryAddIcon /></ListItemIcon>
                            <ListItemText primary="Channeling Management" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-emp-payment" button>
                            <ListItemIcon className={classes.navIcon}><MonetizationOnIcon /></ListItemIcon>
                            <ListItemText primary="Finance Management" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-reports" button>
                            <ListItemIcon className={classes.navIcon}><YoutubeSearchedForIcon /></ListItemIcon>
                            <ListItemText primary="Laboratory Management" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon className={classes.navIcon}><LocalHospitalIcon /></ListItemIcon>
                            <ListItemText primary="Inventory Management" />
                        </ListItem>
                        <ListItem component={Link} to="/all-employees" button>
                            <ListItemIcon className={classes.navIcon}><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Employee Management" />
                        </ListItem>
                    </List>
                        <Divider />
                    <List>
                        {/* <ListItem component={Link} to ="/" button >
                            <ListItemIcon ><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem> */}
                        <ListItem button>
                            <ListItemIcon className={classes.navIcon}><InfoIcon /></ListItemIcon>
                            <ListItemText primary="Abouts Us" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon className={classes.navIcon}><HelpIcon /></ListItemIcon>
                            <ListItemText primary="Help Page" />
                        </ListItem>
                    </List>
                <div className={classes.bottomPush}>
                    <Typography variant="caption" color="inherit" align="right" className={classes.footer}>
                        © 2021 24Seven.com.  All rights reserved.
                    </Typography>
                </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar
