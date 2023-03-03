import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Main from "./components/Main/Main";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { useEffect } from "react";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const handleSignIn1 = (data) => {
    setUserData(data);
  };
  const [allContact, setAllContact] = useState();
  useEffect(() => {
    setAllContact(JSON.parse(localStorage.getItem("allContacts"))?.result);
  }, [userData]);

  console.log(allContact, "hihoii");
  return (
    <>
      <Router>
        <Container maxWidth="xl">
          <NavBar />
          <Switch>
            <Route
              path="/signin"
              exact
              component={() => (
                <SignIn
                  userData={userData}
                  setUserData={setUserData}
                  handleSignIn1={handleSignIn1}
                />
              )}
            />
          </Switch>
          {userData ? <Main allContact={allContact} /> : <LoadingScreen />}
        </Container>
      </Router>
    </>
  );
}

export default App;
