import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
// Animation
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.scss";
import Slide from "react-reveal";
import GenericPic from "./generic-profile.png";

class BoardingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      dailyRate: "",
      address: "",
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
    document.getElementById("boarder-grid").innerHTML = null; // Clear old data before updating
    const db = Fire.firestore();
    // Order results based on search criteria
    if (document.getElementById("boarder-search-category").value === "city") {
      db.collection("boarders").orderBy("city").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderBoarders(doc);
              });
            });
    }
    else if (document.getElementById("boarder-search-category").value === "dailyRate") {
      db.collection("boarders").orderBy("dailyRate").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderBoarders(doc);
              });
            });
    }
    else if (document.getElementById("boarder-search-category").value === "name") {
      db.collection("boarders").orderBy("name").get()
          .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderBoarders(doc);
              });
            });
    }

    const grid = document.querySelector("#boarder-grid"); // Set grid to the empty one in render
    function renderBoarders(doc) {
      let li = document.createElement("tr"); // create a new table row to store the data   
      let name = document.createElement("td");
      let dailyRate = document.createElement("td");
      let address = document.createElement("td");
      let city = document.createElement("td");
      li.setAttribute("data-id", doc.id); // Know the doc id without having to do another Firebase call
      // Update local state to database contents
      name.textContent = doc.data().name;
      dailyRate.textContent = doc.data().dailyRate;
      address.textContent = doc.data().address;
      city.textContent = doc.data().city;
      li.pic = doc.data().pic;
      li.phone = doc.data().phone;
      li.className = "boarder-table-row my-5";

      // Add all contents to the list
      li.appendChild(name);
      li.appendChild(dailyRate);
      li.appendChild(address);
      li.appendChild(city);
      li.addEventListener("click", ()=>{viewProfile(doc.data().email)});

      // Search functionality
      var matchSearch = true;
      // Loop through each letter in search bar
      for (var i=0; i<document.getElementById("boarder-search").value.length; i++) {
        if (document.getElementById("boarder-search-category").value === "city") // Searching by city
          if (document.getElementById("boarder-search").value[i].toLowerCase() !== city.innerText[i].toLowerCase())
            matchSearch = false;
        else if (document.getElementById("boarder-search-category").value === "dailyRate") // Searching by hourly rate
          if (document.getElementById("boarder-search").value[i].toLowerCase() !== dailyRate.innerText[i].toLowerCase())
              matchSearch = false;
        else if (document.getElementById("boarder-search-category").value === "name") // Searching by name
          if (document.getElementById("boarder-search").value[i].toLowerCase() !== name.innerText[i].toLowerCase())
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
        db.collection("boarders")
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            document.getElementById("database-boarder-pic").src = doc.data().pic;
            document.getElementById("box-boarder-name").textContent = doc.data().name;
            document.getElementById("box-boarder-phone").textContent = doc.data().phone;
            document.getElementById("box-boarder-address").textContent = doc.data().address;
            document.getElementById("box-boarder-city").textContent = doc.data().city;
            document.getElementById("box-boarder-daily-rate").textContent = doc.data().dailyRate;
          });
        });
        document.getElementById("boarder-box").className = "react-reveal collapse";
        setTimeout(() => {
          document.getElementById("boarder-box").className = "react-reveal collapse.show";
        }, 250);
    }

  }


  render() {
    return (
      <div className="mt-7 mb-8 ml-5">
        <div className="row">
          <input id="boarder-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select id="boarder-search-category" onChange={this.handleChange}>
            <option value="city">City</option>
            <option value="dailyRate">Daily Rate</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="row" id="boarder-row">
          <div id="boarder-left-col">
            <Slide left>
              <div id="boarder-box" className="collapse.show">
                <div className="mb-3"><img className="profile-pic" id="database-boarder-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
                  <div className="col">
                  <div className="my-2 mx-5 row"><div id="box-boarder-rating">5.0 ⭐</div></div>
                    <div className="my-2 row boarder-box-row"><div id="box-boarder-name">Name</div></div>
                    <div className="my-2 row boarder-box-row"><div id="box-boarder-phone" className="">Phone</div></div>
                    <div className="my-2 row boarder-box-row"><div id="box-boarder-address" className="">Address</div></div>
                    <div className="my-2 row boarder-box-row"><div id="box-boarder-city" className="">City</div></div>
                    <div className="my-2 row boarder-box-row"><div id="box-boarder-daily-rate" className="">Daily Rate</div></div>
                  </div>
                </div>
            </Slide>
          </div>
          <div id="boarder-right-col">
            <Slide down>
              <div className="trak_heading-medium">
                Dog Boarders
              </div>
            </Slide>
            <div id="loader" className="mb-4"><Loader type="Grid" color="black" height={75} width={75}/></div>
            <div id="result-table">
              <table className="table mt-4 text-left">
                <thead className="boarder-table-head trak_heading-small">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Daily Rate ($)</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                <tbody id="boarder-grid"></tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default BoardingForm;
