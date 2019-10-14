import React from "react";
import WalkerForm from "../../components/WalkerForm";

// Styles
import "./styles.scss";

class DogWalking extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <div className="trak_heading-medium mb-5">Local Dog Walkers</div>
        <WalkerForm />
      </div>
    );
  }
}

export default DogWalking;