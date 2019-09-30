import React from "react";
import Button from "../../components/Button";

import { Link } from "@reach/router";

// Media
import PageNonFound from "./media/page_not_found.svg";

// Styles
import "./styles.scss";

const PageNotFound = () => {
  return (
    <div>
      <div className="trak_heading-medium mt-5">Ops ...</div>
      <div className="trak_body-small mt-5 mb-3">
        You ended you in the wrong URL. Click the button below to go back home
      </div>
      <img className="m-5" src={PageNonFound} alt="PageNonFound" />
      <Link to="/">
        <Button buttonTitle="Go back home" buttonStyle="btn-primary" />
      </Link>
    </div>
  );
};

export default PageNotFound;
