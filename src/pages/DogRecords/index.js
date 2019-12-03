import React from "react";
import FileUpload from "../../components/FileUpload";

class DogRecords extends React.Component {
  render(){
    return (
      <div className="mt-5 mx-6">
        <FileUpload />
      </div>
    );
  }
}

export default DogRecords;