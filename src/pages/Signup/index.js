// React
import React from "react";

// Components
import SignUpForm from "../../components/SignUpForm";

// Animations
import Flip from "react-reveal";

const SignUp = () => {
  return (
    <Flip right>
        <SignUpForm/>
    </Flip>
  );
};

export default SignUp;