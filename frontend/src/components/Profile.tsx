import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { useEffect } from "react";
import useFetchProfile from "../hooks/useFetchProfile";

export default function Profile() {
  const { profile, error, success, viewUser } = useFetchProfile();

  useEffect(() => {
    viewUser();
  }, []);

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
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <TextField
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={profile.firstname}
                />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                <TextField
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  autoFocus
                  value={profile.lastname}
                />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  value={profile.username}
                />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={profile.email}
                />
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
