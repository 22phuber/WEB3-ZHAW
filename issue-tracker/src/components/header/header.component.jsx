import React from "react";
import Clock from '../clock/clock.component';

import './header.styles.css';

const Header = ({ appTitle }) => {
  return (
    <div className="Header text-left d-flex justify-content-between align-items-center">
        <h1 className="">{appTitle}</h1> 
        <Clock className="" />
    </div>
  );
};




export default Header;
