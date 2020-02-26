import React from "react";
import Fire from "../../config/Fire"; // Firebase
import "./styles.scss"; // Styles

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentPassword: "",
      newPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendEmail(e) {
    e.preventDefault();
    let email = document.getElementById("change-password-email").value;
    if (email !== "")
    {
      Fire.auth().sendPasswordResetEmail(email).then(function() {
        window.alert("Email sent. Please check your inbox for the reset link");
      }).catch(function(error) {
        window.alert("Error: Password could not be changed");
      });
    }
    else {
      window.alert("Please enter an email first");
    }
  }

  closeChangePassword() {
    document.getElementById("change-password-outer").className = "collapse"
  }

  render() {
    return (
      <div id="change-password-outer" className="collapse">
          <div className="col profile-box py-4">
              <div id="change-password-form">
                <span className="trak_body row my-2">
                    <div className="trak_nav-item">Recover Password with Email</div>
                </span>
                <span className="trak_body row my-2">
                    <input name="email" id="change-password-email" type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                </span>
              </div>
               <button type="submit" onClick={this.sendEmail} className="btn btn-secondary my-2">Send Email</button>
               <div className="trak_body-small my-2">
                  <button id="close-button" className="mx-3" onClick={this.closeChangePassword}>Not what you wanted? Click here to close</button>
                  <div id="error-message-password" className="trak_body-small"></div>
               </div>
          </div>
      </div>
    ); 
  }
};

export default PasswordForm;
