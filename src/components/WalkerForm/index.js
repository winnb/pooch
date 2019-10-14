import React from "react";

// Components
import Button from "../Button";
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class WalkerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      hourlyRate: "",
      city: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addWalker = this.addWalker.bind(this);
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

    // Get walkers from Firebase
    db.collection("walkers")
      .orderBy("city")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderWalkers(doc);
        });
      });

      // Create a grid to store meetup data
    const grid = document.querySelector("#walker-grid");
    function renderWalkers(doc) {
      // create a list to style the data
      let li = document.createElement("tr");
      let name = document.createElement("td");
      let phone = document.createElement("td");
      let hourlyRate = document.createElement("td");
      let city = document.createElement("td");

      li.setAttribute("data-id", doc.id);

      // Update local state to database contents
      name.textContent = doc.data().name;
      phone.textContent = doc.data().phone;
      hourlyRate.textContent = doc.data().hourlyRate;
      city.textContent = doc.data().city;

      // Add all contents to the list
      li.appendChild(name);
      li.appendChild(phone);
      li.appendChild(hourlyRate);
      li.appendChild(city);

      // Add list to grid
      grid.appendChild(li);
    }
  }

  addWalker = e => {
    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("walkers").add({
      name: this.state.name,
      phone: this.state.phone,
      hourlyRate: this.state.hourlyRate,
      city: this.state.city
    });

    // Reset state
    this.setState({
      name: "",
      phone: "",
      hourlyRate: "",
      city: ""
    });

    //Walker Recorded Pop-up
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);
  };

  render() {
    return (
      <div className=" ml-5 input-group-prepend">
        <form onSubmit={this.addWalker}>
            <div className="mb-1">
            {/* Name */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Walker Name
              </span>
            <input
              name="name"
              type="text"
              title="Walker Name"
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
              title="Walker Phone"
              value={this.state.phone}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mb-1">
            {/* Hourly Rate */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Hourly Rate
              </span>
            <input
              name="hourlyRate"
              type="number"
              placeholder="i.e. 15"
              title="Walker Rate"
              value={this.state.hourlyRate}
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
            <textarea
              name="city"
              type="text"
              placeholder="i.e. Long BEach"
              title="Walker City"
              value={this.state.city}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            </div>
            <div className="mt-2">
            {/* Submit Button */}
            <Button
              buttonType="submit"
              buttonText="Submit"
              buttonStyle="btn-primary ml-5"
              buttonTitle="Submit"
            />
            </div>
          <div className="trak_heading-medium mt-5">Local Doggy Meetups</div>
          <div id="loader" className="mb-4">
            <Loader
              type="Grid"
              // type="MutatingDots"
              color="#00a677"
              height={75}
              width={75}
              // timeout={3000} //3 secs
            />
          </div>
          {/* Render contents of database */}
          <div id="result-table">
            <table className="table table-dark mt-4 text-left trak_body">
              <thead className="trak_heading-small">
                {/* change color */}
                <tr>
                  <th scope="col">Date & Time</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Zipcode</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="walker-grid"></tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

export default WalkerForm;
