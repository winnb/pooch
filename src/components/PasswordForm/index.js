// React
import React from "react";
import { Link }  from  "@reach/router";

// Firebase
import Fire from "../../config/Fire";

// Components
import Button from "../Button";
import Card from "../../components/Card/";

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
    let email = document.getElementsByTagName("input")[0].value;
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

  render() {
    return (
      <div className="mt-6 mx-6">
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
                <small id="emailHelp" className="form-text text-muted">
                Type in your email and click submit to recover your password
                </small>
                <div className="trak_body-small mt-2">
                    <Link className="mt-5" to="/">Not what you wanted? Go back to Login</Link>
                </div>
                <div className="submitButton trak_body-medium mt-3" onClick={this.sendEmail}>
                    <Button
                        type="submit"
                        buttonStyle="btn-primary"
                        buttonText="Send"
                        buttonTitle="Send"
                    ></Button>
                </div> 
            </div>
         }
        />
      </div>
    ); 
  }
};

export default PasswordForm;
