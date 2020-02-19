// React
import React from "react";

//Firebase
import Fire from "../../config/Fire.js";

// Styles
import "./styles.scss";

//Animation and Images
import Slide from "react-reveal";
import GenericPic from "./generic-profile.png";

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
    }, 750);
    setTimeout(() => { // Check if user is a walker
      db.collection("walkers")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderWalkerProfile(doc);
        });
      });
    }, 750);
    setTimeout(() => { // Check if user is a boarder
      db.collection("boarders")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderBoarderProfile(doc);
        });
      });
    }, 750);
    setTimeout(() => { // Check if user has profile picture
      db.collection("profile-pictures")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderProfilePic(doc);
        });
      });
    }, 750);

    function renderParentProfile(doc) {
      document.getElementById("parent-button").innerHTML = "Scroll to view Parent Profile";
      document.getElementById("parent-email").value = Fire.auth().currentUser.email;
      document.getElementById("parent-name").value = doc.data().name;
      document.getElementById("parent-phone").value = doc.data().phone;
      document.getElementById("parent-city").value = doc.data().city;
      document.getElementById("parent-bio").value = doc.data().bio;
    }
  
    function renderWalkerProfile(doc) {
      document.getElementById("walker-button").innerHTML = "Show Walker Profile";
      document.getElementById("walker-email").value = Fire.auth().currentUser.email;
      document.getElementById("walker-name").value = doc.data().name;
      document.getElementById("walker-phone").value = doc.data().phone;
      document.getElementById("walker-city").value = doc.data().city;
      document.getElementById("walker-bio").value = doc.data().bio;
    }
  
    function renderBoarderProfile(doc) {
      document.getElementById("boarder-button").innerHTML = "Show Boarder Profile";
      document.getElementById("boarder-email").value = Fire.auth().currentUser.email;
      document.getElementById("boarder-name").value = doc.data().name;
      document.getElementById("boarder-phone").value = doc.data().phone;
      document.getElementById("boarder-address").value = doc.data().address;
      document.getElementById("boarder-city").value = doc.data().city;
      document.getElementById("boarder-bio").value = doc.data().bio;
    }

    function renderProfilePic(doc) {
      document.getElementById("profile-pic-large").src = doc.data().pic;
    }
  }

  openParentProfile() {
    if (document.getElementById("parent-profile").className === ("react-reveal collapse"))
    {
        document.getElementById("parent-profile").className = ("react-reveal collapse.show");
        document.getElementById("parent-button").innerHTML= "Scroll to view Parent Profile";
    }
    else if (document.getElementById("parent-profile").className === ("react-reveal collapse.show"))
    {
        document.getElementById("parent-profile").className = ("react-reveal collapse");
        document.getElementById("parent-button").innerHTML= "Show Parent Profile";
    }
  }

  openWalkerProfile() {
    if (document.getElementById("walker-profile").className === ("react-reveal collapse"))
    {
        document.getElementById("walker-profile").className = ("react-reveal collapse.show");
        document.getElementById("walker-button").innerHTML= "Scroll to view Walker Profile";
    }
    else if (document.getElementById("walker-profile").className === ("react-reveal collapse.show"))
    {
        document.getElementById("walker-profile").className = ("react-reveal collapse");
        document.getElementById("walker-button").innerHTML= "Show Walker Profile";
    }
  }

  openBoarderProfile() {
    if (document.getElementById("boarder-profile").className === ("react-reveal collapse"))
    {
        document.getElementById("boarder-profile").className = ("react-reveal collapse.show");
        document.getElementById("boarder-button").innerHTML= "Scroll to view Boarder Profile";
    }
    else if (document.getElementById("boarder-profile").className === ("react-reveal collapse.show"))
    {
        document.getElementById("boarder-profile").className = ("react-reveal collapse");
        document.getElementById("boarder-button").innerHTML= "Show Boarder Profile";
    }
  }

  toggleCollapse() {
    if (document.getElementById("edit-profile-pic-col").className === "react-reveal mb-3 collapse")
        document.getElementById("edit-profile-pic-col").className = "react-reveal mb-3 collapse.show";
    else if (document.getElementById("edit-profile-pic-col").className === "react-reveal mb-3 collapse.show")
        document.getElementById("edit-profile-pic-col").className = "react-reveal mb-3 collapse"; 
  }

  updateParent() {
    const db = Fire.firestore();
    // Takes too long to delete old before updating new
    // Delete old data, wait 1 seconds, then update
    // Wait 1 more second, reload page
    var query = db.collection("parents").where('email', '==', Fire.auth().currentUser.email);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          doc.ref.delete();
      });
    });
    setTimeout(() => {
       db.collection("parents").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("parent-name").value,
      phone: document.getElementById("parent-phone").value,
      city: document.getElementById("parent-city").value,
      bio: document.getElementById("parent-bio").value,
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  updateWalker() {
    const db = Fire.firestore();
    var query = db.collection("walkers").where('email', '==', Fire.auth().currentUser.email);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setTimeout(() => {
      db.collection("walkers").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("walker-name").value,
      phone: document.getElementById("walker-phone").value,
      city: document.getElementById("walker-city").value,
      bio: document.getElementById("walker-bio").value,
      pic: document.getElementById("profile-pic-large").src
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  updateBoarder() {
    const db = Fire.firestore();
    var query = db.collection("boarders").where('email', '==', Fire.auth().currentUser.email);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setTimeout(() => {
      db.collection("boarders").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("boarder-name").value,
      phone: document.getElementById("boarder-phone").value,
      address: document.getElementById("boarder-address").value,
      city: document.getElementById("boarder-city").value,
      bio: document.getElementById("boarder-bio").value,
      pic: document.getElementById("profile-pic-large").src
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  updateProfilePic() {
    const db = Fire.firestore();
    var query = db.collection("profile-pictures").where('email', '==', Fire.auth().currentUser.email);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setTimeout(() => {
    db.collection("profile-pictures").add({
      email: Fire.auth().currentUser.email,
      pic: document.getElementById("profile-pic-large").src
    });
  }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  fileUploadHandler = event => {
    var input = event.target; // Get image that changed state of input element
    var reader = new FileReader();
    reader.onload = function() {
    var dataURL = reader.result;
    var output = document.getElementById('profile-pic-large');
    output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]); // Show preview of image
}

  render() {
    return (
      <div className="mt-7 mx-6 mb-8">
        <Slide up>
          <div className="row px-4 py-4">
            <button className="col mx-4 py-1 signup" id="parent-button" onClick={this.openParentProfile}>
              Create a parent profile
            </button>
            <button className="col mx-4 py-1 signup" id="walker-button" onClick={this.openWalkerProfile}>
              Create a walker profile
            </button>
            <button className="col mx-4 py-1 signup" id="boarder-button" onClick={this.openBoarderProfile}>
              <a href="/profile#boarder-profile">Create a dog boarder profile</a>
            </button>
          </div>
          <div className="mb-1">
              <img id="profile-pic-large" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/>  
          </div>
          <div className="mb-3 collapse" id="edit-profile-pic-col">
            <input className="row mx-10" type="file" id="edit-profile-pic-input" onChange={this.fileUploadHandler}/>
            <div className="row mx-10">
              <button id="edit-profile-pic-button" onClick={this.updateProfilePic}>Update Picture</button>
              <text className="ml-1" id="tooltip">Ensure image is square</text>
            </div>
          </div>
          <div id="parent-profile" className="collapse.show">
               <div className="row">
                  <div className="col profile-box mx-2 py-4">
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <div className="trak_nav-item">Parent</div>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="parent-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="parent-name" type="text" className="form-control" placeholder="Name" maxlength="50"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="parent-phone" type="number" className="form-control" placeholder="Phone Number" min="0" max="9999999999" minlength="10"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="parent-city" type="text" className="form-control" placeholder="City" maxlength="50"/>
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
                          <input id="walker-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="walker-name" type="text" className="form-control" placeholder="Name" maxlength="50"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="walker-phone" type="text" className="form-control" placeholder="Phone Number" min="0" max="9999999999" minlength="10"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="walker-city" type="text" className="form-control" placeholder="City" maxlength="50"/>
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
                          <input id="boarder-email" type="text" className="form-control" placeholder="Email (same as account)"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-name" type="text" className="form-control" placeholder="Name" maxlength="50"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-phone" type="text" className="form-control" placeholder="Phone Number" min="0" max="9999999999" minlength="10"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input id="boarder-address" type="text" className="form-control" placeholder="Address" maxlength="50"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                           <input id="boarder-city" type="text" className="form-control" placeholder="City" maxlength="50"/>
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
