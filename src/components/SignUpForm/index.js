// React
import React from "react";
import { Link }  from  "@reach/router";

// Firebase
import fire from "../../config/Fire";

import "./styles.scss";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault();
    if (document.getElementById("signup-password").value === document.getElementById("signup-password-confirm").value) {
       fire
      .auth()
      .createUserWithEmailAndPassword(document.getElementById("signup-email").value, document.getElementById("signup-password").value)
      .catch(error => {
        console.log(error.message);
        document.querySelector("#error-message-signup").style.display = "block";
        document.getElementById("error-message-signup").innerHTML = error.message;
      }); 
      // If successful, then login
      setTimeout(() => {
        fire
      .auth()
      .signInWithEmailAndPassword(document.getElementById("signup-email").value, document.getElementById("signup-password").value)
      .catch(error => {
        console.log(error.message);
        document.querySelector("#error-message-login").style.display = "block";
        document.getElementById("error-message-login").innerHTML = error.message;
      });
      }, 500);
      setTimeout(() => {
        document.getElementById("signup-outer").className = "collapse";
        window.location.replace("/profile");  
      }, 1000);
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
                    <input id="signup-email" type="text" className="form-control" placeholder="Email"/>
                </span>
                <span className="trak_body row my-2">
                    <input id="signup-password" type="password" className="form-control" placeholder="Password" maxlength="50"/>
                </span>
                <span className="trak_body row my-2">
                    <input id="signup-password-confirm" type="password" className="form-control" placeholder="Confirm Password" maxlength="50"/>
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
