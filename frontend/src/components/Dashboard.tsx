import {
  Container,
  Box,
  Grid,
  Button,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';
import pro1 from '../images/profile1.png';
import slot1 from '../images/book1.jpeg';
import add1 from '../images/book2.jpeg';
import { useAuth } from '../context/AuthContext';


export default function Dashboard() {
  const { userRole } = useAuth();
  return (
    <Container maxWidth="lg">
    <CssBaseline />
    <Box sx={{ mt: 20, mb: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image={pro1}
              alt="Profile1"
              style={{ width: '150px', height: '150px' }}
            />
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/profile"
                sx={{ mr: 2 }}
              >
                User Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image={slot1}
              alt="ParkingSlot1"
              style={{ width: '155px', height: '155px' }}
            />
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/parkingslots"
                sx={{ mr: 2 }}
              >
                Book a parking slot
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {userRole === 'Admin' && (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={add1}
                alt="AddParking1"
                style={{ width: '155px', height: '155px' }}
              />
              <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button
                  variant="contained"
                color="primary"
                component={Link}
                to="/addslots"
                sx={{ mr: 2 }}
              >
                Add parking slots
              </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  </Container>
    );
}


