// React
import React from "react";

// Components
import LoginForm from "../../components/LoginForm";

// Animations
import Flip from "react-reveal";

const Login = () => {
  return (
    <Flip right>
        <LoginForm/>
    </Flip>
  );
};

export default Login;