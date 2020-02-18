// React
import React from "react";
//Firebase
import Fire from "../../config/Fire.js";
// Styling
import "./styles.scss";

class FileUpload extends React.Component{

    componentDidMount() {
        const db = Fire.firestore();
        setTimeout(() => { // Show all uploaded records
            db.collection("records")
            .where("email", "==", Fire.auth().currentUser.email)
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderRecords(doc);
              });
            });
          }, 1750);
          function renderRecords(doc) {
              document.getElementById("record-row").innerHTML += "<img id=\"record\" alt=\"record\" className=\"mx-2\" src="+doc.data().pic+" />";
          }
    }

    filePreview = event => {
        var input = event.target; // Get image that changed state of input element
        var reader = new FileReader();
        reader.onload = function() {
        var dataURL = reader.result;
        var output = document.getElementById('preview');
        output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]); // Show preview of image
    }

    fileUpload() {
        const db = Fire.firestore(); // Save image to database
        db.collection("records").add({
            email: Fire.auth().currentUser.email,
            pic: document.getElementById("preview").src
        });
        setTimeout(() => {
            window.location.reload();
          }, 1000);
    }

    render(){
        return( 
            <div className="mt-7">
                <div className="trak_heading-medium mb-5">
                    Dog Records
                </div>
                <div className="Upload mb-5 col mx-10">
                    <div className="row my-2">
                        <input type="file" id="file-input" onChange={this.filePreview} />
                    </div>
                    <div className="row">
                        <img id="preview"/>
                    </div>
                    <div className="row my-2">
                        <button onClick={this.fileUpload}>Upload Dog Record</button>
                    </div>
                    <div className="row" id="record-row">

                    </div>
                </div>
            </div>
        );
    }
}

export default FileUpload;