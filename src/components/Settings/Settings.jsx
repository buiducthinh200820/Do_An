import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout,clearRedirect } from "../../Store/slices/auth.slice";
import { updateUser } from "../../Store/actions/auth.action";

import { useNavigate } from "react-router-dom";
function SettingsPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/register");
    }
  }, []);

  const { user, redirectUrl } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image: user?.image || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    password: "",
  });
  useEffect(
    () =>
      setFormData({
        image: user?.image || "",
        username: user?.username || "",
        email: user?.email || "",
        bio: user?.bio || "",
        password: "",
      }),
    [user]
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/home");
  };
  useEffect(() => {
    if (redirectUrl) {
      navigate(redirectUrl);
      dispatch(clearRedirect());
    }
  }, [redirectUrl, navigate, dispatch]);
  return (
    <Container maxWidth="md" sx={{ mt: 5 }} style={{ marginBottom: "100px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
            Your Settings
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL of profile picture"
                  variant="outlined"
                  name="image"
                  value={formData.image}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  minRows={5}
                  maxRows={10}
                  aria-label="Bio"
                  placeholder="Short bio about you"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInput}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3 }}
            >
              Update Settings
            </Button>
          </form>

          <Divider style={{ margin: "16px 0" }} />

          <Button variant="outlined" color="error" onClick={handleLogout}>
            Or click here to logout.
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SettingsPage;
