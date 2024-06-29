import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useFetchParkingSlots from '../hooks/useFetchParkingSlots';
import useBookParkingSlot from '../hooks/useBookParkingSlot';
import useDeleteSlot from '../hooks/useDeleteSlot';
import { useAuth } from '../context/AuthContext';

export default function ParkingSlots() {
  const { userRole } = useAuth();
  const { slots, viewSlots, error, success } = useFetchParkingSlots();
  const { bookSlot, error: bookError, success: bookSuccess, loading } = useBookParkingSlot();
  const { deleteSlot, error: deleteError, success: deleteSuccess, deleteLoading } = useDeleteSlot();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletedDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [reservedBy, setReservedBy] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  useEffect(() => {
    viewSlots();
  }, []);

  useEffect(() => {
    if (bookSuccess) {
      setSnackbarMessage(bookSuccess);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (bookError) {
      setSnackbarMessage(bookError);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [bookSuccess, bookError]);

  const handleOpenDialog = (slotId: string) => {
    setSelectedSlotId(slotId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setVehicleNumber('');
    setReservedBy('');
    setReservationDate('');
    setReservationTime('');
  };

  const handleOpenDeleteDialog = (slotId: string) => {
    setSelectedSlotId(slotId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleBookSlot = async () => {
    if (selectedSlotId) {
      await bookSlot(selectedSlotId, vehicleNumber, reservedBy, reservationDate, reservationTime);
      viewSlots();
      handleCloseDialog();
    }
  };

  const handleDeleteSlot= async () => {
    if (selectedSlotId) {
      await deleteSlot(selectedSlotId);
      viewSlots();
      handleCloseDeleteDialog();
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 20, mb: 4 }}>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        {!slots.length && !error && !success && <CircularProgress />}
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {slots.map((slot) => (
            <Grid item xs={12} sm={6} md={4} key={slot._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {slot.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {slot.isOccupied ? 'Occupied' : 'Available'}
                  </Typography>
                  {userRole === 'Admin' && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle Number: {slot.vehicleNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reserved By: {slot.reservedBy}
                      </Typography>
                    </>
                  )}
                  {!slot.isOccupied && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(slot._id)}
                      sx={{ mt: 2 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Book'}
                    </Button>
                  )}
                  {userRole === 'Admin' && !slot.isOccupied &&(
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDeleteDialog(slot._id)}
                      sx={{ mt: 2, ml:2 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Delete'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Book Parking Slot</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Vehicle Number"
              type="text"
              fullWidth
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Reserved By"
              type="text"
              fullWidth
              value={reservedBy}
              onChange={(e) => setReservedBy(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Reservation Date"
              type="date"
              fullWidth
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Reservation Time"
              type="time"
              fullWidth
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleBookSlot} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Book'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deletedDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete a parking slot</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
                Are you sure to delete?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteSlot} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}