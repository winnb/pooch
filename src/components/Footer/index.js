// React
import React from "react";

// Styles
import "./styles.scss";

class Footer extends React.Component {

componentDidMount() {
  setTimeout(() => {
    document.getElementsByClassName("page-footer").className = "page-footer font-small trak_body_small text-left pt-4 px-3 py-3";
  }, 1000);
}

render() {
  return (
    <div>
      <footer className="page-footer font-small trak_body_small text-left pt-4 px-3 py-3 collapse">
          <div className="row mx-5">
             <div className="footer-element my-2 mx-4 px-4">2020 POOCH, Inc.</div>
             <div className="footer-element my-2 mx-4 px-4">About</div>
             <div className="footer-element my-2 mx-4 px-4">FAQ</div>
             <div className="footer-element my-2 mx-4 px-4">Privacy Policy</div>
             <div className="footer-element my-2 mx-4 px-4">Social Media</div>
             <div className="footer-element my-2 mx-4 px-4">Terms of Service</div>
          </div>
        </footer> 
    </div>
  );
}


}

export default Footer;