import React from "react";
import Card from "../Card/index";


import "../SignUp/styles.scss";

class SignUp extends React.Component{
    render(){
        return(
            <div>
                    <div>
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
                                    //   value={this.state.email}
                                    //   onChange={this.handleChange}
                                    //   name="email"
                                    //   type="email"
                                    //   className="form-control"
                                    //   placeholder="Email"
                                    //   aria-label="Email"
                                    //   aria-describedby="basic-addon1"
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        Password
                                    </span>
                                    </div>
                                    <input
                                    //   value={this.state.password}
                                    //   onChange={this.handleChange}
                                    //   name="password"
                                    //   type="password"
                                    //   className="form-control"
                                    //   placeholder="Password"
                                    //   aria-label="Password"
                                    //   aria-describedby="basic-addon1"
                                    />
                                </div>
                                {/* <button
                                    type="submit"
                                    onClick={this.login}
                                    className="btn btn-primary mr-4"
                                >
                                    Login
                                </button> */}
                                <button
                                    type="submit"
                                    //onClick={this.signup}
                                    onClick = {(e)=> this.setState({isOpen: true})}
                                    className="btn btn-secondary mr-4"
                                >
                                    Sign Up
                                </button>

                                {/* <button
                                    type="submit"
                                    onClick={this.googleLogin}
                                    className="btn btn-social btn-google mr-4"
                                >
                                    <span className="fa fa-google" />
                                    Login with Google
                                </button> */}

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
                  
            </div>
            
        )
    }
}

export default SignUp;