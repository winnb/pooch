import React from "react";
import WalkerForm from "../../components/WalkerForm";

// Styles
import "./styles.scss";

class DogWalking extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <WalkerForm />
      </div>
    );
  }
}

export default DogWalking;