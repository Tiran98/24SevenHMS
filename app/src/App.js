import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';

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

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
