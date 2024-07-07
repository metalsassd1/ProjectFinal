import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContactForm from './Email';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#1a2a4f',
      paper: '#2c3e75',
    },
    text: {
      primary: '#ffffff',
      secondary: '#f4f4f9',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#45a049',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#f4f4f9',
          },
          '& label.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4a5d8f',
            },
            '&:hover fieldset': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
            '& input': {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
});

export default function RouteTheme() {
  return (
    <ThemeProvider theme={theme}>
      <ContactForm />
    </ThemeProvider>
  );
}