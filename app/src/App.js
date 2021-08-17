import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import { Toolbar } from '@material-ui/core';
import AddEmployee from './components/EmployeeManagement/AddEmployee';
import AllEmployees from './components/EmployeeManagement/AllEmployees';
import AddEmpPayment from './components/EmpPaymentManagement/AddEmpPayment';
import AdminLogin from './components/UserAuth/AdminLogin';
import EmployeeLogin from './components/UserAuth/EmployeeLogin';
import AddReport from './components/LabManagement/AddReport';
import AllReports from './components/LabManagement/AllReports';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

function App() {
  const theme = createTheme({
    palette: {
        primary: {
            main: '#90E0EF',
        },
        secondary: {
            light: '#0066ff',
            main: '#0077B6',
            contrastText: '#000000',
        },
        info: {
          main: '#FFFFFF',
        },
        error: {
          main: '#ff4040',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 8,
  });

  const [drawerState, setDrawerState] = React.useState(false);
  const [pathName, setPathName] = React.useState("");
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {pathName != "/admin" &&  pathName != "/login"? 
          <Navbar setDrawerState={setDrawerState} drawerState={drawerState} /> :
          <></>}
        <Switch>
          <div className={classes.content} style={{ marginLeft: drawerWidth * drawerState }}>
            <Toolbar />
            {/* <Route path="/" exact component={LandingPage} /> */}
            <Route path="/add-employee" exact component={AddEmployee} />
            <Route path="/all-employees" exact component={AllEmployees} />
            <Route path="/add-report" exact component={AddReport} />
            <Route path="/all-reports" exact component={AllReports} />
            <Route path="/add-emp-payment" exact component={AddEmpPayment} />
            <Route exact path="/admin">
                <AdminLogin 
                  setDrawerState={setDrawerState}
                  setPathName={setPathName}
                />
            </Route>
            <Route exact path="/login">
                <EmployeeLogin 
                  setPathName={setPathName}
                />
            </Route>
          </div>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
