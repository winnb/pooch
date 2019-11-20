import React from "react";
import Card from "../Card/index";

import fire from "../../config/Fire";

import { Link }  from  "@reach/router";


import "./styles.scss";

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
    
        this.state = {
          email: "",
          password: "",
          confirmPassword: ""
        };
      }

      signup(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
           fire
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch(error => {
            console.log(error.message);
            document.querySelector("#error-message-signup").style.display = "block";
            document.getElementById("error-message-signup").innerHTML =
              error.message;
          }); 
          // If successful, then login
          fire
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .catch(error => {
            console.log(error.message);
            document.querySelector("#error-message-login").style.display = "block";
            document.getElementById("error-message-login").innerHTML =
              error.message;
          });
          //document.getElementsByClassName("signupForm")[0].innerHTML = null;
          setTimeout(() => {
            window.location.replace("/");  
          }, 1900);
        }
        else {
            document.querySelector("#error-message-signup").style.display = "block";
            document.getElementById("error-message-signup").innerHTML = "Passwords do not match";
        }
      }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        return(
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

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Confirm Password
                  </span>
                </div>
                <input
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon1"
                />
              </div>  

              <button
                type="submit"
                onClick={this.signup}
                className="btn btn-primary mr-4"
              >
                Create Account
              </button>

              <Link className="mr-3" to="/">Go Back</Link>
              

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
            </div>
        )
    }
}

export default SignUpForm;