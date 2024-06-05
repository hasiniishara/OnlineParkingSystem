import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Sign In', path: '/signin' },
  { label: 'Sign Up', path: '/signup' }
];

export default function Navbar() {

  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            ParkMe!
          </Typography>
          <Box>
            {isAuthenticated? (
              <Button sx={{ color: '#fff' }} onClick={handleLogout}>
              Logout
              </Button>
            ) : (
              navItems.map((item) => (
                <Button key={item.label} sx={{ color: '#fff' }} component={Link} to={item.path}>
                  {item.label}
                </Button>
              ))
            )}
            
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
