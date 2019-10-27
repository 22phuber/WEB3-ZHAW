import React from "react";
import Clock from '../clock/clock.component';

import './header.styles.css';

const Header = props => {
  return (
    <div className={"Header" + props.colourMode}>
        <h1 className="">{props.appTitle}</h1> 
        <Clock className="" />
    </div>
  );
};




export default Header;
