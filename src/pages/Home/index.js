// React
import React from "react";

//Firebase
import Fire from "../../config/Fire.js";

//Grahpics, Styles, Animation
import Paw from "./media/paw-icon.png";
import Walking from "./media/walking-icon.png";
import Doghouse from "./media/doghouse-icon.png";
import "./styles.scss";
import Slide from "react-reveal";

// Components
import Slideshow from "../../components/Slideshow";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      hourlyRate: "",
      city: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // New Walker Table
    const db = Fire.firestore();
    // get the data from the collection
    db.collection("walkers")
    .orderBy("timestamp", "desc")
    .limit(3)
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
      //  li.appendChild(phone);
      //  li.appendChild(hourlyRate);
       li.appendChild(city);
 
       // Add list to grid
       grid.appendChild(li);
     }

     // New Boarder Table
     db.collection("boarders")
    .orderBy("name", "desc")
    .limit(3)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderBoarders(doc);
      });
    });
     // Create a grid to store walker data
     const boarderGrid = document.querySelector("#boarder-grid");
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
      //  li.appendChild(phone);
      //  li.appendChild(dailyRate);
      // li.appendChild(address);
       li.appendChild(city);
 
       // Add list to grid
       boarderGrid.appendChild(li);
     }
  }

  render() {
    return (
      <div className="mt-7" id="section1">
        <Slide down>
          <Slideshow/> 
        </Slide>
        <div className="row mb-5 mt-3">
          <Slide left>
            <div className="row my-5" id="section2">
              <div className="col mx-5">
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
              </div>
              <div className="col mx-5 my-5">
                Image 1
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section3">
              <div className="col mx-5 my-5">
                Image 2
              </div>
              <div className="col mx-5">
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.  
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.  
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.   
              </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section4">
              <div className="col mx-5">
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
              </div>
              <div className="col mx-5 my-5">
                Image 3
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section5">
              <div className="col mx-5 my-5">
                Image 4
              </div>
              <div className="col mx-5">
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
              </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section6">
              <div className="col mx-5">
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
              </div>
              <div className="col mx-5 my-5">
                Image 5
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section7">
              <div className="col mx-5 my-5">
                Image 6
              </div>
              <div className="col mx-5">
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
              </div>
            </div>
            </Slide>
        </div>
      </div>
    );
  };
}

export default Home;
