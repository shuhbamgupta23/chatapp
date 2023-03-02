import React from "react";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import { useState } from "react";
import ModeCommentTwoToneIcon from "@mui/icons-material/ModeCommentTwoTone";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";


const NavBar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
    
  const handleSignOut = () => {
    dispatch({ type: "signOut" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, [location]);

  return (
    <AppBar
      position="static"
      sx={{
        margin: "30px 0",
        backgroundColor: "white",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        position: "relative",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Toolbar disableGutters>
          <ModeCommentTwoToneIcon sx={{ mr: 2 }} color="primary" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              letterSpacing: 2,
              textDecoration: "none",
              fontWeight: 600,
            }}
            color="primary"
          >
            Chat App
          </Typography>
        </Toolbar>
        <Toolbar sx={{ position: "absolute", right: "20px" }}>
          {user ? (
            <Toolbar>
              <Typography sx={{ color: "black", mr: "10px", fontWeight: 600 }}>
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 600 }}
                size="large"
                onClick={handleSignOut}
              >
                Log Out
              </Button>
            </Toolbar>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: 600 }}
              href="signin"
              size="large"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
