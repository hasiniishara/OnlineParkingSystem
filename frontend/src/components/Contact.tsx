import {
  Container,
  Box,
  Typography,
  Grid,
  CssBaseline,
} from '@mui/material';


export default function Contact() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{ mt: 12, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
        We'd love to hear from you! Reach out to us through any of the following ways:
        </Typography>
            <Typography variant="body1" paragraph>
              - Email: parkme@gmail.com
            </Typography>
            <Typography variant="body1" paragraph>
              - Phone Number: +94712948866
            </Typography>
            <Typography variant="body1" paragraph>
              - Location:
            </Typography>
        <Typography variant="body1" paragraph>
          Our team is dedicated to making urban parking more accessible and convenient. We leverage the latest technology to ensure that you can find parking spots quickly and effortlessly. Join the ParkMe! community today and take the hassle out of parking!
        </Typography>
      </Box>
    </Container>
  )
}

