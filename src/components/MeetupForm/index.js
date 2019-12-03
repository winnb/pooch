import React from "react";

// Components
import Button from "../Button";
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../MeetupForm/styles.scss";

class MeetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: "",
      address: "",
      city: "",
      sta: "",
      zipcode: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMeetup = this.addMeetup.bind(this);
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

    // Get meetups from Firebase
    db.collection("meetups")
      .orderBy("zipcode")
      //.limit(3)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderMeetup(doc);
        });
      });

      // Create a grid to store meetup data
    const grid = document.querySelector("#meetup-grid");
    function renderMeetup(doc) {
      // create a list to style the data
      let li = document.createElement("tr");
      let timestamp = document.createElement("td");
      let address = document.createElement("td");
      let city = document.createElement("td");
      let sta = document.createElement("td");
      let zipcode = document.createElement("td");
      let description = document.createElement("td");

      li.setAttribute("data-id", doc.id);

      // Update local state to database contents
      timestamp.textContent = doc.data().timestamp;
      address.textContent = doc.data().address;
      city.textContent = doc.data().city;
      sta.textContent = doc.data().sta;
      zipcode.textContent = doc.data().zipcode;
      description.textContent = doc.data().description;

      // Add all contents to the list
      li.appendChild(timestamp);
      li.appendChild(address);
      li.appendChild(city);
      li.appendChild(sta);
      li.appendChild(zipcode);
      li.appendChild(description);

      // Add list to grid
      grid.appendChild(li);
    }
  }

  addMeetup = e => {
    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("meetups").add({
      timestamp: this.state.timestamp,
      address: this.state.address,
      city: this.state.city,
      sta: this.state.sta,
      zipcode: this.state.zipcode,
      description: this.state.description,
    });

    // Reset state
    this.setState({
      timestamp: "",
      address: "",
      city: "",
      sta: "",
      zipcode: "",
      description: ""
    });

    //Meetup Recorded Pop-up
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);
  };

  render() {
    return (
      <div className="ml-5 input-group-prepend">
        <form onSubmit={this.addMeetup}>
            <div className="mb-1">
            {/* Timestamp */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Date & Time
              </span>
            <input
              name="timestamp"
              type="datetime-local"
              title="Meetup Time"
              value={this.state.timestamp}
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
            <input
              name="address"
              type="text"
              maxLength="64"
              placeholder="i.e. 123 Ruff Way"
              title="Meetup Address"
              value={this.state.address}
              onChange={this.handleChange}
              required
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
            <input
              name="city"
              type="text"
              placeholder="i.e. Long Beach"
              title="Meetup City"
              value={this.state.city}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* State */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                State
              </span>
            <textarea
              name="sta"
              type="text"
              maxLength="2"
              minLength="2"
              placeholder="i.e. CA"
              title="Meetup State"
              value={this.state.sta}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Zipcode */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Zipcode
              </span>
            <textarea
              name="zipcode"
              type="number"
              maxLength="5"
              minLength="5"
              placeholder="i.e. 90801"
              title="Meetup Zipcode"
              value={this.state.zipcode}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Description */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Description
              </span>
            <textarea
              name="description"
              type="text"
              maxLength="256"
              placeholder="i.e. Weekly play time for small dogs at Ruff Park"
              title="Meetup Description"
              value={this.state.description}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mt-2">
            {/* Submit Button */}
            <Button
              id = "submit"
              buttonType="submit"
              buttonText="Submit"
              buttonStyle="btn-primary ml-5"
              buttonTitle="Submit"
            />
            </div>
            <div id = "success-message">
                Meetup Successfully Created 
            </div>
          <div className="trak_heading-medium mt-5">Local Doggy Meetups</div>
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
                  <th scope="col">Date&Time</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Zipcode</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="meetup-grid"></tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

export default MeetupForm;
