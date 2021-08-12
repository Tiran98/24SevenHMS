import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import { Toolbar } from '@material-ui/core';
import AddEmployee from './components/EmployeeManagement/AddEmployee';

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
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 8,
  });

  const [drawerState, setDrawerState] = React.useState(false);
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar setDrawerState={setDrawerState} drawerState={drawerState} />
        <Switch>
          <div className={classes.content} style={{ marginLeft: drawerWidth * drawerState }}>
            <Toolbar />
            {/* <Route path="/" exact component={LandingPage} /> */}
            <Route path="/add-employee" exact component={AddEmployee} />
            {/* <Route exact path="/register">
                <Registration 
                  setDrawerState={setDrawerState}
                />
            </Route> */}
          </div>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
