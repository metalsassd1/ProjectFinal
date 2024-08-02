import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, ThemeProvider, createTheme } from '@mui/material';
import Swal from 'sweetalert2';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep Blue
    },
    secondary: {
      main: '#3f51b5', // Indigo
    },
    background: {
      default: '#e8eaf6', // Light Indigo
    },
  },
});

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  banner: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  button: {
    marginTop: '20px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
};

const AdminUserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const data = new URLSearchParams(location.search).get('data');
  const borrowData = JSON.parse(decodeURIComponent(data));
  const navigate = useNavigate();

  const checkBorrowStatus = async (id) => {
    try {
      const response = await axios.get(`https://back-end-finals-project-vibo.onrender.com/api/Borrowed/loan/${id}`);
      return response.data.loan_status;
    } catch (error) {
      console.error('Error checking borrow status:', error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('https://back-end-finals-project-vibo.onrender.com/api/user/table');

      if (response.data) {
        const users = response.data;
        const user = users.find(u => u.username === username && u.password === password && u.is_admin === 1);
        
        if (user) {
          // ตรวจสอบสถานะการยืม
          const borrowStatus = await checkBorrowStatus(borrowData.id);
          
          if (borrowStatus === "ยืม") {
            Swal.fire({
              title: 'ไม่สามารถอนุมัติได้',
              text: 'รายการนี้ได้รับการอนุมัติไปแล้ว',
              icon: 'error',
              confirmButtonText: 'ตกลง'
            });
            return;
          }

          localStorage.setItem('adminToken', user.token);

          Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ!',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          }).then(() => {
            navigate(`/submit/?data=${encodeURIComponent(JSON.stringify({ borrowData, user }))}`);
          });
        } else {
          throw new Error('กรุณาตรวจสอบชื่อผู้ใช้ รหัสผ่าน และสถานะ');
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: error.message || 'เข้าสู่ระบบไม่สำเร็จ',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}>
        <Paper elevation={3} style={styles.container}>
          <Box style={styles.banner}>
            <Typography component="h1" variant="h5">
              เข้าสู่ระบบสำหรับผู้ดูแลระบบ
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleLogin} noValidate sx={styles.form}>
            <TextField
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.textField}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.textField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AdminUserLogin;