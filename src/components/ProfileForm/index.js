// React
import React from "react";

//Firebase
import Fire from "../../config/Fire.js";

// Styles
import "./styles.scss";

//Animation and Images
import Slide from "react-reveal";
import LadyAndDog from "./LadyAndDog.png";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentPassword: "",
      newPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const db = Fire.firestore();
    setTimeout(() => { // Check if user is a parent
      db.collection("parents")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderParentProfile(doc);
        });
      });
    }, 1750);
    setTimeout(() => { // Check if user is a walker
      db.collection("walkers")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderWalkerProfile(doc);
        });
      });
    }, 1750);
    setTimeout(() => { // Check if user is a parent
      db.collection("boarders")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderBoarderProfile(doc);
        });
      });
    }, 1750);

    function renderParentProfile(doc) {
      document.getElementById("parent-button").innerHTML = "✓ Parent";
      document.getElementById("profile-email").value = Fire.auth().currentUser.email;
      document.getElementById("parent-name").value = doc.data().name;
      document.getElementById("parent-phone").value = doc.data().phone;
      document.getElementById("profile-city").value = doc.data().city;
      document.getElementById("parent-bio").value = doc.data().bio;
    }
  
    function renderWalkerProfile(doc) {
      document.getElementById("walker-button").innerHTML = "✓ Walker";
    }
  
    function renderBoarderProfile(doc) {
      document.getElementById("boarder-button").innerHTML = "✓ Boarder";
    }
  }

  openParentProfile() {
    if (document.getElementById("parent-profile").className === ("react-reveal collapse"))
        document.getElementById("parent-profile").className = ("react-reveal collapse.show");
    else if (document.getElementById("parent-profile").className === ("react-reveal collapse.show"))
        document.getElementById("parent-profile").className = ("react-reveal collapse");
  }

  openWalkerProfile() {
    if (document.getElementById("walker-profile").className === ("react-reveal collapse"))
        document.getElementById("walker-profile").className = ("react-reveal collapse.show");
    else if (document.getElementById("walker-profile").className === ("react-reveal collapse.show"))
        document.getElementById("walker-profile").className = ("react-reveal collapse");
  }

  openBoarderProfile() {
    if (document.getElementById("boarder-profile").className === ("react-reveal collapse"))
        document.getElementById("boarder-profile").className = ("react-reveal collapse.show");
    else if (document.getElementById("boarder-profile").className === ("react-reveal collapse.show"))
        document.getElementById("boarder-profile").className = ("react-reveal collapse");
  }

  toggleCollapse() {
    if (document.getElementById("edit-profile-pic-button").className === "collapse")
        document.getElementById("edit-profile-pic-button").className = "collapse.show";
    else if (document.getElementById("edit-profile-pic-button").className === "collapse.show")
        document.getElementById("edit-profile-pic-button").className = "collapse"; 
  }

  updateParent() {
    const db = Fire.firestore();
    // Takes too long to delete old before updating new
    // Works without deleting old, but junk will accumulate in database
    // var query = db.collection("parents").where('email', '==', Fire.auth().currentUser.email);
    // query.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     doc.ref.delete();
    //   });
    // });
    db.collection("parents").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("parent-name").value,
      phone: document.getElementById("parent-phone").value,
      city: document.getElementById("profile-city").value
    });
  }

  updateWalker() {
    const db = Fire.firestore();
    db.collection("walkers").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("walker-name").value,
      phone: document.getElementById("walker-phone").value,
      city: document.getElementById("profile-city").value
    });
  }

  updateBoarder() {
    const db = Fire.firestore();
    db.collection("boarders").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("boarder-name").value,
      phone: document.getElementById("boarder-phone").value,
      address: document.getElementById("boarder-address").value,
      city: document.getElementById("profile-city").value
    });
  }

  render() {
    return (
      <div className="mt-7 mx-6 mb-8">
        <Slide left>
          <div className="row px-4 py-4">
            <button className="col mx-4 py-1 signup" id="parent-button" onClick={this.openParentProfile} href="/profile#update-parent-button">
              Create a parent profile
            </button>
            <button className="col mx-4 py-1 signup" id="walker-button" onClick={this.openWalkerProfile}>
              Create a walker profile
            </button>
            <button className="col mx-4 py-1 signup" id="boarder-button" onClick={this.openBoarderProfile}>
              Create a dog boarder profile
            </button>
          </div>
          <div className="mb-1">
              <img id="profile-pic-large" src={LadyAndDog} alt="Profile" onClick={this.toggleCollapse}/>  
          </div>
          <div className="mb-3"><button id="edit-profile-pic-button" className="collapse" onClick={this.editProfilePic}>Edit profile picture</button></div>
          <div id="parent-profile" className="collapse.show">
               <div className="row">
                  <div className="col profile-box mx-2 py-4">
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <div className="trak_nav-item">Parent</div>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="profile-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="parent-name" type="text" className="form-control" placeholder="Name"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="parent-phone" type="number" min="0000000000" max="9999999999" className="form-control" placeholder="Phone Number"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="profile-city" type="text" className="form-control" placeholder="City"/>
                      </span>
                  </div>
                  <div className="col profile-box mx-2 py-4">
                      <textarea id="parent-bio" className="my-3" cols="30" rows="4" maxlength="120" placeholder="Biography..."></textarea>
                  </div>
              </div>
              <button type="submit" className="btn btn-primary mx-9 my-4" onClick={this.updateParent}>Update Parent Profile</button>
          </div>
          <div id="walker-profile" className="collapse">
               <div className="row">
                  <div className="col profile-box mx-2 py-4">
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <div className="trak_nav-item">Walker</div>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="profile-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="walker-name" type="text" className="form-control" placeholder="Name"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="walker-phone" type="text" className="form-control" placeholder="Phone Number"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="profile-city" type="text" className="form-control" placeholder="City"/>
                      </span>
                  </div>
                  <div className="col profile-box mx-2 py-4">
                      <textarea id="walker-bio" className="my-3" cols="30" rows="4" maxlength="120" placeholder="Biography..."></textarea>
                  </div>
              </div>
              <button id="update-walker-button" type="submit" className="btn btn-primary mx-9 my-4"onClick={this.updateWalker}>Update Walker Profile</button>
          </div>
          <div id="boarder-profile" className="collapse">
               <div className="row">
                  <div className="col profile-box mx-2 py-4">
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <div className="trak_nav-item">Boarder</div>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="profile-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-name" type="text" className="form-control" placeholder="Name"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-phone" type="text" className="form-control" placeholder="Phone Number"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-address" type="text" className="form-control" placeholder="Address"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="profile-city" type="text" className="form-control" placeholder="City"/>
                      </span>
                  </div>
                  <div className="col profile-box mx-2 py-4">
                      <textarea id="boarder-bio" className="my-3" cols="30" rows="4" maxlength="120" placeholder="Biography..."></textarea>
                  </div>
              </div>
              <button type="submit" id="update-boarder-button" className="btn btn-primary mx-9 my-4" onClick={this.updateBoarder}>Update Boarder Profile</button>
          </div>
          </Slide>
      </div>
    ); 
  }
};

export default ProfileForm;
