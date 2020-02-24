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
import Slide from "react-reveal";

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
      city: this.state.city,
      timestamp: new Date()
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
      <div className="mt-7 ml-5 input-group-prepend">
        <form onSubmit={this.addBoarder}>
          <Slide down>
            <div className="trak_heading-medium">
            Local Dog Boarders
            </div>
          </Slide>
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
        </form>
      </div>
    );
  }
}

export default BoardingForm;
