import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer(): React.ReactElement {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        bottom: 0,
        bgcolor: 'background.paper',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="textSecondary" align="center">
          © {new Date().getFullYear()} ParkMe! || All Rights Reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link color="inherit" href="https://yourcompany.com/">
            ParkMe!
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
