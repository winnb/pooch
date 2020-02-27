import React from "react";
import WalkerForm from "../../components/WalkerForm"; // Inner Component
import "./styles.scss"; // Styles
import Fade from "react-reveal"; // Animation

class DogWalking extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <Fade> <WalkerForm /> </Fade>
      </div>
    );
  }
}

export default DogWalking;