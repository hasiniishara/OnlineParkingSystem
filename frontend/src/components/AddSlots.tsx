import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import  useAddParkingSlot from '../hooks/useAddParkingSlot';

export default function AddSlots() {
  const { addParkingSlot, loading, error, success } = useAddParkingSlot();
  const [location, setLocation] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddSlot = async () => {
    await addParkingSlot(location);
    setOpenSnackbar(true);
    setLocation('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 , mt:20}}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Parking Slot
        </Typography>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSlot}
          disabled={loading || !location}
          sx={{ mr: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Slot'}
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={success || error}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Box>
    </Container>
  );
};
