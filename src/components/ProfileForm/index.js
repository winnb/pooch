import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
//Animation and Images
import GenericPic from "./generic-profile.png";
import Fade from "react-reveal";
import Loader from "react-loader-spinner";

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
    document.getElementById("profile-loader").style.display = "block";
    const db = Fire.firestore();
    console.log("component mounted");
    setTimeout(() => { // Determine user type
      //document.getElementById("username").innerHTML = "Welcome, "+Fire.auth().currentUser.email;
      db.collection("profile-types")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log("checking if parent");
          if (doc.data().type === "parent")
            renderParentProfile();
            console.log("checking if walker");
          if (doc.data().type === "walker")
            renderWalkerProfile();
            console.log("checking if boarder");
          if (doc.data().type === "boarder")
            renderBoarderProfile();
        });
      });
    }, 1000);
    setTimeout(() => { // Wait 1.5 seconds, then hide loader
          document.getElementById("profile-loader").style.display = "none";
      }, 1500);
    setTimeout(() => { // Wait 2.25 seconds, then check if no profile visible, so do first time setup
    if (document.getElementById("parent-profile").className === "react-reveal collapse" && 
        document.getElementById("walker-profile").className === "react-reveal collapse" &&
        document.getElementById("boarder-profile").className === "react-reveal collapse") {
          console.log("user has not set up a profile!");
          document.getElementById("profile-page1").className = "collapse.show";
        }
    }, 2250);

        function renderParentProfile(doc) {
          console.log("user is a parent!");
          db.collection("parents")
          .where("email", "==", Fire.auth().currentUser.email)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
            document.getElementById("parent-profile").className = "react-reveal collapse.show";
            document.getElementById("database-parent-name").value = doc.data().name;
            document.getElementById("database-parent-phone").value = doc.data().phone;
            document.getElementById("database-parent-city").value = doc.data().city;
            document.getElementById("database-parent-pic").src = doc.data().pic;
            document.getElementById("delete-button-row").className = "collapse.show";
            });
          });
        }
      
        function renderWalkerProfile(doc) {
          console.log("user is a walker!");
          db.collection("walkers")
          .where("email", "==", Fire.auth().currentUser.email)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
          document.getElementById("walker-profile").className = "react-reveal collapse.show";
          document.getElementById("database-walker-name").value = doc.data().name;
          document.getElementById("database-walker-phone").value = doc.data().phone;
          document.getElementById("database-walker-city").value = doc.data().city;
          document.getElementById("database-walker-hourly-rate").value = doc.data().hourlyRate;
          document.getElementById("database-walker-pic").src = doc.data().pic;
          document.getElementById("delete-button-row").className = "collapse.show";
            });
          });
        }
      
        function renderBoarderProfile(doc) {
          console.log("user is a boarder!");
          db.collection("boarders")
          .where("email", "==", Fire.auth().currentUser.email)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
          document.getElementById("boarder-profile").className = "react-reveal collapse.show";
          document.getElementById("database-boarder-name").value = doc.data().name;
          document.getElementById("database-boarder-phone").value = doc.data().phone;
          document.getElementById("database-boarder-address").value = doc.data().address;
          document.getElementById("database-boarder-city").value = doc.data().city;
          document.getElementById("database-boarder-daily-rate").value = doc.data().dailyRate;
          document.getElementById("database-boarder-pic").src = doc.data().pic;
          document.getElementById("delete-button-row").className = "collapse.show";
            });
          });
        }
  }

  startParentProfile() {
    document.getElementById("parent-button").style.backgroundColor="gray"; // Start parent profile
    document.getElementById("profile-page2").className="collapse.show";
    document.getElementById("service-button").style.backgroundColor="#f2f4f7"; // Close potentially open service profile
    document.getElementById("profile-page3").className="collapse";
    document.getElementById("profile-page4").className="collapse";
    document.getElementById("profile-page5").className="collapse";
  }

  startServiceProfile() {
    document.getElementById("service-button").style.backgroundColor="gray"; // Start service profile
    document.getElementById("profile-page3").className="collapse.show";
    document.getElementById("parent-button").style.backgroundColor="#f2f4f7"; // Close potentially open parent profile
    document.getElementById("walker-button").style.backgroundColor="#f2f4f7";
    document.getElementById("boarder-button").style.backgroundColor="#f2f4f7";
    document.getElementById("profile-page2").className="collapse";
    document.getElementById("profile-page4").className="collapse";
    document.getElementById("profile-page5").className="collapse";
  }

  startWalkerProfile() {
    document.getElementById("walker-button").style.backgroundColor="gray"; // Start walker profile
    document.getElementById("profile-page4").className="collapse.show";
    document.getElementById("boarder-button").style.backgroundColor="#f2f4f7"; // Close potentially open boarder profile
    document.getElementById("profile-page5").className="collapse";
  }

  startBoarderProfile() {
    document.getElementById("boarder-button").style.backgroundColor="gray"; // Start boarder profile
    document.getElementById("profile-page5").className="collapse.show";
    document.getElementById("walker-button").style.backgroundColor="#f2f4f7"; // Close potentially open walker profile
    document.getElementById("profile-page4").className="collapse";
  }


  newParent() {
    const db = Fire.firestore();
      db.collection("parents").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("parent-name").value,
      phone: document.getElementById("parent-phone").value,
      city: document.getElementById("parent-city").value,
      pic: document.getElementById("parent-pic").src
    });
    db.collection("profile-types").add({
      email: Fire.auth().currentUser.email,
      type: "parent"
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  updateParent() {
    const db = Fire.firestore();
    // Takes too long to delete old before updating new
    // Delete old data, wait 1 seconds, then update
    // Wait 1 more second, reload page
    db.collection("parents").where('email', '==', Fire.auth().currentUser.email)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          doc.ref.delete();
      });
    });
    setTimeout(() => {
      db.collection("parents").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("database-parent-name").value,
      phone: document.getElementById("database-parent-phone").value,
      city: document.getElementById("database-parent-city").value,
      pic: document.getElementById("database-parent-pic").src
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  newWalker() {
    const db = Fire.firestore();
    setTimeout(() => {
      db.collection("walkers").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("walker-name").value,
      phone: document.getElementById("walker-phone").value,
      city: document.getElementById("walker-city").value,
      hourlyRate: document.getElementById("walker-hourly-rate").value,
      pic: document.getElementById("walker-pic").src
    });
    db.collection("profile-types").add({
      email: Fire.auth().currentUser.email,
      type: "walker"
    });
  }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 1750);
  }

  updateWalker() {
    const db = Fire.firestore();
    db.collection("walkers").where('email', '==', Fire.auth().currentUser.email)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setTimeout(() => {
      db.collection("walkers").add({
      email: Fire.auth().currentUser.email,
      name: document.getElementById("database-walker-name").value,
      phone: document.getElementById("database-walker-phone").value,
      city: document.getElementById("database-walker-city").value,
      hourlyRate: document.getElementById("database-walker-hourly-rate").value,
      pic: document.getElementById("database-walker-pic").src
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  newBoarder() {
    if (document.getElementById("boarder-pic").src.length < 582795) {
      const db = Fire.firestore();
        db.collection("boarders").add({
        email: Fire.auth().currentUser.email,
        name: document.getElementById("boarder-name").value,
        phone: document.getElementById("boarder-phone").value,
        address: document.getElementById("boarder-address").value,
        city: document.getElementById("boarder-city").value,
        dailyRate: document.getElementById("boarder-daily-rate").value,
        pic: document.getElementById("boarder-pic").src
      });
      db.collection("profile-types").add({
        email: Fire.auth().currentUser.email,
        type: "boarder"
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    else {
      document.getElementById("profile-error").className = "collapse.show";
    }
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
      name: document.getElementById("database-boarder-name").value,
      phone: document.getElementById("database-boarder-phone").value,
      address: document.getElementById("database-boarder-address").value,
      city: document.getElementById("database-boarder-city").value,
      dailyRate: document.getElementById("database-boarder-daily-rate").value,
      pic: document.getElementById("database-boarder-pic").src
    });
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

previewParentPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  var output = document.getElementById('parent-pic');
  output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

previewDatabaseParentPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  var output = document.getElementById('database-parent-pic');
  output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

previewWalkerPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  var output = document.getElementById('walker-pic');
  output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

previewDatabaseWalkerPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  var output = document.getElementById('database-walker-pic');
  output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

previewBoarderPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  var output = document.getElementById('boarder-pic');
  output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

previewDatabaseBoarderPic(event) {
  var input = event.target; // Get image that changed state of input element
  var reader = new FileReader();
  reader.onload = function() {
  var dataURL = reader.result;
  document.getElementById('database-boarder-pic').src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); // Show preview of image
}

openDeletePopup() {document.getElementById("delete-popup").className="fixed-top collapse.show";}

closeDeletePopup() {document.getElementById("delete-popup").className="fixed-top collapse";}

deleteProfile() {
  Fire.firestore().collection("parents")
  .where('email', '==', Fire.auth().currentUser.email)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  Fire.firestore().collection("walkers")
  .where('email', '==', Fire.auth().currentUser.email)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  Fire.firestore().collection("boarders")
  .where('email', '==', Fire.auth().currentUser.email)
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
}

  render() {
    return (
      <div className="mt-7 mx-6 mb-4">
        <div id="profile-loader"><Loader type="TailSpin" color="black" height={150} width={150}/></div>
        <Fade>
          <div className="trak_nav-item mb-3" id="username"></div>

          <div id="profile-page1" className="collapse">
          <div className="my-4">Thank you for joining POOCH!</div>
          <div className="my-4">Help us get to know you by answering a few questions:</div>
          <div className="mt-6 mb-4">I am a...</div>
            <div className="row my-5 mx-8">
              <button className="col mx-4 py-1 signup" id="parent-button" onClick={this.startParentProfile}>
                Dog Parent
              </button>
              or a
              <button className="col mx-4 py-1 signup" id="service-button" onClick={this.startServiceProfile}>
                Dog Service Provider
              </button>
            </div>
          </div>
  
          <div id="profile-page2" className="collapse">
              <div className="mb-3"><img className="profile-pic" id="parent-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
              <input type="file" id="parent-input" onChange={this.previewParentPic}/>
              <div className="col">
                <div className="my-4 row"><input id="parent-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row"><input id="parent-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row"><input id="parent-city" type="text" placeholder="City" maxLength="50"/></div> 
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.newParent}>Create Parent Profile</button>
          </div>

          <div id="profile-page3" className="collapse">
          <div className="mt-6 mb-4">I would like to offer...</div>
            <div className="row my-5 mx-8">
              <button className="col mx-4 py-1 signup" id="walker-button" onClick={this.startWalkerProfile}>
                Dog Walking
              </button>
              or
              <button className="col mx-4 py-1 signup" id="boarder-button" onClick={this.startBoarderProfile}>
                Dog Boarding
              </button>
            </div>
          </div>
          
          <div id="profile-page4" className="collapse">
            <div className="mb-3"><img className="profile-pic" id="walker-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <input type="file" id="parent-input" onChange={this.previewWalkerPic}/>
              <div className="col">
                <div className="my-4 row"><input id="walker-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row"><input id="walker-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row"><input id="walker-city" type="text" placeholder="City" maxLength="50"/></div>
                <div className="my-4 row"><input id="walker-hourly-rate" type="text" placeholder="Hourly Rate" min="12" max="100" maxLength="3"/></div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.newWalker}>Create Dog Walking Profile</button>
          </div>

          <div id="profile-page5" className="collapse">
            <div className="mb-3"><img className="profile-pic" id="boarder-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <input type="file" id="parent-input" onChange={this.previewBoarderPic}/>
              <div className="col">
                <div className="my-4 row"><input id="boarder-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row"><input id="boarder-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row"><input id="boarder-address" type="text" placeholder="Address" maxLength="50"/></div>
                <div className="my-4 row"><input id="boarder-city" type="text" placeholder="City" maxLength="50"/></div>
                <div className="my-4 row"><input id="boarder-daily-rate" type="text" placeholder="Daily Rate" min="12" max="1000" maxLength="4"/></div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.newBoarder}>Create Dog Boarding Profile</button>
          </div>

          <div id="parent-profile" className="collapse">
            <div className="mb-3"><img className="profile-pic" id="database-parent-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <input type="file" id="database-parent-input" onChange={this.previewDatabaseParentPic}/>
              <div className="col">
                <div className="my-4 row profile-input"><input id="database-parent-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row profile-input"><input id="database-parent-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row profile-input"><input id="database-parent-city" type="text" placeholder="City" maxLength="50"/></div> 
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.updateParent}>Edit Profile</button>
          </div>

          <div id="walker-profile" className="collapse">
            <div className="mb-3"><img className="profile-pic" id="database-walker-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <input type="file" id="database-walker-input" onChange={this.previewDatabaseWalkerPic}/>
              <div className="col">
                <div className="my-4 row"><input className="profile-input" id="database-walker-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-walker-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-walker-city" type="text" placeholder="City" maxLength="50"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-walker-hourly-rate" type="text" placeholder="Hourly Rate" min="12" max="100" maxLength="3"/></div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.updateWalker}>Edit Profile</button>
          </div>

          <div id="boarder-profile" className="collapse">
            <div className="mb-3"><img className="profile-pic" id="database-boarder-pic" src={GenericPic} alt="Profile" onClick={this.toggleCollapse}/></div>
            <input type="file" id="database-boarder-input" onChange={this.previewDatabaseBoarderPic}/>
              <div className="col">
                <div className="my-4 row"><input className="profile-input" id="database-boarder-name" type="text" placeholder="Name" maxLength="50"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-boarder-phone" type="text" placeholder="Phone Number" min="0" max="9999999999" maxLength="11"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-boarder-address" type="text" placeholder="Address" maxLength="50"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-boarder-city" type="text" placeholder="City" maxLength="50"/></div>
                <div className="my-4 row"><input className="profile-input" id="database-boarder-daily-rate" type="text" placeholder="Daily Rate" min="12" max="1000" maxLength="4"/></div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.updateBoarder}>Edit Profile</button>
          </div>

          <div id="delete-popup" className="fixed-top collapse">
              <div className="trak_nav-item">Are you sure you want to delete your profile?</div>
              <div><button className="my-2 mr-4 btn-danger popup-button" onClick={this.deleteProfile}>Yes</button><button className="my-2 ml-4 btn-primary popup-button" onClick={this.closeDeletePopup}>No</button></div>
              <div className="trak_body">WARNING: This is irreversable!</div>
          </div>
          <div id="delete-button-row" className="collapse"><button type="submit" className="btn btn-danger mt-8" onClick={this.openDeletePopup}>Delete Profile</button></div>
          <div id="profile-error" className="collapse">Picture can be at most 400x400 pixels</div>
          </Fade>
      </div>
    ); 
  }
};

export default ProfileForm;
