import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import axios from "axios";

import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import InfoIcon from "@material-ui/icons/Info";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PeopleIcon from "@material-ui/icons/People";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import HelpIcon from "@material-ui/icons/Help";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
import DashboardIcon from "@material-ui/icons/Dashboard";

import useStyles from "./styles";
import logo from "../../assets/logo.png";

const Navbar = ({ setDrawerState, drawerState }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("employeeProfile"))
  );
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState(userProfile?.position ?? "Admin");

  const handleDrawerOpen = () => {
    setDrawerState(true);
  };

  const handleDrawerClose = () => {
    setDrawerState(false);
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axios.post("http://localhost:5000/api/user/logout", {
          refreshToken,
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("employeeProfile");

      delete axios.defaults.headers.common["Authorization"];

      history.push("/login");
    }
  };

  useEffect(() => {
    // if (isFirstRender.current) {
    //     isFirstRender.current = false // toggle flag after first render/mounting
    //     return;
    // }

    setUserProfile(JSON.parse(localStorage.getItem("employeeProfile")));
    if (userProfile) {
      setUserType(userProfile.position);
      setUserName(userProfile.firstName + " " + userProfile.lastName);
    }
  }, [location]);

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {drawerState ? (
            <IconButton color="primary" onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title} color="primary">
            <img src={logo} className={classes.logo} />
            24Seven HMS
          </Typography>
          <div className={classes.grow} />
          <div className={classes.profile}>
            <div className={classes.profileType}>
              <Typography className={classes.userName} variant="h6">
                {userName}
              </Typography>
              <Typography
                className={classes.userType}
                variant="caption"
                color="primary"
              >
                {userType ?? "Admin"}
              </Typography>
            </div>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerState}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem component={Link} to="/home" button>
              <ListItemIcon className={classes.navIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/all-appointments" button>
              <ListItemIcon className={classes.navIcon}>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText primary="Channeling Management" />
            </ListItem>
            <ListItem component={Link} to="/all-emp-payment" button>
              <ListItemIcon className={classes.navIcon}>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Finance Management" />
            </ListItem>
            <ListItem component={Link} to="/all-reports" button>
              <ListItemIcon className={classes.navIcon}>
                <YoutubeSearchedForIcon />
              </ListItemIcon>
              <ListItemText primary="Laboratory Management" />
            </ListItem>
            <ListItem component={Link} to="/all-inventory" button>
              <ListItemIcon className={classes.navIcon}>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory Management" />
            </ListItem>
            {userType == "admin" ? (
              <ListItem component={Link} to="/all-employees" button>
                <ListItemIcon className={classes.navIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employee Management" />
              </ListItem>
            ) : (
              <></>
            )}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon className={classes.navIcon}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Abouts Us" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.navIcon}>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help Page" />
            </ListItem>
          </List>
          <div className={classes.bottomPush}>
            <Typography
              variant="caption"
              color="inherit"
              align="right"
              className={classes.footer}
            >
              © 2021 24Seven.com. All rights reserved.
            </Typography>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
