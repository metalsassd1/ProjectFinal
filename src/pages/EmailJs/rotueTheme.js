import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import ContactForm from './Email';

const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#ffffff',
      },
      // ถ้าต้องการกำหนดสีอื่นๆ
    },
    typography: {
      // กำหนด font ที่ต้องการใช้
    },
    components: {
      // Override สไตล์ของ components เฉพาะที่ต้องการ
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#ffffff', // ตัวอักษรปุ่มเป็นสีขาว
            '&:hover': {
              backgroundColor: '#45a049', // เมื่อ hover จะเปลี่ยนเป็นสีเขียวที่อ่อนกว่า
            },
          },
        },
      },
      // สามารถทำเช่นเดียวกันกับ TextField, Checkbox หรือ components อื่นๆ
    },
  });

export default function routeTheme() {
  return (
    <ThemeProvider theme={theme}>
      <ContactForm />
    </ThemeProvider>
  );
}
