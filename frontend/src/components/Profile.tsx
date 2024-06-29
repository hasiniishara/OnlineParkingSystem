import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from "react";
import useFetchProfile from "../hooks/useFetchProfile";

export default function Profile() {
  const { profile, error, viewUser, updateUser } = useFetchProfile();
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await viewUser();
      setLoading(false);
    };
    fetchProfile();
  }, [viewUser]);

  useEffect(() => {
    if (profile && !editMode) {
      setFirstName(profile.firstname);
      setLastName(profile.lastname);
      setUserName(profile.username);
      setEmail(profile.email);
    }
  }, [profile, editMode]);

  const handleUpdate = (e: any) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = async () => {
    setOpenDialog(false);
    setLoading(true);
    try {
      const updatedProfile = { firstname, lastname, username, email };
      await updateUser(updatedProfile);
      console.log('Profile updated:', updatedProfile);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {profile && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setEditMode(true)}
              disabled={editMode}
            >
              Edit Profile
            </Button>
            {editMode && (
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleUpdate}
              >
                Update Profile
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to update your profile information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
