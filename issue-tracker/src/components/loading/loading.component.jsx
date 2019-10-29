import React, { useState } from "react";
import Modal from '../modal/modal.component';

import './loading.styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Loading = props => {

    return (
      <div class="Loading">
        <p>Fetching data...</p>
        <FontAwesomeIcon icon={faSpinner} pulse />
      </div>
    );
};
  
  export default Loading;