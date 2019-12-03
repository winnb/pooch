// React
import React from "react";

// Components
import PasswordForm from "../../components/PasswordForm";

// Animations
import Flip from "react-reveal";

const ChangePassword = () => {
  return (
    <div>
        <Flip right>
          <PasswordForm/>
        </Flip>
    </div>
  );
};

export default ChangePassword;
