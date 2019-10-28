import React from "react";
import PetForm from "../../components/PetForm";

// Styles
//import "./styles.scss";

class YourPets extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <PetForm />
      </div>
    );
  }
}

export default YourPets;