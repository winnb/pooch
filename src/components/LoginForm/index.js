// React
import React from "react";
import { Link }  from  "@reach/router";

// Firebase
import fire, {googleProvider} from "../../config/Fire";

import "./styles.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(document.getElementById("login-email").value, document.getElementById("login-password").value)
      .catch(error => {
        console.log(error.message);
        document.querySelector("#error-message-login").style.display = "block";
        document.getElementById("error-message-login").innerHTML =
          error.message;
      });
    //   setTimeout(() => {
    //      window.location.replace("/profile"); 
    //   }, 500);
  }

  googleLogin(e) {
    e.preventDefault();
    fire.auth().signInWithPopup(googleProvider);
    // setTimeout(() => {
    //     window.location.replace("/profile"); 
    //  }, 500);
  }

  closeLogin() {
    document.getElementById("login-outer").className = "collapse"
  }

  render() {
    return (
      <div id="login-outer" className="collapse.show">
          <div className="col profile-box py-4">
              <div id="login-form">
                <span className="trak_body row my-2">
                    <div className="trak_nav-item">Login to your Account</div>
                </span>
                <span className="trak_body row my-2">
                    <input id="login-email" type="text" className="form-control" placeholder="Email"/>
                </span>
                <span className="trak_body row my-2">
                    <input id="login-password" type="password" className="form-control" placeholder="Password" maxlength="50"/>
                </span>
              </div>
               <button type="submit" onClick={this.login} className="btn btn-secondary my-2 mx-2">Login</button>
               <button type="submit" onClick={this.googleLogin} className="btn btn-danger my-2 mx-2">Login with Google</button>
               <div className="trak_body-small my-2">
                  <button id="close-button" className="mx-3" onClick={this.closeLogin}>Not what you wanted? Click here to close</button>
                  <div id="error-message-login" className="trak_body-small"></div>
               </div>
          </div>
      </div>
    );
  }
}

export default LoginForm;
