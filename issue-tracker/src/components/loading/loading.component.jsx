import React from "react";

import './loading.styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Loading = props => {

    return (
      <div className="Loading">
        <p>Fetching data...</p>
        <FontAwesomeIcon icon={faSpinner} pulse />
      </div>
    );
};
  
  export default Loading;