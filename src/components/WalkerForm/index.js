import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
// Animation
import Loader from "react-loader-spinner";
import "../WalkerForm/styles.scss";

import Pic1 from "./1.png";
import Pic2 from "./2.jpg";
import Pic3 from "./3.png";
import Pic4 from "./4.png";

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
    //document.getElementById("result-table").style.display = "none";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      //document.getElementById("result-table").style.display = "block";
    }, 1750);
  }

  componentDidUpdate() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("bubble-home").innerHTML = null; // Clear old data before updating
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
    function renderWalkers(doc) {
      // Bubble render
      var newBox = document.createElement("div");
      newBox.className = "walker-box";
      newBox.addEventListener("click", ()=>{viewProfile(doc.data().email)});
      var picHolder = document.createElement("div");
      picHolder.className = "mb-3";
      var newPic = document.createElement("img");
      newPic.className = "profile-pic";
      newPic.src = doc.data().pic;
      newPic.alt = "Profile Picture";
      picHolder.appendChild(newPic);
      newBox.appendChild(picHolder);
      var newCol = document.createElement("div");
      newCol.className = "col";
      newBox.appendChild(newCol);

      var ratingRow = document.createElement("div"); // First row
      ratingRow.className = "my-2";
      newCol.appendChild(ratingRow);
      var rating = document.createElement("div");
      rating.innerText = Math.floor((Math.random()*2))+Math.floor((Math.random()*11))/10+3+" ⭐";
      ratingRow.appendChild(rating);

      var nameRow = document.createElement("div"); // Second row
      nameRow.className = "my-2 walker-box-row";
      newCol.appendChild(nameRow);
      var name = document.createElement("div");
      name.innerText = doc.data().name;
      name.className = "walker-name";
      nameRow.appendChild(name);

      var phoneRow = document.createElement("div"); // Third row
      phoneRow.className = "my-2 walker-box-row";
      newCol.appendChild(phoneRow);
      var phone = document.createElement("div");
      phone.innerText = doc.data().phone;
      if (phone.innerText.length === 10)
        phone.innerText = phone.innerText[0]+phone.innerText[1]+phone.innerText[2]+"-"+phone.innerText[3]+phone.innerText[4]+phone.innerText[5]+"-"+phone.innerText[6]+phone.innerText[7]+phone.innerText[8]+phone.innerText[9];
      phone.className = "walker-phone";
      phoneRow.appendChild(phone);

      var cityRow = document.createElement("div"); // Fourth row
      cityRow.className = "my-2 walker-box-row";
      newCol.appendChild(cityRow);
      var city = document.createElement("div");
      city.innerText = doc.data().city;
      city.className = "walker-city";
      cityRow.appendChild(city);

      var hourlyRateRow = document.createElement("div"); // Fifth row
      hourlyRateRow.className = "my-2 walker-box-row";
      newCol.appendChild(hourlyRateRow);
      var hourlyRate = document.createElement("div");
      hourlyRate.innerText = "$"+doc.data().hourlyRate+"/hour";
      hourlyRate.className = "walker-hourly-rate";
      hourlyRateRow.appendChild(hourlyRate);

      // Search functionality
      var matchSearch = true;
      // Searching by city
      if (document.getElementById("walker-search-category").value === "city") { 
        if (document.getElementById("walker-search").value.length > city.innerText.length) // Check if search bar is longer than city
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("walker-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("walker-search").value[j].toLowerCase() !== city.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Searching by hourly rate
      if (document.getElementById("walker-search-category").value === "hourlyRate") { 
        if (document.getElementById("walker-search").value.length > hourlyRate.innerText.length) // Check if search bar is longer than hourly rate
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("walker-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("walker-search").value[j].toLowerCase() !== hourlyRate.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Searching by name
      if (document.getElementById("walker-search-category").value === "name") { 
        if (document.getElementById("walker-search").value.length > name.innerText.length) // Check if search bar is longer than hourly rate
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("walker-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("walker-search").value[j].toLowerCase() !== name.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Only add bubble if it matches search
      console.log(city.innerText+" "+matchSearch);
      if (matchSearch === true)
        document.getElementById("bubble-home").appendChild(newBox);
      document.getElementById("loader").style.display = "none";  
    }

    function viewProfile(email) {
      document.getElementById("walker-popup").className = "row collapse";
      const db = Fire.firestore();
        db.collection("walkers")
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            document.getElementById("popup-walker-pic").src = doc.data().pic;
            document.getElementById("popup-walker-name").textContent = doc.data().name;
            if (doc.data().phone.length == 10)
            document.getElementById("popup-walker-phone").textContent = doc.data().phone[0]+doc.data().phone[1]+doc.data().phone[2]+"-"+doc.data().phone[3]+doc.data().phone[4]+doc.data().phone[5]+"-"+doc.data().phone[6]+doc.data().phone[7]+doc.data().phone[8]+doc.data().phone[9];
            else
              document.getElementById("popup-walker-phone").textContent = doc.data().phone;
            document.getElementById("popup-walker-city").textContent = doc.data().city;
            document.getElementById("popup-walker-hourly-rate").textContent = "$"+doc.data().hourlyRate+"/hour";
            document.getElementById("popup-walker-feature1-pic").src = doc.data().feature1;
            document.getElementById("popup-walker-feature2-pic").src = doc.data().feature2;
            document.getElementById("popup-walker-feature3-pic").src = doc.data().feature3;
            document.getElementById("popup-walker-feature4-pic").src = doc.data().feature4;
          });
        });
        setTimeout(() => {
          document.getElementById("walker-popup").className = "row collapse.show";
        }, 250);
    }
    
  }

  closeProfile() { document.getElementById("walker-popup").className = "row collapse"; }

  fillStar(event) {
    for (var i=0; i<5; i++) {
      if(i < parseInt(event.target.id.split("star")[1]) ) {
        document.getElementById("star"+(i+1)).className = "full-stars";
        document.getElementById("star"+(i+1)).textContent = "⭐";
      }
      else {
        document.getElementById("star"+(i+1)).className = "empty-stars";
        document.getElementById("star"+(i+1)).textContent = "☆";
      }
    }
  }

  render() {
    return (
      <div className="mt-7 mb-8">

        <div className="row">
          <input id="walker-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select id="walker-search-category" onChange={this.handleChange}>
            <option value="city">City</option>
            <option value="hourlyRate">Hourly Rate</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="trak_heading-medium mb-3">Dog Walkers</div>
        <div id="loader" className="mb-4"><Loader type="ThreeDots" color="black" height={75} width={75}/></div>
        <div id="bubble-home" className="row"></div>

        <div id="walker-popup" className="row collapse" onMouseDown={this.dragPopup}>
          <div className="col">
          <div className="my-3 row">
                <img className="profile-pic mr-5" id="popup-walker-pic" src="" alt="Profile Picture"/>
                <div className="col">
                  <div className="my-3">
                    <div className="">
                      <div className="empty-stars" id="star1" onClick={this.fillStar} onMouseLeave={this.emptyStar}>☆</div>
                      <div className="empty-stars" id="star2" onClick={this.fillStar} onMouseLeave={this.emptyStar}>☆</div>
                      <div className="empty-stars" id="star3" onClick={this.fillStar} onMouseLeave={this.emptyStar}>☆</div>
                      <div className="empty-stars" id="star4" onClick={this.fillStar} onMouseLeave={this.emptyStar}>☆</div>
                      <div className="empty-stars" id="star5" onClick={this.fillStar} onMouseLeave={this.emptyStar}>☆</div>
                    </div>
                  </div>
                  <div className="my-3 star-row">
                    <button type="submit" className="btn btn-primary" onClick="">Send Message ✉</button>
                  </div>        
                </div>
              </div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-name"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-phone"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-city"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-hourly-rate"/></div>
          </div>
          <div className="col" id="walker-block-col">
            <div className="popup-pic-row row">
              <div className="col"><img className="walker-feature" id="popup-walker-feature1-pic" src={Pic1} alt="Featured Picture"/></div>
              <div className="col"><img className="walker-feature" id="popup-walker-feature2-pic" src={Pic2} alt="Featured Picture"/></div>
            </div>
            <div className="popup-pic-row row">
              <div className="col"><img className="walker-feature" id="popup-walker-feature3-pic" src={Pic3} alt="Featured Picture"/></div>
              <div className="col"><img className="walker-feature" id="popup-walker-feature4-pic" src={Pic4} alt="Featured Picture"/></div>
            </div>
            <button type="submit" className="btn btn-danger" id="close-popup-button" onClick={this.closeProfile}>X</button>
          </div>
        </div>
          
      </div>
    );
  }
}

export default WalkerForm;
