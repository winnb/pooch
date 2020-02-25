// React
import React from "react";

// Firebase
import fire from "../../config/Fire";

import "./styles.scss";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
       fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        document.querySelector("#error-message-signup").style.display = "block";
        document.getElementById("error-message-signup").innerHTML = error.message;
      }); 
      // If successful, then login
      setTimeout(() => {
        fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        document.querySelector("#error-message-login").style.display = "block";
        document.getElementById("error-message-login").innerHTML = error.message;
      });
      }, 500);
      setTimeout(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                document.getElementById("login-outer").className = "collapse";
                window.location.replace("/profile"); 
            } else {
                console.log("Error: User could not be logged in due to bad credentials");
            }
        });
    }, 500);
    }
    else {
        document.querySelector("#error-message-signup").style.display = "block";
        document.getElementById("error-message-signup").innerHTML = "Passwords do not match";
    }
  }

  closeSignup() {
    document.getElementById("signup-outer").className = "collapse"
  }

  render() {
    return (
      <div id="signup-outer" className="collapse">
          <div className="col profile-box py-4">
              <div id="signup-form">
                <span className="trak_body row my-2">
                    <div className="trak_nav-item">Create an Account</div>
                </span>
                <span className="trak_body row my-2">
                    <input name="email" id="signup-email" type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                </span>
                <span className="trak_body row my-2">
                    <input name="password" id="signup-password" type="password" className="form-control" placeholder="Password" maxlength="50" value={this.state.password} onChange={this.handleChange}/>
                </span>
                <span className="trak_body row my-2">
                    <input name="confirmPassword" id="signup-password-confirm" type="password" className="form-control" placeholder="Confirm Password" maxlength="50" value={this.state.confirmPassword} onChange={this.handleChange}/>
                </span>
              </div>
               <button type="submit" onClick={this.signup} className="btn btn-secondary my-2">Create Account</button>
               <div className="trak_body-small my-2">
                  <button id="close-button" className="mx-3" onClick={this.closeSignup}>Not what you wanted? Click here to close</button>
                  <div id="error-message-signup" className="trak_body-small"></div>
               </div>
          </div>
      </div>
    );
  }
}

export default SignUpForm;
