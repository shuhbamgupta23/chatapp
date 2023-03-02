import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Main from "./components/Main/Main";
import { useSelector } from "react-redux";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"))
  
  return (
    <>
      <Router>
        <Container maxWidth="xl">
          <NavBar />
          <Switch>
            <Route path="/signin" exact component={SignIn} />
          </Switch>
          {userData &&  <Main />}
        </Container>
      </Router>
    </>
  );
}

export default App;
