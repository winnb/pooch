import React from "react";

// Components
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../WalkerForm/styles.scss";
import Slide from "react-reveal";
import GenericPic from "./generic-profile.png";

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

      // Create a grid to store walker data
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
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);
    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("walkers").add({
      name: this.state.name,
      phone: this.state.phone,
      hourlyRate: this.state.hourlyRate,
      city: this.state.city,
      timestamp: new Date()
    });

    // Reset state
    this.setState({
      name: "",
      phone: "",
      hourlyRate: "",
      city: ""
    });
  };

  render() {
    return (
      <div className="mt-7 ml-5 input-group-prepend">
        <div id="walker-box" className="collapse.show">
          <div className="mb-3"><img className="profile-pic" id="database-boarder-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <div className="col">
              <div className="my-2 row"><input id="box-walker-name" type="text" placeholder="Name" maxLength="50"/></div>
              <div className="my-2 row"><input id="box-walker-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
              <div className="my-2 row"><input id="box-walker-city" type="text" placeholder="City" maxLength="50"/></div>
              <div className="my-2 row"><input id="box-walker-hourly-rate" type="text" placeholder="Hourly Rate" min="12" max="1000" maxLength="4"/></div>
            </div>
        </div>

        <form onSubmit={this.addWalker}>
          <Slide down>
            <div className="trak_heading-medium">
              Local Dog Walkers
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
            <table className="table mt-4 text-left">
              <thead className="thead-light trak_heading-small">
                <tr>
                  <th scope="col">Walker Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Hourly Rate</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody id="walker-grid"></tbody>
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

export default WalkerForm;
