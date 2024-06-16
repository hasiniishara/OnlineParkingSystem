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
  import pro1 from '../images/profile1.png';
  
  
  export default function ParkingSlots() {
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
                      to="/signup"
                      sx={{ mr: 2 }}
                    >
                      Book a parking slot
                    </Button> 
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      );
  }
  
  
  