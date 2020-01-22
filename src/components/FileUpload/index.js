// React
import React from "react";
// Tools
import Axios from 'axios';

class FileUpload extends React.Component{
    state={
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHndler = () => {
        Axios.post('')
    }

    toggleCollapse() {
        if (document.getElementById("profileDropdown").className === "collapse") {
            document.getElementById("profileDropdown").className = "collapse.show";
        }
        else if (document.getElementById("profileDropdown").className === "collapse.show") {
            document.getElementById("profileDropdown").className = "collapse"; 
        }
    }

    render(){
        return( 
            <div className="mt-7">
                <div className="trak_heading-medium mb-5">
                    Dog Records
                </div>
                <div className="Upload mb-5">
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Upload Dog Record</button>   
                </div>
            </div>
        );
    }
}

export default FileUpload;