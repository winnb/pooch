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
    document.getElementById("loader").style.display = "block";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 1750);
  }

  componentDidUpdate() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("bubble-home").innerHTML = null; // Clear old data before updating
    const db = Fire.firestore();
    // Order results based on search criteria
    db.collection("walkers")
    .orderBy(document.getElementById("walker-search-category").value).get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderWalkers(doc);
      });
    });
   
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
          rating.textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐ ("+ratingCount+")";
        else
          rating.textContent = "No Ratings ⭐";
      });
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

      // Update popup rating
      if (document.getElementById("popup-walker-email").textContent === doc.data().email) {
        db.collection("ratings")
        .where("for", "==", document.getElementById("popup-walker-email").textContent)
        .get()
        .then(snapshot => {
          var ratingSum = 0;
        var ratingCount = 0;
          snapshot.docs.forEach(doc => {
            ratingSum += doc.data().stars;
            ratingCount++;
          });
          if (ratingCount > 0)
            document.getElementById("popup-walker-rating").textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐ ("+ratingCount+")";
          else
            document.getElementById("popup-walker-rating").textContent = "No Ratings ⭐";
        });
      }

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
            document.getElementById("popup-walker-email").textContent = doc.data().email;
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
          
        // Update popup rating
        if (document.getElementById("popup-walker-email").textContent === doc.data().email) {
          db.collection("ratings")
          .where("for", "==", document.getElementById("popup-walker-email").textContent)
          .get()
          .then(snapshot => {
            var ratingSum = 0;
          var ratingCount = 0;
            snapshot.docs.forEach(doc => {
              ratingSum += doc.data().stars;
              ratingCount++;
            });
            if (ratingCount > 0)
              document.getElementById("popup-walker-rating").textContent = (ratingSum/ratingCount).toFixed(1)+" ⭐ ("+ratingCount+")";
            else
              document.getElementById("popup-walker-rating").textContent = "No Ratings ⭐";
          });
        }
      });
        });
        setTimeout(() => {
          document.getElementById("walker-popup").className = "fixed-top row collapse.show";
        }, 500);
    }
  }

  closeProfile() { document.getElementById("walker-popup").className = "row collapse"; }

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
      .where("for", "==", document.getElementById("popup-walker-email").textContent)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          // Creating new review
          db.collection("ratings").add({
            by: Fire.auth().currentUser.email,
            for: document.getElementById("popup-walker-email").textContent,
            stars: rating
          });
        }
        else
          // Replacing old review
          db.collection("ratings")
          .where('by', '==', Fire.auth().currentUser.email)
          .where("for", "==", document.getElementById("popup-walker-email").textContent)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              doc.ref.delete();
            });
          });
          setTimeout(() => {
            db.collection("ratings").add({
            by: Fire.auth().currentUser.email,
            for: document.getElementById("popup-walker-email").textContent,
            stars: rating
          });
          this.setState({rest: !this.state.reset});
          }, 250);      
      });
  }

  // swapReviewsAndPictures() {
  //   if (document.getElementById("review-swapper").textContent === "Show Images 📷") {
  //     document.getElementById("review-swapper").textContent = "See Reviews ✉️";
  //     document.getElementById("popup-walker-reviews").className = "col collapse";
  //     document.getElementById("popup-walker-images").className = "col collapse.show";
  //   }
  //   else {
  //     document.getElementById("review-swapper").textContent = "Show Images 📷";
  //     document.getElementById("popup-walker-reviews").className = "col collapse.show";
  //     document.getElementById("popup-walker-images").className = "col collapse";
  //   }
  // }

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

        <div id="walker-popup" className="row collapse">

          <div className="col" id="popup-walker-left">
          <div className="my-3 row">
                <img className="profile-pic mr-5" id="popup-walker-pic" src="" alt="Profile Picture"/>
                <div className="col">
                    <div id="popup-walker-rating"></div> 
                </div>
              </div>
              <div className="my-3 row"><div className="popup-input collapse.show" id="popup-walker-email"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-name"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-phone"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-city"/></div>
              <div className="my-3 row"><div className="popup-input" id="popup-walker-hourly-rate"/></div>
              <div className="col" id="popup-walker-images">
                <img className="popup-feature row collapse" id="popup-walker-feature1-pic" src={Pic1} alt="Featured Picture"/>
                <img className="popup-feature row collapse" id="popup-walker-feature2-pic" src={Pic2} alt="Featured Picture"/>
                <img className="popup-feature row collapse" id="popup-walker-feature3-pic" src={Pic3} alt="Featured Picture"/>
                <img className="popup-feature row collapse" id="popup-walker-feature4-pic" src={Pic4} alt="Featured Picture"/>
              </div>
          </div>

          <div className="col my-4">
            {/* <button id="review-swapper" type="submit" className="btn" onClick={this.swapReviewsAndPictures}>See Reviews ✉️</button> */}
            <button type="submit" className="btn btn-danger" id="close-popup-button" onClick={this.closeProfile}>X</button>

            <div className="col" id="popup-walker-reviews">
              <div className="row justify-content-center my-2">
                <div className="empty-stars" id="star1" onClick={this.fillStar}>☆</div>
                <div className="empty-stars" id="star2" onClick={this.fillStar}>☆</div>
                <div className="empty-stars" id="star3" onClick={this.fillStar}>☆</div>
                <div className="empty-stars" id="star4" onClick={this.fillStar}>☆</div>
                <div className="empty-stars" id="star5" onClick={this.fillStar}>☆</div>
              </div>
              <textarea className="mt-2 mb-1" id="new-review" placeholder="Write a review..."></textarea>
              <button id="submit-review" className="btn">Submit Review</button>
              <div className="user-review my-3">
                <div className="row">
                  George Walker ⭐⭐⭐⭐
                </div>
                <div className="review-body">Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. </div>
              </div>
              <div className="user-review my-3">
                <div className="row">
                  George Walker ⭐⭐
                </div>
                <div className="review-body">Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. </div>
              </div>
              <div className="user-review my-3">
                <div className="row">
                  George Walker ⭐⭐⭐⭐⭐
                </div>
                <div className="review-body">Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. Hello, this is my review. </div>
              </div>
            </div>
          </div>
          
        </div>
          
      </div>
    );
  }
}

export default WalkerForm;
