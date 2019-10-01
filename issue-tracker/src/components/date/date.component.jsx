import React, { useState } from "./node_modules/react";
import Button from '../button/button.component';

import './skeleton.styles.css';

const myVariable = {
    myValue: () => "off"
}

const Skeleton = ({ myProperty }) => {
    const [myStatus, setStatus] = useState(myVariable.myValue);

    return (
      <div className="Skeleton">
        <h2>Skeleton</h2>
        <p>Property: {myProperty}</p> 
        <p>current status: {myStatus}</p> 
        <Button onClick={() => setStatus(myStatus === "on" ? "off" : "on")} text = "toggle me" />
      </div>
    );
};
  
  export default Skeleton;