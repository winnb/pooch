import React from "react";

// Components
import Button from "../Button";
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../PetForm/styles.scss";

class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      breed: "",
      color: "",
      dateOfBirth: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addPet = this.addPet.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // Show loading icon for 2 seconds while grid loads
    document.getElementById("loader").style.display = "block";
    document.getElementById("result-table").style.display = "none";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result-table").style.display = "block";
    }, 2000);
    const db = Fire.firestore();

    // Get dogs from Firebase
    db.collection("pets")
      .orderBy("name")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderPets(doc);
        });
      });

      // Create a grid to store meetup data
    const grid = document.querySelector("#pet-grid");
    function renderPets(doc) {
      // create a list to style the data
      let li = document.createElement("tr");
      let name = document.createElement("td");
      let gender = document.createElement("td");
      let breed = document.createElement("td");
      let color = document.createElement("td");
      let dateOfBirth = document.createElement("td");
      

      li.setAttribute("data-id", doc.id);

      // Update local state to database contents
      name.textContent = doc.data().name;
      gender.textContent = doc.data().gender;
      breed.textContent = doc.data().breed;
      color.textContent = doc.data().color;
      dateOfBirth.textContent = doc.data().dateOfBirth;

      // Add all contents to the list
      li.appendChild(name);
      li.appendChild(gender);
      li.appendChild(breed);
      li.appendChild(color);
      li.appendChild(dateOfBirth);

      // Add list to grid
      grid.appendChild(li);
    }
  }

  addPet = e => {
    //Pop-up Confirmation message
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);

    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("pets").add({
      name: this.state.name,
      gender: this.state.gender,
      breed: this.state.breed,
      color: this.state.color,
      dateOfBirth: this.state.dateOfBirth
    });

    // Reset state
    this.setState({
      name: "",
      gender: "",
      breed: "",
      color: "",
      dateOfBirth: ""
    });

  };

  render() {
    return (
      <div className="mt-6 ml-5 input-group-prepend">
        <form onSubmit={this.addPet}>
        <div className="trak_heading-medium">Your Pets</div>
          <div id="loader" className="mb-4">
            <Loader
              type="Grid"
              // type="MutatingDots"
              color="black"
              height={75}
              width={75}
              // timeout={3000} //3 secs
            />
          </div>
          {/* Render contents of database */}
          <div id="result-table">
            <table className="table mt-4 text-left">
              <thead className="thead-light trak_heading-small">
                <tr>
                  <th scope="col">Pet Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Color</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="pet-grid"></tbody>
            </table>
          </div>
          <div id = "success-message">
                Pet Successfully Added 
          </div>
          <div className="trak_heading-medium mt-7 mb-3" id="space">Got more pups? Add them below!</div>
            <div>
            {/* Name */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Pet Name
              </span>
            <input
              name="name"
              type="text"
              title="Pet Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Gender */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Gender
              </span>
            <input
              name="gender"
              type="text"
              maxLength="1"
              placeholder="i.e. M/F"
              title="gender"
              value={this.state.gender}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Breed */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Breed
              </span>
            <input
              name="breed"
              type="text"
              placeholder="i.e. Golden Doodle"
              title="breed"
              value={this.state.breed}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Color */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Color
              </span>
            <textarea
              name="color"
              type="text"
              placeholder="i.e. Black with white spots"
              title="color"
              value={this.state.color}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Date of Birth */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Date of Birth
              </span>
            <input
              name="dateOfBirth"
              type="date"
              title="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mt-2 mb-5">
            {/* Submit Button */}
            <Button
              buttonType="submit"
              buttonText="Submit"
              buttonStyle="btn-primary ml-5"
              buttonTitle="Submit"
            />
            </div>
        </form>
      </div>
    );
  }
}

export default PetForm;
