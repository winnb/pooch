// React
import React from "react";
import { Link } from "@reach/router";

// Components
import Card from "../../components/Card/";

// Styles
import "./styles.scss";
import "../../scss/bootstrap-social.scss";

// Firebase
import fire, { googleProvider } from "../../config/Fire";

// Animations
import Slide from "react-reveal";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.googleLogin = this.googleLogin.bind(this);

    this.state = {
      email: "",
      password: "",
      isOpen: false
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error.message);
        document.querySelector("#error-message-login").style.display = "block";
        document.getElementById("error-message-login").innerHTML =
          error.message;
      });
      setTimeout(() => {
         window.location.replace("/"); 
      }, 750);
  }

  googleLogin(e) {
    e.preventDefault();
    fire.auth().signInWithPopup(googleProvider);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  myFunction() {
    var x = document.getElementById("show");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  render() {
    return (
      <div className="body mx-6 mt-7 mb-6">
        <Slide left>
          <Card
            cardTitle={<div className="trak_heading-xlarge">P O O C H</div>}
            cardContent={
              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Email
                    </span>
                  </div>
                  <input
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Password
                    </span>
                  </div>
                  <input
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="trak_body-small mb-3">
                  <Link className="mr-3" to="/change-password">
                    Can't remember your password?
                  </Link>
                  <Link className="ml-3" to="/signup">
                    Don't have an account?
                  </Link>
                </div>
                <button
                  type="submit"
                  onClick={this.login}
                  className="btn btn-primary mr-4"
                >
                  Login
                </button>
                <button
                  type="submit"
                  onClick={this.googleLogin}
                  className="btn btn-social btn-google mr-4"
                >
                  <span className="fa fa-google" />
                  Login with Google
                </button>

                <div
                  id="error-message-login"
                  className="trak_body-small mt-4"
                ></div>
                <div
                  id="error-message-signup"
                  className="trak_body-small mt-4"
                ></div>
              </div>
            }
          />
        </Slide>
      </div>
    );
  }
}

export default Login;
