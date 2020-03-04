import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
// Animation
import Loader from "react-loader-spinner";
import "../BoardingForm/styles.scss";

import Pic1 from "./1.png";
import Pic2 from "./2.jpg";
import Pic3 from "./3.png";
import Pic4 from "./4.png";

class BoardingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      dailyRate: "",
      address: "",
      city: "",
      search: "",
      reset: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.fillStar = this.fillStar.bind(this);
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
    function renderBoarders(doc) {
      // Bubble render
      var newBox = document.createElement("div");
      newBox.className = "boarder-box";
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
      var ratingSum = 0;
      var ratingCount = 0;
      db.collection("ratings")
      .where("for", "==", doc.data().email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          ratingSum += doc.data().stars;
          ratingCount++;
        });
        if (ratingCount > 0)
          rating.textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐";
        else
          rating.textContent = "No Ratings ⭐";
      });
      ratingRow.appendChild(rating);

      var nameRow = document.createElement("div"); // Second row
      nameRow.className = "my-2 mx-1 boarder-box-row";
      newCol.appendChild(nameRow);
      var name = document.createElement("div");
      name.innerText = doc.data().name;
      name.className = "boarder-name";
      nameRow.appendChild(name);

      var phoneRow = document.createElement("div"); // Third row
      phoneRow.className = "my-2 mx-1 boarder-box-row";
      newCol.appendChild(phoneRow);
      var phone = document.createElement("div");
      phone.innerText = doc.data().phone;
      if (phone.innerText.length === 10)
        phone.innerText = phone.innerText[0]+phone.innerText[1]+phone.innerText[2]+"-"+phone.innerText[3]+phone.innerText[4]+phone.innerText[5]+"-"+phone.innerText[6]+phone.innerText[7]+phone.innerText[8]+phone.innerText[9];
      if (phone.innerText.length === 7)
        phone.innerText = phone.innerText[0]+phone.innerText[1]+phone.innerText[2]+"-"+phone.innerText[3]+phone.innerText[4]+phone.innerText[5]+phone.innerText[6];
      phone.className = "boarder-phone";
      phoneRow.appendChild(phone);

      var addressRow = document.createElement("div"); // Fourth row
      addressRow.className = "my-2 mx-1 boarder-box-row";
      newCol.appendChild(addressRow);
      var address = document.createElement("div");
      address.innerText = doc.data().address;
      address.className = "boarderer-address";
      addressRow.appendChild(address);

      var cityRow = document.createElement("div"); // Fifth row
      cityRow.className = "my-2 mx-1 boarder-box-row";
      newCol.appendChild(cityRow);
      var city = document.createElement("div");
      city.innerText = doc.data().city;
      city.className = "boarder-city";
      cityRow.appendChild(city);

      var dailyRateRow = document.createElement("div"); // Sixth row
      dailyRateRow.className = "my-2 mx-1 boarder-box-row";
      newCol.appendChild(dailyRateRow);
      var dailyRate = document.createElement("div");
      dailyRate.innerText = "$"+doc.data().dailyRate+"/day";
      dailyRate.className = "boarder-daily-rate";
      dailyRateRow.appendChild(dailyRate);

      // Update popup rating
      if (document.getElementById("popup-boarder-email").textContent === doc.data().email) {
        ratingSum = 0;
        ratingCount = 0;
        db.collection("ratings")
        .where("for", "==", document.getElementById("popup-boarder-email").textContent)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            ratingSum += doc.data().stars;
            ratingCount++;
          });
          if (ratingCount > 0)
            document.getElementById("popup-boarder-rating").textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐";
          else
            document.getElementById("popup-boarder-rating").textContent = "No Ratings ⭐";
        });
      }

      // Search functionality
      var matchSearch = true;
      // Searching by city
      if (document.getElementById("boarder-search-category").value === "city") { 
        if (document.getElementById("boarder-search").value.length > city.innerText.length) // Check if search bar is longer than city
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("boarder-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("boarder-search").value[j].toLowerCase() !== city.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Searching by hourly rate
      if (document.getElementById("boarder-search-category").value === "dailyRate") { 
        if (document.getElementById("boarder-search").value.length > dailyRate.innerText.length) // Check if search bar is longer than hourly rate
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("boarder-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("boarder-search").value[j].toLowerCase() !== dailyRate.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Searching by name
      if (document.getElementById("boarder-search-category").value === "name") { 
        if (document.getElementById("boarder-search").value.length > name.innerText.length) // Check if search bar is longer than name
          matchSearch = false;
        else
          for (var j=0; j<document.getElementById("boarder-search").value.length; j++) // Loop through each letter in search bar
            if (document.getElementById("boarder-search").value[j].toLowerCase() !== name.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Only add bubble if it matches search
      if (matchSearch === true)
        document.getElementById("bubble-home").appendChild(newBox);
      document.getElementById("loader").style.display = "none";  
    }

    function viewProfile(email) {
      document.getElementById("boarder-popup").className = "fixed-top row collapse";
      const db = Fire.firestore();
        db.collection("boarders")
        .where("email", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            document.getElementById("popup-boarder-pic").src = doc.data().pic;
            document.getElementById("popup-boarder-email").textContent = doc.data().email;
            document.getElementById("popup-boarder-name").textContent = doc.data().name;
            if (doc.data().phone.length == 10)
              document.getElementById("popup-boarder-phone").textContent = doc.data().phone[0]+doc.data().phone[1]+doc.data().phone[2]+"-"+doc.data().phone[3]+doc.data().phone[4]+doc.data().phone[5]+"-"+doc.data().phone[6]+doc.data().phone[7]+doc.data().phone[8]+doc.data().phone[9];
            else
              document.getElementById("popup-boarder-phone").textContent = doc.data().phone;
            document.getElementById("popup-boarder-address").textContent = doc.data().address;
            document.getElementById("popup-boarder-city").textContent = doc.data().city;
            document.getElementById("popup-boarder-daily-rate").textContent = "$"+doc.data().dailyRate+"/day";
            document.getElementById("popup-boarder-feature1-pic").src = doc.data().feature1;
            document.getElementById("popup-boarder-feature2-pic").src = doc.data().feature2;
            document.getElementById("popup-boarder-feature3-pic").src = doc.data().feature3;
            document.getElementById("popup-boarder-feature4-pic").src = doc.data().feature4;
          });
        });
        var ratingSum = 0;
        var ratingCount = 0;
        db.collection("ratings")
        .where("for", "==", email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            ratingSum += doc.data().stars;
            ratingCount++;
          });
          if (ratingCount > 0) {
            document.getElementById("popup-boarder-rating").textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐";
            for (var i=0; i<5; i++)
            {
              if (i<Math.floor(ratingSum/ratingCount)) {
              document.getElementById("star"+(i+1)).className = "full-stars";
              document.getElementById("star"+(i+1)).textContent = "⭐";
              }
              else {
                document.getElementById("star"+(i+1)).className = "empty-stars";
                document.getElementById("star"+(i+1)).textContent = "☆";
              }
            }
          }
          else {
            document.getElementById("popup-boarder-rating").textContent = "No Ratings ⭐";
            for (var i=0; i<5; i++) {
              document.getElementById("star"+(i+1)).className = "empty-stars";
              document.getElementById("star"+(i+1)).textContent = "☆";
            }
          }
        });
        setTimeout(() => {
          document.getElementById("boarder-popup").className = "fixed-top row collapse.show";
        }, 500);
    }
  }

  closeProfile() { document.getElementById("boarder-popup").className = "fixed-top row collapse"; }

  fillStar(event) {
    var rating = 0;
    for (var i=0; i<5; i++) {
      if(i < parseInt(event.target.id.split("star")[1]) ) {
        document.getElementById("star"+(i+1)).className = "full-stars";
        document.getElementById("star"+(i+1)).textContent = "⭐";
        rating++;
      }
      else {
        document.getElementById("star"+(i+1)).className = "empty-stars";
        document.getElementById("star"+(i+1)).textContent = "☆";
      }
    }
    const db = Fire.firestore();
    db.collection("ratings")
      .where('by', '==', Fire.auth().currentUser.email)
      .where("for", "==", document.getElementById("popup-boarder-email").textContent)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          // Creating new review
          db.collection("ratings").add({
            by: Fire.auth().currentUser.email,
            for: document.getElementById("popup-boarder-email").textContent,
            stars: rating
          });
        }
        else
          // Replacing old review
          db.collection("ratings")
          .where('by', '==', Fire.auth().currentUser.email)
          .where("for", "==", document.getElementById("popup-boarder-email").textContent)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              doc.ref.delete();
            });
          });
          setTimeout(() => {
            db.collection("ratings").add({
            by: Fire.auth().currentUser.email,
            for: document.getElementById("popup-boarder-email").textContent,
            stars: rating
          });
          this.setState({rest: !this.state.reset});
          }, 250);      
      });
  }

  render() {
    return (
      <div className="mt-7 mb-8">
        <div className="row">
          <input id="boarder-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select id="boarder-search-category" onChange={this.handleChange}>
            <option value="city">City</option>
            <option value="dailyRate">Daily Rate</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="trak_heading-medium mb-3">Dog Boarders</div>
        <div id="loader" className="mb-4"><Loader type="ThreeDots" color="black" height={75} width={75}/></div>
        <div id="bubble-home" className="row"></div>

        <div id="boarder-popup" className="top row collapse" onMouseDown={this.dragPopup}>
          <div className="col">
              <div className="my-3 row">
                <img className="profile-pic mr-5" id="popup-boarder-pic" src="" alt="Profile Picture"/>
                <div className="col">
                  <div className="my-2">
                    <div id="popup-boarder-rating"></div>
                  </div>
                  <div className="row justify-content-center my-2">
                      <div className="empty-stars" id="star1" onClick={this.fillStar}>☆</div>
                      <div className="empty-stars" id="star2" onClick={this.fillStar}>☆</div>
                      <div className="empty-stars" id="star3" onClick={this.fillStar}>☆</div>
                      <div className="empty-stars" id="star4" onClick={this.fillStar}>☆</div>
                      <div className="empty-stars" id="star5" onClick={this.fillStar}>☆</div>
                  </div>
                  <div className="my-2">
                    <button type="submit" className="btn btn-primary" onClick="">Send Message ✉</button>
                  </div>        
                </div>
              </div>
              <div className="my-3 row"><div className="popup-input collapse" id="popup-boarder-email"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-boarder-name"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-boarder-phone"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-boarder-address"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-boarder-city"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-boarder-daily-rate"/></div>
          </div>
          <div className="col" id="boarder-block-col">
            <div className="popup-pic-row row">
              <div className="col"><img className="boarder-feature" id="popup-boarder-feature1-pic" src={Pic1} alt="Featured Picture"/></div>
              <div className="col"><img className="boarder-feature" id="popup-boarder-feature2-pic" src={Pic2} alt="Featured Picture"/></div>
            </div>
            <div className="popup-pic-row row">
              <div className="col"><img className="boarder-feature" id="popup-boarder-feature3-pic" src={Pic3} alt="Featured Picture"/></div>
              <div className="col"><img className="boarder-feature" id="popup-boarder-feature4-pic" src={Pic4} alt="Featured Picture"/></div>
            </div>
            <button type="submit" className="btn btn-danger" id="close-popup-button" onClick={this.closeProfile}>X</button>
          </div>
        </div>

      </div>
    );
  }
}

export default BoardingForm;
