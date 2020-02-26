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
      city: "",
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateSearch(e) {
    this.setState({search: e.target.value.substr(0,50) });
  }

  componentDidMount() {
    // Show loading icon for 2 seconds while grid loads
    document.getElementById("loader").style.display = "block";
    document.getElementById("result-table").style.display = "none";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result-table").style.display = "block";
    }, 1750);
  }

  componentDidUpdate() {
    document.getElementById("walker-grid").innerHTML = null; // Clear old data before updating
    const db = Fire.firestore();
    // Order results based on search criteria
    if (document.getElementById("walker-search-category").value === "city") {
      db.collection("walkers").orderBy("city").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderWalkers(doc);
              });
            });
    }
    else if (document.getElementById("walker-search-category").value === "hourlyRate") {
      db.collection("walkers").orderBy("hourlyRate").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderWalkers(doc);
              });
            });
    }
    else if (document.getElementById("walker-search-category").value === "name") {
      db.collection("walkers").orderBy("name").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderWalkers(doc);
              });
            });
    }

    const grid = document.querySelector("#walker-grid"); // Set grid to the empty one in render
    function renderWalkers(doc) {
      let li = document.createElement("tr"); // create a new table row to store the data   
      let name = document.createElement("td");
      let hourlyRate = document.createElement("td");
      let city = document.createElement("td");
      li.setAttribute("data-id", doc.id); // Know the doc id without having to do another Firebase call
      // Update local state to database contents
      name.textContent = doc.data().name;
      hourlyRate.textContent = doc.data().hourlyRate;
      city.textContent = doc.data().city;
      li.pic = doc.data().pic;
      li.phone = doc.data().phone;
      li.className = "walker-table-row my-5";

      // Add all contents to the list
      li.appendChild(name);
      li.appendChild(hourlyRate);
      li.appendChild(city);
      li.addEventListener("click", ()=>{viewProfile(doc.data().email)});

      // Search functionality
      var matchSearch = true;
      // Loop through each letter in search bar
      for (var i=0; i<document.getElementById("walker-search").value.length; i++) {
        if (document.getElementById("walker-search-category").value === "city") // Searching by city
          if (document.getElementById("walker-search").value[i].toLowerCase() !== city.innerText[i].toLowerCase())
            matchSearch = false;
        else if (document.getElementById("walker-search-category").value === "hourlyRate") // Searching by hourly rate
          if (document.getElementById("walker-search").value[i].toLowerCase() !== hourlyRate.innerText[i].toLowerCase())
              matchSearch = false;
        else if (document.getElementById("walker-search-category").value === "name") // Searching by name
          if (document.getElementById("walker-search").value[i].toLowerCase() !== name.innerText[i].toLowerCase())
                matchSearch = false;
      }
      // Only add current row to grid if it matches search
      if (matchSearch === true) {
        grid.appendChild(li);
        console.log("Match found!");
      }
        
    }

    function viewProfile(email) {
      const db = Fire.firestore();
        db.collection("walkers")
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            document.getElementById("walker-box").className = "react-reveal collapse";
            document.getElementById("database-boarder-pic").src = doc.data().pic;
            document.getElementById("box-walker-name").textContent = doc.data().name;
            document.getElementById("box-walker-phone").textContent = doc.data().phone;
            document.getElementById("box-walker-city").textContent = doc.data().city;
            document.getElementById("box-walker-hourly-rate").textContent = doc.data().hourlyRate;
          });
        });
        setTimeout(() => {
          document.getElementById("walker-box").className = "react-reveal collapse.show";
        }, 500);
    }

  }


  render() {
    return (
      <div className="mt-7 mb-8 ml-5">
        <div className="row">
          <input id="walker-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select id="walker-search-category">
            <option value="city">City</option>
            <option value="hourlyRate">Hourly Rate</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="row" id="walker-row">
          <div id="walker-left-col">
            <Slide left>
              <div id="walker-box" className="collapse.show">
                <div className="mb-3"><img className="profile-pic" id="database-boarder-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
                  <div className="col">
                    <div className="my-2 row walker-box-row"><div id="box-walker-name" text="blob">Name</div></div>
                    <div className="my-2 row walker-box-row"><div id="box-walker-phone" className="">Phone</div></div>
                    <div className="my-2 row walker-box-row"><div id="box-walker-city" className="">City</div></div>
                    <div className="my-2 row walker-box-row"><div id="box-walker-hourly-rate" className="">Hourly Rate</div></div>
                  </div>
                </div>
            </Slide>
          </div>
          <div id="walker-right-col">
            <Slide down>
              <div className="trak_heading-medium">
                Dog Walkers
              </div>
            </Slide>
            <div id="loader" className="mb-4"><Loader type="Grid" color="black" height={75} width={75}/></div>
            <div id="result-table">
              <table className="table mt-4 text-left">
                <thead className="walker-table-head trak_heading-small">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Hourly Rate</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                <tbody id="walker-grid"></tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default WalkerForm;
