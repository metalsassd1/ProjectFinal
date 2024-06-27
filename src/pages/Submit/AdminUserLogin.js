import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box,Paper  } from '@mui/material';
import Swal from 'sweetalert2';

const styles = {
    container: {
      backgroundColor: '#f0fff0', // Light Green
      padding: '20px',
      borderRadius: '10px',
    },
    banner: {
      backgroundColor: '#228b22', // Forest Green
      color: 'white',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '10px',
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#228b22', 
        },
        '&:hover fieldset': {
          borderColor: '#32cd32', 
        },
      },
    },
    button: {
      backgroundColor: '#228b22', 
      '&:hover': {
        backgroundColor: '#32cd32', 
      },
    }
  };

const AdminUserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://back-end-finals-project-pgow.onrender.com/api/admin/login', {
        username,
        password
      });

      if (response.data.success) {
        // Store the token in localStorage or in a secure cookie
        localStorage.setItem('adminToken', response.data.token);

        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          // Redirect to admin dashboard or desired page
          navigate('/admin-dashboard');
        });
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: error.response?.data?.message || 'กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main"  maxWidth={false} // Allow the container to take full width
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', // Center horizontally
      alignItems: 'center',    // Center vertically
      minHeight: '100vh',     // Ensure vertical centering even with short content
    }}>
         <Paper elevation={3} style={styles.container}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box style={styles.banner}>
        <Typography component="h1" variant="h5">
          เข้าสู่ระบบสำหรับผู้ดูแลระบบ
        </Typography>
        </Box>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 , display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
          <TextField
            margin="normal"
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
            margin="normal"
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
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </Button>
        </Box>
      </Box>
      </Paper>
    </Container>
  );
};

export default AdminUserLogin;