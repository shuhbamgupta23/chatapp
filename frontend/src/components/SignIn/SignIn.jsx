import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { signIn, signUp } from "../../actions/userAction";
import { getAllUser } from "../../actions/userAction";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignIn = ({ handleSignIn1}) => {
  const history = useHistory();
    const dispatch = useDispatch();

  const [isSignUp, setSignUp] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    setSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
    dispatch(getAllUser());
    setTimeout(()=>{
      handleSignIn1(JSON.parse(localStorage.getItem("userData")));
    },[100])
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: "1rem" }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form sx={{ width: "100%" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      type="text"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="lastName"
                      label="Last Name "
                      type="text"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              <Grid item xl={12} md={12} xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xl={12} md={12} xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>

              {isSignUp && (
                <Grid item xl={12} md={12} xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    required
                    type="password"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              sx={{ mt: "10px" }}
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {isSignUp ? "Sign up" : "Sign In"}
            </Button>
            <Button
              sx={{ mt: "10px" }}
              type="submit"
              variant="contained"
              fullWidth
            >
              Sign in with Google
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mt: "10px" }}>
              <Grid item>
                <Button onClick={handleSignIn}>
                  {isSignUp
                    ? "Already have an account Sign In"
                    : "Don't have an account ? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignIn;
