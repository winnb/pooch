import React from "react";

// Components
import Button from "../Button";
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../BoardingForm/styles.scss";

class BoardingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      dailyRate: "",
      address: "",
      city: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addBoarder = this.addBoarder.bind(this);
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

    // Get boarders from Firebase
    db.collection("boarders")
      .orderBy("city")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderBoarders(doc);
        });
      });

      // Create a grid to store meetup data
    const grid = document.querySelector("#boarder-grid");
    function renderBoarders(doc) {
      // create a list to style the data
      let li = document.createElement("tr");
      let name = document.createElement("td");
      let phone = document.createElement("td");
      let dailyRate = document.createElement("td");
      let address = document.createElement("td");
      let city = document.createElement("td");

      li.setAttribute("data-id", doc.id);

      // Update local state to database contents
      name.textContent = doc.data().name;
      phone.textContent = doc.data().phone;
      dailyRate.textContent = doc.data().dailyRate;
      address.textContent = doc.data().address;
      city.textContent = doc.data().city;

      // Add all contents to the list
      li.appendChild(name);
      li.appendChild(phone);
      li.appendChild(dailyRate);
      li.appendChild(address);
      li.appendChild(city);

      // Add list to grid
      grid.appendChild(li);
    }
  }

  addBoarder = e => {
    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("boarders").add({
      name: this.state.name,
      phone: this.state.phone,
      dailyRate: this.state.dailyRate,
      address: this.state.address,
      city: this.state.city
    });

    // Reset state
    this.setState({
      name: "",
      phone: "",
      dailyRate: "",
      address: "",
      city: ""
    });

    //Boarder Recorded Pop-up
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);
  };

  render() {
    return (
      <div className=" ml-5 input-group-prepend">
        <form onSubmit={this.addBoarder}>
        <div className="trak_heading-medium">Local Dog Boarders</div>
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
            <table className="table mt-4 text-left trak_body">
              <thead className="thead-light trak_heading-small">
                {/* change color */}
                <tr>
                  <th scope="col">Boarding Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Daily Rate</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody id="boarder-grid"></tbody>
            </table>
          </div>
          <div id = "success-message">
                Form Successfully Submitted 
          </div>
          <div className="trak_heading-medium mt-5 mb-3" id = "space">Get Started as a Verified Dog Boarder</div>
            <div>
            {/* Name */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Boarder Name
              </span>
            <input
              name="name"
              type="text"
              title="Boarder Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Phone */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Phone Number
              </span>
            <input
              name="phone"
              type="number"
              maxLength="10"
              placeholder="i.e. 5551234567"
              title="Boarder Phone"
              value={this.state.phone}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Daily Rate */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Daily Rate
              </span>
            <input
              name="dailyRate"
              type="number"
              placeholder="i.e. 150"
              title="Boarder Rate"
              value={this.state.dailyRate}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Address */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Address
              </span>
            <textarea
              name="address"
              type="text"
              placeholder="i.e. 2000 Los Coyotes Diagonal"
              title="Boarder Address"
              value={this.state.address}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* City */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                City
              </span>
            <textarea
              name="city"
              type="text"
              placeholder="i.e. Long Beach"
              title="Boarder City"
              value={this.state.city}
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

export default BoardingForm;
