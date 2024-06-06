import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLoginUser from "../hooks/useLoginUser";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error } = useLoginUser();
  

  const handleLogin = async (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    loginUser(username, password);
    
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {error && <p style={{color:'red'}}>{error}</p>}
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/signup">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};