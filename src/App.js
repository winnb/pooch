import React from "react";
import "./scss/main.scss";

//Navigation
import NavBar from "./components/NavBar";

// Router
import { Router } from "@reach/router";

//Firebase
import fire from "./config/Fire";

// Pages
import Login from "../src/pages/Login/";
import Home from "./pages/Home";
import YourPets from "./pages/YourPets";
import DogWalking from "./pages/DogWalking";
import DogBoarding from "./pages/DogBoarding";
import DogMeetup from "./pages/DogMeetup";
import DogServices from "./pages/DogServices";
import DogRecords from "./pages/DogRecords";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "../../PoOch/src/pages/SignUp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <NavBar />
            <Router>
              <Home path="/" />
              <YourPets path="/your-pets" />
              <DogWalking path="/dog-walking" />
              <DogBoarding path="/dog-boarding" />
              <DogMeetup path="/dog-meetup" />
              <DogServices path="/dog-services" />
              <DogRecords path="/dog-records" />
              <PageNotFound path="/page-not-found" default />
            </Router>
          </div>
        ) : (
          <div>
            <Router>
              <Login path="/" />
              <SignUp path="/sign-up" />
              <PageNotFound path="/page-not-found" default />
            </Router>
          </div>
        )}
      </div>
    );
  }
}

export default App;
