import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
//import { Button } from "react-bootstrap";
import { fetchUser } from "../../Store/actions/auth.action";
import { loginSuccess } from "../../Store/slices/auth.slice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
  
  const [formData, setFormData] = useState({});
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // Kiểm tra xem loginSuccess đã được kích hoạt sau khi đăng nhập thành công
    if (user) {
     
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Kiểm tra xem có lỗi nào xảy ra sau khi gọi API đăng nhập
    if (error) {
      toast.error("Login failed! Email or password is incorrect.");
    }
  }, [error]);

  const handleChange = (e) =>{
    const{name, value} = e.target;
    setFormData({...formData, [name]: value});
}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUser(formData));
  };

  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                inputProps={{
                  maxLength: 50, 
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Grid container justifyContent="flex-end">
                
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default Login;
