import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';

//import parkingImage from './parking.jpg';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Welcome to ParkMe!
        </Typography>
        <Typography variant="h6" component="p" align="center" gutterBottom>
          Your Ultimate Solution for Hassle-Free Parking
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                //image={parkingImage}
                alt="Parking"
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Real-Time Availability
                </Typography>
                <Typography variant="body1">
                  Check the availability of parking slots in real-time, so you never have to worry about finding a spot.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                //image={parkingImage}
                alt="Parking"
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Easy Booking
                </Typography>
                <Typography variant="body1">
                  Book your parking slot in advance and save time. No more driving around looking for a spot.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                //image={parkingImage}
                alt="Parking"
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Seamless Management
                </Typography>
                <Typography variant="body1">
                  Manage your bookings and parking history with our user-friendly interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            sx={{ mr: 2 }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/about"
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
