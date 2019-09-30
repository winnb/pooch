import React from "react";

const Button = props => {
  return (
    <div>
      <button type={props.buttonType} className={`btn ${props.buttonStyle}`}>
        {props.buttonTitle}
      </button>
    </div>
  );
};

export default Button;
