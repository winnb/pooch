// React
import React from "react";

// Components
import SignUpForm from "../../components/SignUpForm";

// Animations
import Flip from "react-reveal";

const SignUp = () => {
  return (
    <div>
        <Flip right>
          <SignUpForm/>
        </Flip>
      
    </div>
  );
};

export default SignUp;
