import {
  Container,
  Box,
  Typography,
  Grid,
  CssBaseline,
} from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{ mt: 12, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About ParkMe!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Your Solution for Hassle-Free Parking
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Welcome to ParkMe!, the innovative online platform that revolutionizes the way you find and book parking slots. Our mission is to provide a seamless and efficient parking experience for users by connecting them to available parking spaces in real-time. Whether you are commuting to work, going shopping, or attending an event, ParkMe! makes parking simple and stress-free.
        </Typography>
        <Typography variant="body1" paragraph>
          With ParkMe!, you can:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              - Check available parking slots in your desired location
            </Typography>
            <Typography variant="body1" paragraph>
              - Book parking slots in advance to save time
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              - Manage your bookings and parking history
            </Typography>
            <Typography variant="body1" paragraph>
              - Enjoy a user-friendly interface for a seamless experience
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph>
          Our team is dedicated to making urban parking more accessible and convenient. We leverage the latest technology to ensure that you can find parking spots quickly and effortlessly. Join the ParkMe! community today and take the hassle out of parking!
        </Typography>
      </Box>
    </Container>
  );
}
